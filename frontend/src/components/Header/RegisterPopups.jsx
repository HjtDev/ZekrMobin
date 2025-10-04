import React, {useState} from 'react'
import {useAuth} from "../../contexts/AuthContext.jsx";

const RegisterPopups = () => {
    const {createNewAccount, connectAccount} = useAuth();

    const [username, setUsername] = useState('');
    const [usernameErrors, setUsernameErrors] = useState([]);

    const [name, setName] = useState('');
    const [nameErrors, setNameErrors] = useState([]);

    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [password2, setPassword2] = useState('');

    const [formErrors, setFormErrors] = useState([]);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginFormErrors, setLoginFormErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    const register = async () => {
        setUsernameErrors([]);
        setNameErrors([]);
        setPasswordErrors([]);
        setFormErrors([]);

        setIsLoading(true);

        const {success, field, msg} = await createNewAccount(username, name, password, password2);
        if(success) {
            document.querySelector('i.register_modal_close').click();
        } else {
            setUsernameErrors(field === 'username' ? msg : []);
            setNameErrors(field === 'name' ? msg : []);
            setPasswordErrors(field === 'password' ? msg : []);
            setFormErrors(field === '' ? msg : []);
        }
        setIsLoading(false);
    }

    const login = async () => {
        setLoginFormErrors([]);
        setIsLoading(true);

        const {success, msg} = await connectAccount(loginUsername, loginPassword);

        if(success) {
            document.querySelector('i.login_modal_close').click();
        } else {
            setLoginFormErrors(msg);
        }
        setIsLoading(false);
    }

    return (
        <div className="ms_register_popup">
            <div id="myModal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog register_dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close register_modal_close"/>
                        </button>
                        <div className="modal-body">
                            <div className="ms_register_img">
                                <img src="images/register_img.png" alt="" className="img-fluid"/>
                            </div>
                            <div className="ms_register_form">
                                <h2>ثبت نام / ورود</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="نام کاربری"
                                        className="form-control"
                                        onChange={(e) => {setUsername(e.target.value)}}
                                    />
                                    <ul className="small text-right" style={{color: "#e74c3c"}}>
                                        {usernameErrors.map((err, index) => (
                                            <li key={index}>{err}</li>
                                        ))}
                                    </ul>
                                    <span className="form_icon">
                                        <i className="fa_icon form-user" aria-hidden="true"/>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="اسم"
                                        className="form-control"
                                        onChange={(e) => {setName(e.target.value)}}
                                    />
                                    <ul className="small text-right" style={{color: "#e74c3c"}}>
                                        {
                                            nameErrors.map((err, index) => (
                                                <li key={index}>{err}</li>
                                            ))
                                        }
                                    </ul>
                                    <span className="form_icon">
                                        <i className="fa_icon form-envelope" aria-hidden="true"/>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="form-control"
                                        onChange={(e) => {setPassword(e.target.value)}}
                                    />
                                    <ul className="small text-right" style={{color: "#e74c3c"}}>
                                        {
                                            passwordErrors.map((err, index) => (
                                                <li key={index}>{err}</li>
                                            ))
                                        }
                                    </ul>
                                    <span className="form_icon">
                                        <i className="fa_icon form-lock" aria-hidden="true"/>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="تکرار رمز عبور"
                                        className="form-control"
                                        onChange={(e) => {setPassword2(e.target.value)}}
                                    />
                                    <ul className="small text-right" style={{color: "#e74c3c"}}>
                                        {
                                            formErrors.map((err, index) => (
                                                <li key={index}>{err}</li>
                                            ))
                                        }
                                    </ul>
                                    <span className="form_icon">
                                        <i className=" fa_icon form-lock" aria-hidden="true"/>
                                    </span>
                                </div>
                                {
                                    isLoading ?
                                    <div className="loading"></div> :
                                    <a href="javascript:void(0);" onClick={register} className="ms_btn">
                                        ثبت نام
                                    </a>
                                }
                                <p>
                                    قبلا ثبت نام کرده اید ؟{" "}
                                    <a
                                        href="#myModal1"
                                        data-toggle="modal"
                                        className="ms_modal hideCurrentModel"
                                    >
                                        ورود
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*--Login Popup Start--*/}
            <div id="myModal1" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog login_dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close login_modal_close"/>
                        </button>
                        <div className="modal-body">
                            <div className="ms_register_img">
                                <img src="images/register_img.png" alt="" className="img-fluid"/>
                            </div>
                            <div className="ms_register_form">
                                <h2>ثبت نام / ورود</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="نام کاربری"
                                        className="form-control"
                                        onChange={(e) => {setLoginUsername(e.target.value)}}
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-envelope" aria-hidden="true"/>
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="form-control"
                                        onChange={(e) => {setLoginPassword(e.target.value)}}
                                    />
                                    <ul className="small text-right" style={{color: "#e74c3c"}}>
                                        {
                                            loginFormErrors.map((err, index) => (
                                                <li>{err}</li>
                                            ))
                                        }
                                    </ul>
                                    <span className="form_icon">
                                        <i className="fa_icon form-lock" aria-hidden="true"/>
                                    </span>
                                </div>
                                {
                                    isLoading ?
                                    <div className="loading"></div> :
                                    <a href="#" onClick={login} className="ms_btn">
                                        ورود
                                    </a>
                                }
                                <p style={{marginTop: "15rem"}}>
                                    حساب کاربری ندارید ؟{" "}
                                    <a
                                        href="#myModal"
                                        data-toggle="modal"
                                        className="ms_modal1 hideCurrentModel"
                                    >
                                        ثبت نام
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default RegisterPopups
