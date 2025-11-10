import React, { useEffect, useState } from 'react';
import { getSectionData, getMainPageData } from '../api/section-data.js';
import MediaPortal from './MediaPlayer/MediaPortal.jsx';
import truncateText from "../assets/js/utility.js";
import { DownloadButton, LikeButton, ShareButton } from "../assets/js/quickActions.jsx";
import {Link} from "react-router-dom";

const LiveSuggestion = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [isOpen, setIsOpen] = useState({}); // ✅ Modal open state per post

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.radioSlider) {
                window.radioSlider.destroy(true, true);
            }

            window.radioSlider = new window.Swiper(".ms_radio_slider.swiper-container", {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: ".swiper-button-prev4",
                    prevEl: ".swiper-button-next4",
                },
                breakpoints: {
                    1800: { slidesPerView: 4 },
                    1400: { slidesPerView: 4 },
                    992: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 1, spaceBetween: 15 },
                    480: { slidesPerView: 1 },
                    375: { slidesPerView: 1, spaceBetween: 0 },
                },
            });
        }
    };

    const loadPageData = async (section_id) => {
        const { success, data } = await getSectionData(section_id);
        if (success) {
            setPageData(data);
        }
    };

    const loadPageContent = async (section, filters, limit) => {
        const { success, content } = await getMainPageData(section, filters, limit);
        if (success) {
            setPageContent(content);
            setTimeout(() => {
                initializeSwiper();
            }, 10);
        }
    };

    useEffect(() => {
        loadPageData(7);
    }, []);

    useEffect(() => {
        if (pageData?.content) {
            loadPageContent(pageData.content, "", 6);
        }
    }, [pageData]);

    // ✅ Open modal for the selected post
    const handleMediaClick = (postId) => {
        setIsOpen((prev) => ({ ...prev, [postId]: true }));
    };

    return (
        <div className="ms_radio_wrapper">
            <div className="ms_heading w-100 text-center">
                <h1>{pageData?.title}</h1>
                <span className="ms_heading_underline" aria-hidden="true"></span>
                <span className="veiw_all w-100">
                    <Link to={`/posts/?section=${pageData?.content}`}>
                        مشاهده بیشتر
                    </Link>
                </span>
            </div>

            <div className="ms_radio_slider swiper-container">
                <div className="swiper-wrapper">
                    {pageContent ? (
                        pageContent.map((post, index) => (
                            <div className="swiper-slide" data-post-id={post.id} key={index}>
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src={post.thumbnail} alt={post.title} />
                                        <div className="ms_main_overlay">
                                            <div
                                                className="ms_box_overlay"
                                                onClick={() => handleMediaClick(post.id)} // ✅ Cover click
                                            />
                                            <div
                                                className="ms_play_icon"
                                                onClick={() => handleMediaClick(post.id)} // ✅ Play click
                                            >
                                                <img src="images/svg/play.svg" alt="Play" />
                                            </div>

                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="More" />
                                            </div>

                                            <ul className="more_option">
                                                <LikeButton postID={post?.id}/>
                                                <DownloadButton postID={post?.id}/>
                                                <ShareButton postID={post?.id}/>
                                            </ul>

                                        </div>
                                    </div>

                                    <div
                                        className="ms_rcnt_box_text"
                                        onClick={() => handleMediaClick(post.id)}
                                    >
                                        <h3>
                                            <a href={`${window.location.origin}/?play=${post.id}`} className="prevent-default">{truncateText(post?.title, 50, 45)}</a>
                                        </h3>
                                    </div>

                                    {/* ✅ Modal per post */}
                                    <MediaPortal
                                        isOpen={isOpen[post.id]}
                                        onClose={() =>
                                            setIsOpen((prev) => ({ ...prev, [post.id]: false }))
                                        }
                                        postID={post.id}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            className="loading"
                            style={{ textAlign: "center", padding: "2rem" }}
                        ></div>
                    )}
                </div>
            </div>

            {/* Swiper Arrows */}
            <div className="swiper-button-next4 slider_nav_next" />
            <div className="swiper-button-prev4 slider_nav_prev" />
        </div>
    );
};

export default LiveSuggestion;
