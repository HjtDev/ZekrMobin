import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import fetchSettings from '../../api/settings.js';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ReloadInPostList from '../../assets/js/reloadInPostList.js';

const Sidebar = () => {
    const { isLoggedIn } = useAuth();
    const [logos, setLogos] = useState(null);
    useEffect(() => {
        const getLogo = async () => {
            const { success, msg, config } = await fetchSettings(["logo"]);
            if(success) {
                setLogos(config);
            } else {
                toast.error("در دریافت لوگو سایت مشکلی پیش آمد.");
                console.error(msg);
            }
        }
        getLogo();
    }, []);
    return (
        <div className="ms_sidemenu_wrapper">
            <div className="ms_nav_close">
                <i className="fa fa-angle-left" aria-hidden="true" />
            </div>
            <div className="ms_sidemenu_inner">
                <div className="ms_logo_inner">
                    <div className="ms_logo">
                        <Link to="/">
                            <img src={logos?.logo} alt="Sidebar logo" className="img-fluid" />
                        </Link>
                    </div>
                    <div className="ms_logo_open">
                        <Link to="/">
                            <img src={logos?.open_logo} alt="Footer logo" className="img-fluid" />
                        </Link>
                    </div>
                </div>
                <div className="ms_nav_wrapper">
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="nav_icon">
                                    <span className="fa fa-home"/>
                                </span>
                                <span className="nav_text">خانه</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/" title="پست ها">
                                <span className="nav_icon">
                                  <span className="fa fa-list" />
                                </span>
                                <span className="nav_text">پست ها</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog/" title="مجله">
                                <span className="nav_icon">
                                  <span className="fa fa-book" />
                                </span>
                                <span className="nav_text">مجله</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/artists/" title="هنرمندان">
                                <span className="nav_icon">
                                  <span className="fa fa-user" />
                                </span>
                                <span className="nav_text">هنرمندان</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav_downloads">
                        {
                            isLoggedIn && (
                                <li>
                                    <Link to="/profile/" title="پروفایل">
                                <span className="nav_icon">
                                  <span className="fa fa-user-circle"/>
                                </span>
                                        <span className="nav_text">پروفایل</span>
                                    </Link>
                                </li>
                            )
                        }
                        {
                            !isLoggedIn && (
                                <div>
                                    <li>
                                        <Link to="#" title="ورود" className="prevent-default"
                                              onClick={() => document.getElementsByClassName('login_btn')?.[0].click()}>
                                        <span className="nav_icon">
                                          <span className="fa fa-sign-in"/>
                                        </span>
                                            <span className="nav_text">ورود</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" title="ثبت نام" className="prevent-default"
                                              onClick={() => document.getElementsByClassName('reg_btn')?.[0].click()}>
                                        <span className="nav_icon">
                                          <span className="fa fa-sign-out"/>
                                        </span>
                                            <span className="nav_text">ثبت نام</span>
                                        </Link>
                                    </li>
                                </div>
                            )
                        }
                    </ul>

                    <ul className="nav_downloads">
                        <li>
                            <Link to="/posts/?section=recent-posts" onClick={() => ReloadInPostList()} title="برترین ها">
                                <span className="nav_icon">
                                  <span className="fa fa-star" />
                                </span>
                                <span className="nav_text">برترین ها</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/?section=weekly-posts" onClick={() => ReloadInPostList()} title="برترین های هفته">
                                <span className="nav_icon">
                                  <span className="fa fa-play" />
                                </span>
                                <span className="nav_text">برترین های هفته</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/?section=new-posts" onClick={() => ReloadInPostList()} title="جدیدترین پست ها">
                                <span className="nav_icon">
                                  <span className="fa fa-plus" />
                                </span>
                                <span className="nav_text">جدیدترین پست ها</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/?section=live-suggestions" onClick={() => ReloadInPostList()} title="پست های پیشنهادی">
                                <span className="nav_icon">
                                  <span className="fa fa-share" />
                                </span>
                                <span className="nav_text">پیشنهادی</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="nav_playlist">
                        {
                            isLoggedIn && (
                                <li>
                                    <Link to="/profile/liked/" title="علاقه مندی ها">
                                        <span className="nav_icon">
                                          <span className="fa fa-heart" />
                                        </span>
                                        <span className="nav_text">علاقه مندی ها</span>
                                    </Link>
                                </li>
                            )
                        }
                        {
                            isLoggedIn && (
                                <li>
                                    <Link to="/profile/history/" title="تاریخچه">
                                        <span className="nav_icon">
                                          <span className="fa fa-history" />
                                        </span>
                                        <span className="nav_text">تاریخچه</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
