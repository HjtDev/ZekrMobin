import React from 'react'

const Header = () => {
    return (
        <div className="ms_header">
            <div className="ms_top_left">
                <div className="ms_top_search">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="جستجوی آهنگ، خواننده و ..."
                    />
                    <span className="search_icon">
              <img src="images/svg/search.svg" alt=""/>
            </span>
                </div>
                <div className="ms_top_trend">
            <span>
              <a href="#" className="ms_color">
                آهنگ های پربازدید :
              </a>
            </span>{" "}
                    <span className="top_marquee">
              <a href="#">Dream your moments</a>
            </span>
                </div>
            </div>
            <div className="ms_top_right">
                <div className="ms_top_lang">
            <span data-toggle="modal" data-target="#lang_modal">
              زبان ها <img src="images/svg/lang.svg" alt=""/>
            </span>
                </div>
                <div className="ms_top_btn">
                    <a
                        href="javascript:;"
                        className="ms_btn reg_btn"
                        data-toggle="modal"
                        data-target="#myModal"
                    >
                        <span>ثبت نام</span>
                    </a>
                    <a
                        href="javascript:;"
                        className="ms_btn login_btn"
                        data-toggle="modal"
                        data-target="#myModal1"
                    >
                        <span>ورود</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Header
