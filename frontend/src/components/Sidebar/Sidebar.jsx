import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import fetchSettings from '../../api/settings.js';
import { toast } from 'react-toastify';

const Sidebar = () => {
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
                            <img src={logos?.logo} alt="" className="img-fluid" />
                        </Link>
                    </div>
                    <div className="ms_logo_open">
                        <Link to="/">
                            <img src={logos?.open_logo} alt="" className="img-fluid" />
                        </Link>
                    </div>
                </div>
                <div className="ms_nav_wrapper">
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="nav_icon">
                                    <span className="icon icon_discover"/>
                                </span>
                                <span className="nav_text">خانه</span>
                            </Link>
                        </li>
                        <li>
                            <a href="album.html" title="آلبوم ها">
                <span className="nav_icon">
                  <span className="icon icon_albums" />
                </span>
                                <span className="nav_text">آلبوم ها</span>
                            </a>
                        </li>
                        <li>
                            <a href="artist.html" title="خوانندگان">
                <span className="nav_icon">
                  <span className="icon icon_artists" />
                </span>
                                <span className="nav_text">خوانندگان</span>
                            </a>
                        </li>
                        <li>
                            <a href="genres.html" title="سبک ها">
                <span className="nav_icon">
                  <span className="icon icon_genres" />
                </span>
                                <span className="nav_text">سبک ها</span>
                            </a>
                        </li>
                        <li>
                            <a href="top_track.html" title="برترین ها">
                <span className="nav_icon">
                  <span className="icon icon_tracks" />
                </span>
                                <span className="nav_text">برترین ها</span>
                            </a>
                        </li>
                        <li>
                            <a href="free_music.html" title="موزیک رایگان">
                <span className="nav_icon">
                  <span className="icon icon_music" />
                </span>
                                <span className="nav_text">موزیک رایگان</span>
                            </a>
                        </li>
                        <li>
                            <a href="stations.html" title="ایستگاه رادیویی">
                <span className="nav_icon">
                  <span className="icon icon_station" />
                </span>
                                <span className="nav_text">ایستگاه رادیویی</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav_downloads">
                        <li>
                            <a href="download.html" title="دانلود ها">
                <span className="nav_icon">
                  <span className="icon icon_download" />
                </span>
                                <span className="nav_text">دانلود ها</span>
                            </a>
                        </li>
                        <li>
                            <a href="purchase.html" title="پیشنهاد هفته">
                <span className="nav_icon">
                  <span className="icon icon_purchased" />
                </span>
                                <span className="nav_text">پیشنهاد هفته</span>
                            </a>
                        </li>
                        <li>
                            <a href="favourite.html" title="علاقه مندی ها">
                <span className="nav_icon">
                  <span className="icon icon_favourite" />
                </span>
                                <span className="nav_text">علاقه مندی ها</span>
                            </a>
                        </li>
                        <li>
                            <a href="history.html" title="تاریخچه">
                <span className="nav_icon">
                  <span className="icon icon_history" />
                </span>
                                <span className="nav_text">تاریخچه</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav_playlist">
                        <li>
                            <a href="feature_playlist.html" title="آهنگ های ویژه">
                <span className="nav_icon">
                  <span className="icon icon_fe_playlist" />
                </span>
                                <span className="nav_text">آهنگ های ویژه</span>
                            </a>
                        </li>
                        <li>
                            <a href="add_playlist.html" title="ایجاد لیست جدید">
                <span className="nav_icon">
                  <span className="icon icon_c_playlist" />
                </span>
                                <span className="nav_text">ایجاد لیست جدید</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
