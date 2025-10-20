import React, { useEffect, useState } from 'react'
import { getSectionData, getMainPageData } from '../api/section-data.js';
import MediaPortal from './MediaPlayer/MediaPortal.jsx';
import truncateText from "../assets/js/utility.js";

const RecentPosts = () => {
    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.recentSwiper) {
                window.recentSwiper.destroy(true, true);
            }
            window.recentSwiper = new window.Swiper('.ms_rcnt_slider .swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev',
                    prevEl: '.swiper-button-next',
                },
                breakpoints: {
                    1800: {slidesPerView: 4},
                    1400: {slidesPerView: 4},
                    992: {slidesPerView: 2, spaceBetween: 10},
                    768: {slidesPerView: 2, spaceBetween: 10},
                    640: {slidesPerView: 1, spaceBetween: 15},
                    480: {slidesPerView: 1},
                    375: {slidesPerView: 1, spaceBetween: 0},
                },
            });
        }
    }

    const [sectionData, setSectionData] = useState(null);
    const [content, setContent] = useState(null);
    const [isOpen, setIsOpen] = useState({});

    const loadRecentPosts = async (section_id) => {
        const { success, data } = await getSectionData(section_id);
        setSectionData(data || null);
    }

    const loadContent = async (content_section) => {
        const { success, content } = await getMainPageData(content_section, '', '6');
        setContent(content || null);
        setTimeout(() => {initializeSwiper()}, 10);
    }

    useEffect(() => {
        loadRecentPosts(1);
    }, []);

    useEffect(() => {
        if(sectionData?.content) {
            loadContent(sectionData.content);
        }
    }, [sectionData]);

    return (
        <div className="ms_rcnt_slider">
            <div className="ms_heading">
                <h1>{sectionData?.title}</h1>
                <span className="veiw_all">
                    <a href="#">مشاهده بیشتر</a>
                </span>
            </div>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {content ? content.map((item, index) => (
                        <div className="swiper-slide" key={index}>
                            <div className="ms_rcnt_box">
                                <div className="ms_rcnt_box_img">
                                    <img src={item?.thumbnail} alt={item?.title} />
                                    <div className="ms_main_overlay">
                                        <div onClick={() => setIsOpen(prev => ({...prev, [item.id]: true}))}>
                                            <div className="ms_box_overlay"/>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="Play"/>
                                            </div>
                                        </div>
                                        <div className="ms_more_icon">
                                            <img src="images/svg/more.svg" alt="More" />
                                        </div>
                                        <ul className="more_option">
                                            <li><a href="#"><span className="opt_icon"><span className="icon icon_fav" /></span> علاقه مندی ها</a></li>
                                            <li><a href="#"><span className="opt_icon"><span className="icon icon_queue" /></span> افزودن به لیست</a></li>
                                            <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn" /></span> دانلود</a></li>
                                            <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst" /></span> افزودن به پلی لیست</a></li>
                                            <li><a href="#"><span className="opt_icon"><span className="icon icon_share" /></span> اشتراک گذاری</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ms_rcnt_box_text">
                                    <h3><a href="#">{truncateText(item?.title, 50, 45)}</a></h3>
                                    <p>{item?.artist.name}</p>
                                </div>

                                {isOpen[item.id] && (
                                    <MediaPortal
                                        isOpen={isOpen[item.id]}
                                        onClose={() => setIsOpen(prev => ({ ...prev, [item.id]: false }))}
                                        postID={item.id}
                                    />
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="loading" style={{ textAlign: 'center', padding: '2rem' }}></div>
                    )}
                </div>
            </div>
            <div className="swiper-button-next slider_nav_next"/>
            <div className="swiper-button-prev slider_nav_prev"/>
        </div>
    )
}
export default RecentPosts;
