import {createContext, useContext, useEffect, useState} from 'react';
import api, {refreshCSRF} from "../api/api.js";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingUserData, setLoadingUserData] = useState(true);

        const fetchProfile = async () => {
            setLoadingUserData(true);
            try {
                const res = await api.get('user/profile/');
                setIsLoggedIn(res.data.logged_in);
                setUser(res.data.user);
            } catch (err) {
                console.error('Failed to fetch profile:', err.response?.data || err.message);
            }
            setLoadingUserData(false);
        }

        const createNewAccount = async (username, name, password, password2) => {
            await refreshCSRF();
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
                            'رمز عبور نباید تمام عددی باشد و باید حداقل ۸ کاراکتر باشد.',
                            'رمز عبور نباید ساده و قابل حدس باشد.',
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

        const logout = async () => {
            try {
                const res = await api.post('user/logout/');
                if(res.status === 204) {
                    setIsLoggedIn(false);
                    setUser(null);
                    await refreshCSRF();
                }
            } catch (err) {
                console.error('Failed to logout:', err.response?.data || err.message);
            }
        }

        const connectAccount = async (username, password) => {
            if(!username || username === ' ') {
                return {
                    success: false,
                    msg: ['لطفا نام کاربری خود را وارد کنید.']
                }
            }
            if(!password || password === ' ') {
                return {
                    success: false,
                    msg: ['لطفا رمز عبور خود را وارد کنید.']
                }
            }

            try {
                const res = await api.post(
                    'user/login/',
                    {
                        username, password
                    }
                );
                if(res.status === 200) {
                    setIsLoggedIn(true);
                    setUser(res.data.user);
                    await refreshCSRF();
                    return {
                        success: true,
                        msg: ['']
                    }
                }
            } catch (err) {
                if(err.response.status === 401) {
                    return {
                        success: false,
                        msg: ['نام کاربری یا رمز عبور اشتباه است.']
                    }
                } else {
                    console.error('Failed to login:', err.response?.data || err.message)
                    return {
                        success: false,
                        msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.']
                    }
                }
            }
        }

        const updateProfile = async (name, password, password2) => {
            if(!name.trim() && !password.trim()) {
                return {
                    success: false,
                    msg: ['چیزی برای تغییر نداری.']
                }
            }
            if(name === user?.name) {
                return {
                    success: false,
                    msg: ['لطفا اسم متفاوتی از اسم قبلی خود انتخاب کنید.']
                }
            }
            if(password !== password2) {
                return {
                    success: false,
                    msg: ['رمز عبور با تکرار ان برابر نیست.']
                }
            }

            try {
                let data = {};
                if(password.trim()) {
                    data['password'] = password;
                    data['password2'] = password2;
                }
                if(name.trim()) {
                    data['name'] = name;
                }
                const res = await api.patch(
                    'user/profile/update/',
                    data
                );
                if(res.status === 200) {
                    setUser(res.data.user);
                    return {
                        success: true,
                        msg: ['اطلاعات با موفقیت ذخیره شد.']
                    }
                }
            } catch (err) {
                if(err.response?.status === 406) {
                    return {
                        success: false,
                        msg: [
                            'رمز عبور نباید شبیه نام کاربری باشد یا قابل حدس باشد.',
                            'رمز عبور باید حداقل ۸ کاراکتر باشد.',
                            'رمز عبور نباید تمام عددی باشد.',
                        ]
                    }
                } else {
                    console.error('Failed to update profile:', err?.response.data || err.message)
                    return {
                        success: false,
                        msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.']
                    }
                }
            }
        }

        useEffect(() => {
            fetchProfile();
        }, []);
        return (
            <AuthContext.Provider value={{ user, loadingUserData, isLoggedIn, fetchProfile, createNewAccount, logout, connectAccount, updateProfile }}>
                {children}
            </AuthContext.Provider>
        )
    }
;

export const useAuth = () => useContext(AuthContext);