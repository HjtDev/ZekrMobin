import {createContext, useContext, useEffect, useState} from 'react';
import api, {refreshCSRF} from "../api/api.js";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const fetchProfile = async () => {
            try {
                const res = await api.get('user/profile/');
                setIsLoggedIn(res.data.logged_in);
                setUser(res.data.user);
            } catch (err) {
                console.error('Failed to fetch profile:', err.response?.data || err.message);
            }
        }

        const createNewAccount = async (username, name, password, password2) => {
            if(!username) {
                return {
                    success: false,
                    field: 'username',
                    msg: ['نام کاربری نمی تواند خالی باشد']
                }
            } else {
                const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.]{2,29}$/
                if(!usernameRegex.test(username)) {
                    return {
                        success: false,
                        field: 'username',
                        msg: [
                            'نام کاربری باید بین ۳ تا ۳۰ کاراکتر باشد.',
                            'نام کاربری نباید با عدد آغاز شود.',
                            'نام کاربری نباید شامل کاراکتر های خاص مانند !@#$% باشد.'
                        ]
                    }
                }
            }

            if(!name || name === ' ') {
                return {
                    success: false,
                    field: 'name',
                    msg: ['اسم نمی تواند خالی باشد.']
                }
            }

            if(!password) {
                return {
                    success: false,
                    field: 'password',
                    msg: ['رمز عبور نمی تواند خالی باشد.']
                }
            }

            if(password !== password2) {
                return {
                    success: false,
                    field: '',
                    msg: ['رمز عبور و تکرار ان برابر نیستند.']
                }
            }

            try {
                console.log('sending: ', username, name, password, password2);
                const res = await api.post(
                    'user/signup/',
                    {
                        username,
                        name,
                        password,
                        password2
                    }
                )
                if (res.status === 201) {
                    setUser(res.data.user);
                    setIsLoggedIn(true);
                    await refreshCSRF();
                    return {
                        success: true,
                        field: '',
                        msg: ['']
                    }
                }
            } catch (err) {
                if (err.response.status === 406) {
                    return {
                        success: false,
                        field: '',
                        msg: [
                            'رمز عبور نباید شبیه نام کاربری باشد.',
                            'رمز عبور باید حداقل ۸ کاراکتر باشد.',
                            'رمز عبور نباید ساده و قابل حدس باشد.',
                            'رمز عبور نباید تماما عددی باشد.'
                        ]
                    }
                } else if (err.response.status === 409) {
                    return {
                        success: false,
                        field: 'username',
                        msg: ['نام کاربری در دسترس نمی باشد.']
                    }
                } else {
                    console.error('Failed to signup:', err.response?.data || err.message)
                    return {
                        success: false,
                        field: '',
                        msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.']
                    }
                }
            }
        }

        useEffect(() => {
            fetchProfile();
        }, []);
        return (
            <AuthContext.Provider value={{user, isLoggedIn, fetchProfile, createNewAccount}}>
                {children}
            </AuthContext.Provider>
        )
    }
;

export const useAuth = () => useContext(AuthContext);