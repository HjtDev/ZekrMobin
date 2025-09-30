import React from 'react'

const RegisterPopups = () => {
    return (
        <div className="ms_register_popup">
            <div id="myModal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog register_dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close"/>
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
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-user" aria-hidden="true"/>
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="ایمیل"
                                        className="form-control"
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
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-lock" aria-hidden="true"/>
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="تکرار رمز عبور"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className=" fa_icon form-lock" aria-hidden="true"/>
                </span>
                                </div>
                                <a href="#" className="ms_btn">
                                    ثبت نام
                                </a>
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
                            <i className="fa_icon form_close"/>
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
                                        placeholder="ایمیل"
                                        className="form-control"
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
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-lock" aria-hidden="true"/>
                </span>
                                </div>
                                <div className="remember_checkbox">
                                    <label>
                                        مرا بخاطر داشته باش
                                        <input type="checkbox"/>
                                        <span className="checkmark"/>
                                    </label>
                                </div>
                                <a href="profile.html" className="ms_btn" target="_blank">
                                    ورود
                                </a>
                                <div className="popup_forgot">
                                    <a href="#">رمز عبور را فراموش کرده اید ؟</a>
                                </div>
                                <p>
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
