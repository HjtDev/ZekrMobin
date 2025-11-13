import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import truncateText from '../../assets/js/utility.js';
import toggleSidebar from '../../assets/js/toggleSidebar.js';

const Header = () => {
    const {user, isLoggedIn, logout} = useAuth();
    const [userDropDown, setUserDropDown] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
    }

    const toggleUserDropDown = (e) => {
        e.preventDefault();
        if(userDropDown === '') {
            setUserDropDown('open_dropdown');
        } else {
            setUserDropDown('');
        }
    }

    const searchAction = () => {
        navigate(`/posts/?search=${searchQuery}`, { replace: false });
        if(window.location.pathname.startsWith("/posts")) window.location.reload();
    }

    const LoggedInButtons = (
        <div className="ms_top_btn">
            <a href="#" onClick={(e) => toggleUserDropDown(e)} role="button" className="ms_admin_name">
                {truncateText(user?.name, 5)}
                {
                    user?.profile_picture ?
                    <img src={user.profile_picture} className="ms_pro_name" alt="User Profile Picture"/> :
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
                    <a href="#" onClick={logoutHandler}>خروج</a>
                </li>
            </ul>
        </div>
    )

    const NotLoggedInButtons = (
        <div className="ms_top_btn">
            <a
                href="javascript:"
                className="ms_btn d-none reg_btn"
                data-toggle="modal"
                data-target="#myModal"
            >
                <span>ثبت نام</span>
            </a>
            <a
                href="javascript:"
                className="ms_btn login_btn"
                onClick={() => toggleSidebar(true)}
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
                        placeholder="جست و جو بر اساس پست, هنرمند ..."
                        autoComplete="none"
                        aria-autocomplete="none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                searchAction();
                            }
                        }}
                        style={{
                            paddingLeft: "50rem"
                        }}
                    />
                    <span className="search_icon" onClick={() => searchAction()}>
                        <img src="/images/svg/search.svg" alt="Search Icon"/>
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
