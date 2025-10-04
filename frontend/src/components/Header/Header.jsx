import React, {useState} from 'react'
import { useAuth } from "../../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const {user, isLoggedIn, logout} = useAuth();
    const [userDropDown, setUserDropDown] = useState('');

    const toggleUserDropDown = () => {
        if(userDropDown === '') {
            setUserDropDown('open_dropdown');
        } else {
            setUserDropDown('');
        }
    }

    const LoggedInButtons = (
        <div className="ms_top_btn">
            <a href="#" onClick={toggleUserDropDown} role="button" className="ms_admin_name">
                {user?.name}
                {
                    user?.profile_picture ?
                    <img src={import.meta.env.VITE_BASE_URL + user.profile_picture} className="ms_pro_name" alt="User Profile Picture"/> :
                    <span className="ms_pro_name">{user?.name[0]}</span>
                }
            </a>
            <ul className={`pro_dropdown_menu text-right ${userDropDown}`} style={{top: "100%", right: "5%"}}>
                <li>
                    <Link to='/'>خانه</Link>
                </li>

                <li>
                    <Link to='/profile'>پروفایل</Link>
                </li>

                <li>
                    <a href="blog.html" target="_blank">
                        بلاگ
                    </a>
                </li>

                <li>
                    <a href="#" onClick={logout}>خروج</a>
                </li>
            </ul>
        </div>
    )

    const NotLoggedInButtons = (
        <div className="ms_top_btn">
            <a
                href="javascript:"
                className="ms_btn reg_btn"
                data-toggle="modal"
                data-target="#myModal"
            >
                <span>ثبت نام</span>
            </a>
            <a
                href="javascript:"
                className="ms_btn login_btn"
                data-toggle="modal"
                data-target="#myModal1"
            >
                <span>ورود</span>
            </a>
        </div>
    )


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
                {isLoggedIn ? LoggedInButtons : NotLoggedInButtons}
            </div>
        </div>
    )
}
export default Header
