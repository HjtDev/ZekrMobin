import React from 'react'

const PlayerModals = () => {
    return (
        <>
            <div className="ms_clear_modal">
                <div id="clear_modal" className="modal  centered-modal" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="fa_icon form_close"/>
                            </button>
                            <div className="modal-body">
                                <h1>آبا شما برای پاک کردن پلی لیست مطمئن هستبد؟</h1>
                                <div className="clr_modal_btn">
                                    <a href="#">پاک کن</a>
                                    <a href="#">انصراف</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms_save_modal">
                <div id="save_modal" className="modal  centered-modal" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="fa_icon form_close"/>
                            </button>
                            <div className="modal-body">
                                <h1>عضو شوید و آهنگ های خود را به اشتراک گذارید !</h1>
                                <div className="save_modal_btn">
                                    <a href="#">
                                        <i className="fa fa-google-plus-square" aria-hidden="true"/>{" "}
                                        عضویت از طریق اکانت google{" "}
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-facebook-square" aria-hidden="true"/> عضویت
                                        از طریق facebook
                                    </a>
                                </div>
                                <div className="ms_save_email">
                                    <h3>یا استفاده از ایمیل</h3>
                                    <div className="save_input_group">
                                        <input
                                            type="text"
                                            placeholder="نام ..."
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="save_input_group">
                                        <input
                                            type="password"
                                            placeholder="ایمیل ..."
                                            className="form-control"
                                        />
                                    </div>
                                    <button className="save_btn">ورود</button>
                                </div>
                                <div className="ms_dnt_have">
                                    <span>حساب کاربری ندارید ؟</span>
                                    <a
                                        href="javascript:;"
                                        className="hideCurrentModel"
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        ثبت نام
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlayerModals
