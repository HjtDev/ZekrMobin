from rest_framework import status
from rest_framework.response import Response
from typing import Any, Callable, Mapping
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import re


class ResponseBuilderMixin:
    @staticmethod
    def build_response(response_status: int = status.HTTP_200_OK, **kwargs) -> Response:
        return Response(data=kwargs, status=response_status) if response_status != status.HTTP_204_NO_CONTENT else Response(status=response_status)


class GetDataMixin:
    EMAIL_REGEX = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    USERNAME_REGEX = re.compile(r'^[a-zA-Z][a-zA-Z0-9_.]{2,29}$')
    FILTER_REGEX = re.compile(
        r'^'
        r'(?:'
        r'[a-zA-Z0-9_]+:'
        r'[a-zA-Z0-9_]+(?:,[a-zA-Z0-9_]+)*'
        r')'
        r'(?:;'
        r'[a-zA-Z0-9_]+:'
        r'[a-zA-Z0-9_]+(?:,[a-zA-Z0-9_]+)*'
        r')*'
        r'$'
    )
    
    @staticmethod
    def validate_username(username):
        return bool(GetDataMixin.USERNAME_REGEX.match(username))
    
    @staticmethod
    def validate_email(email: str) -> bool:
        return bool(GetDataMixin.EMAIL_REGEX.match(email))
    
    @staticmethod
    def validate_password(password: str, password2: str = None) -> tuple[bool, list[str]]:
        if password2 and password != password2:
            return False, ['Passwords don\'t match']
        try:
            validate_password(password)
            return True, []
        except ValidationError as e:
            return False, e.messages
    
    @staticmethod
    def validate_arg(arg: str | tuple[str, Callable], data: Mapping[str, Any]) -> str:
        if isinstance(arg, str):
            return '' if arg in data else f'{arg} is required.'
        elif isinstance(arg, tuple) and len(arg) == 2 and callable(arg[1]):
            if arg[0] not in data:
                return f'{arg[0]} is required.'
            result = arg[1](data[arg[0]])
            if isinstance(result, str):
                return result
            else:
                return '' if result else f'{arg[0]} is invalid.'
        else:
            raise TypeError(f'Invalid argument type {type(arg)=}')
    
    def get_data(self, request, *args) -> tuple[bool, list[str] | dict[str, Any]]:
        data = request.query_params if request.method == 'GET' else request.data
        error_list = []
        fields = dict()
        
        for arg in args:
            error_happened = self.validate_arg(arg, data)
            if error_happened:
                error_list.append(error_happened)
            else:
                if isinstance(arg, str):
                    fields[arg] = data[arg]
                elif isinstance(arg, tuple):
                    fields[arg[0]] = data[arg[0]]
                else:
                    raise TypeError(f'Invalid argument type {type(arg)=}')
        
        if error_list:
            return False, error_list
        else:
            return True, fields
    
    @staticmethod
    def convert_data_to_bool(data: str | int) -> bool:
        if isinstance(data, str):
            return True if data.lower().strip() in ('true', 'yes', 'y', '1') else False
        else:
            return True if isinstance(data, int) and data == 1 else False
    
    @staticmethod
    def is_id(value: str | int) -> bool:
        return (isinstance(value, str) and value.isdigit() and int(value) > 0) or (isinstance(value, int) and value > 0)
