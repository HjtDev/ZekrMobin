import React from 'react'

const Banner = () => {
    return (
        <div className="ms-banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="ms_banner_img">
                            <img src="images/banner.png" alt="" className="img-fluid"/>
                        </div>
                        <div className="ms_banner_text">
                            <h1>آلبوم های</h1>
                            <h1 className="ms_color">منتشر شده این ماه !</h1>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                استفاده از طراحان گرافیک است. <br/> چاپگرها و متون بلکه
                                روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط
                                فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
                                ابزارهای کاربردی می باشد.{" "}
                            </p>
                            <div className="ms_banner_btn">
                                <a href="#" className="ms_btn">
                                    حالا گوش دهید
                                </a>
                                <a href="#" className="ms_btn">
                                    اضافه کردن به لیست
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner
