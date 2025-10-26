import React, { useEffect, useState } from 'react';
import { getMainPageData, getSectionData } from '../api/section-data.js';
import MediaPortal from './MediaPlayer/MediaPortal.jsx';
import truncateText from "../assets/js/utility.js";
import { Link } from 'react-router-dom';

const NewReleases = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [isOpen, setIsOpen] = useState({}); // ✅ Modal state per post

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.releaseSlider) {
                window.releaseSlider.destroy(true, true);
            }

            window.releaseSlider = new window.Swiper(".ms_release_slider.swiper-container", {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: ".swiper-button-prev2",
                    prevEl: ".swiper-button-next2",
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
            setTimeout(() => initializeSwiper(), 10);
        }
    };

    useEffect(() => {
        loadPageData(4);
    }, []);

    useEffect(() => {
        if (pageData?.content) {
            loadPageContent(pageData.content, "", 8);
        }
    }, [pageData]);

    // ✅ Handle modal open
    const handleMediaClick = (postId) => {
        setIsOpen((prev) => ({ ...prev, [postId]: true }));
    };

    return (
        <div className="ms_releases_wrapper">
            <div className="ms_heading w-100 text-center">
                <h1>{pageData?.title || "جدیدترین ها"}</h1>
                <span className="veiw_all w-100">
                    <Link to={`/posts/?section=${pageData?.content}`}>
                        مشاهده بیشتر
                    </Link>
                </span>
            </div>

            <div className="ms_release_slider swiper-container">
                <div className="ms_divider" />
                <div className="swiper-wrapper">
                    {pageContent ? (
                        pageContent.map((post, index) => (
                            <div data-post-id={post.id} key={index} className="swiper-slide">
                                <div className="ms_release_box">
                                    <div className="w_top_song">
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src={post.thumbnail} alt={post.title} />
                                            <div className="ms_song_overlay"></div>

                                            {/* ✅ Play Button */}
                                            <div
                                                className="ms_play_icon"
                                                onClick={() => handleMediaClick(post.id)}
                                            >
                                                <img src="images/svg/play.svg" alt="Play" />
                                            </div>
                                        </div>

                                        <div className="w_tp_song_name">
                                            <h3>
                                                <a href="#">{truncateText(post?.title, 15, 20)}</a>
                                            </h3>
                                            <p>{truncateText(post?.artist?.name, 15, 20) || "ناشناس"}</p>
                                        </div>
                                    </div>

                                    <div className="weekly_right">
                                        <span className="w_song_time">{post.duration}</span>
                                    </div>

                                    {/* ✅ Modal for each post */}
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

            {/* Swiper navigation */}
            <div className="swiper-button-next2 slider_nav_next" />
            <div className="swiper-button-prev2 slider_nav_prev" />
        </div>
    );
};

export default NewReleases;
