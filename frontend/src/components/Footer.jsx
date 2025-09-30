import React from 'react'

const Footer = () => {
    return (
        <div className="ms_footer_wrapper">
            <div className="ms_footer_logo">
                <a href="index.html">
                    <img src="images/open_logo.png" alt=""/>
                </a>
            </div>
            <div className="ms_footer_inner">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box">
                            <h1 className="footer_title">miraculous</h1>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.{" "}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_app">
                            <h1 className="footer_title">دانلود اپ موبایل</h1>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                استفاده از طراحان گرافیک است.{" "}
                            </p>
                            <a href="#" className="foo_app_btn">
                                <img
                                    src="images/google_play.jpg"
                                    alt=""
                                    className="img-fluid"
                                />
                            </a>
                            <a href="#" className="foo_app_btn">
                                <img src="images/app_store.jpg" alt="" className="img-fluid"/>
                            </a>
                            <a href="#" className="foo_app_btn">
                                <img src="images/windows.jpg" alt="" className="img-fluid"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_subscribe">
                            <h1 className="footer_title">خبرنامه</h1>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                استفاده از طراحان گرافیک است.{" "}
                            </p>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="نام ..."
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ایمیل ..."
                                    />
                                </div>
                                <div className="form-group">
                                    <a href="#" className="ms_btn">
                                        عضویت در خبرنامه
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer_box footer_contacts">
                            <h1 className="footer_title">تماس با ما</h1>
                            <ul className="foo_con_info">
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="images/svg/phone.svg" alt=""/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">تلفن های تماس :</span>
                                        <span>(+98) 2112-34567</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="images/svg/message.svg" alt=""/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">ایمیل ما :</span>
                                        <span>
                      <a href="#">demo@mail.com </a>,{" "}
                                            <a href="#">dummy@mail.com</a>
                    </span>
                                    </div>
                                </li>
                                <li>
                                    <div className="foo_con_icon">
                                        <img src="images/svg/add.svg" alt=""/>
                                    </div>
                                    <div className="foo_con_data">
                                        <span className="con-title">آدرس :</span>
                                        <span>598 پلاک , لندن</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="foo_sharing">
                                <div className="share_title"/>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-facebook" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-linkedin" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-twitter" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-google-plus" aria-hidden="true"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*--Copyright--*/}
            <div className="col-lg-12">
                <div className="ms_copyright">
                    <div className="footer_border"/>
                    <p>
                        تمامی حقوق این سایت متعلق به The Miraculous می باشد. طراحی توسط{" "}
                        <a href="https://www.rtl-theme.com/author/3mad/">3mad</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer
