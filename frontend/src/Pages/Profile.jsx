import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';

const Profile = () => {

    const { isLoggedIn, loadingUserData, user, updateProfile } = useAuth();
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [isUpdating, setIsUpdating] = useState(false);
    const [editable, setEditable] = useState(false);

    const resetInputs = () => {
        setName('');
        setPassword('');
        setPassword2('');
    }

    const saveProfile = async () => {
        if(!editable) {
            toast.warn('چیزی برای ذخیره نداری');
            return
        }
        setIsUpdating(true);
        const { success, msg } = await updateProfile(name, password, password2);
        if(success) {
            resetInputs();
            msg.forEach((item) => {
                toast.success(item);
            })
        } else {
            msg.forEach((item) => {
                toast.error(item);
            })
        }
        setIsUpdating(false);
    }

    useEffect(() => {
        setEditable(
            name.trim() !== '' ||
            password.trim() !== '' ||
            password2.trim() !== ''
        );
    }, [name, password, password2]);

    useEffect(() => {
        if(!loadingUserData && !isLoggedIn) {
            navigate('/', { replace: true })
        }
    }, [loadingUserData, isLoggedIn, navigate]);

    return (
        <div className="ms_profile_wrapper">
            <h1>ویرایش پروفایل</h1>
            <div className="ms_profile_box">
                <div className="ms_pro_img">
                    <img src={user?.profile_picture} alt="User Profile Picture" className="img-fluid h-100" />
                    <div className="pro_img_overlay">
                        <i className="fa_icon edit_icon" />
                    </div>
                </div>
                <div className="ms_pro_form">
                    <div className="form-group">
                        <label>نام کاربری *</label>
                        <input
                            type="text"
                            placeholder={user?.username}
                            className="form-control"
                            name="username"
                            autoComplete="off"
                            disabled={true}
                            title="نام کاربری قابل تغییر نیست"
                        />
                    </div>
                    <div className="form-group">
                        <label>اسم *</label>
                        <input
                            type="text"
                            placeholder={user?.name}
                            className="form-control"
                            name="name"
                            value={name}
                            autoComplete="off"
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>رمز عبور *</label>
                        <input
                            type="password"
                            placeholder="******"
                            className="form-control"
                            name="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>تکرار رمز عبور *</label>
                        <input
                            type="password"
                            placeholder="******"
                            className="form-control"
                            name="password"
                            value={password2}
                            autoComplete="new-password"
                            onChange={(event) => {setPassword2(event.target.value)}}
                            />
                    </div>
                    <div className="pro-form-btn text-center marger_top15 d-flex align-items-center justify-content-center"
                         style={{
                             gap: "24rem"
                         }}>
                        {
                            isUpdating ?
                            <div className="loading"></div> :
                            <a href="#" onClick={saveProfile} className="ms_btn">
                                ذخیره
                            </a>
                        }
                        {
                            editable ?
                            <button onClick={resetInputs} className="ms_btn">
                                انصراف
                            </button> :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile
