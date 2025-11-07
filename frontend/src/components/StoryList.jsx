import React, {useEffect, useState} from 'react';
import Stories from 'react-insta-stories';
import { getMainPageData, getSectionData } from '../api/section-data.js';
import truncateText from '../assets/js/utility.js';
import {toast} from "react-toastify";
import getPost from "../api/post.js";


const StoryList = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.storySlider) {
                window.storySlider.destroy(true, true);
            }

            // Re-init
            window.storySlider = new window.Swiper('.ms_slider_stories.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev9',
                    prevEl: '.swiper-button-next9',
                },
                breakpoints: {
                    1800: {slidesPerView: 7},
                    1400: {slidesPerView: 7},
                    992: {slidesPerView: 6, spaceBetween: 10},
                    768: {slidesPerView: 5, spaceBetween: 10},
                    640: {slidesPerView: 3, spaceBetween: 15},
                    480: {slidesPerView: 3},
                    375: {slidesPerView: 3, spaceBetween: 10},
                },
            });
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    const [storyOpen, setStoryOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeStory, setActiveStory] = useState(null);

    const updateStoryIndex = (ch) => {
        setCurrentIndex(prev => prev + ch);
    }

    const fetchPageDaga = async () => {
        const { success, data } = await getSectionData(9);
        if(success) setPageData(data);
    }

    const fetchPageContent = async () => {
        const { success, content } = await getMainPageData(pageData.content, '', 10);
        if(success) {
            setPageContent(content);
            setTimeout(initializeSwiper, 10);
        }
    }

    const openStory = async (storyID) => {
        if(isLoading) {
            toast.warning("لطفا صبر کنید تا پست بارگذاری شود.");
            return;
        }
        toast.info("در حال بارگذاری");
        setIsLoading(true);
        const { success, post } = await getPost(storyID, false);
        if(success) {
            let content = [];
            if(post?.media && post.media.length > 0) {
                post.media.forEach(item => {
                    if(item?.files && item?.files[0]) {
                        content.push({
                            url: item.files[0].file,
                            type: item.files[0].media_type,
                            preloadResource: true,
                            header: {
                                // heading: item.name,
                                // subheading: item.artist.name,
                                profileImage: post.thumbnail,
                            },
                        });
                    }
                });
            }
            if(content.length > 0) {
                setStoryOpen(true);
                setActiveStory(content);
            } else {
                toast.error("در بارگذاری استوری مشکلی پیش آمده است.");
            }
        } else {
            toast.error("مشکلی پیش آمد لطفا بعدا تلاش کنید.");
        }
        setIsLoading(false);
    }

    const closeStory = () => {
        setStoryOpen(false);
    }

    useEffect(() => {
        fetchPageDaga();
    }, []);

    useEffect(() => {
        if(pageData?.content) fetchPageContent();
    }, [pageData]);

    return (
        <>
            <div className="ms_fea_album_slider" style={{marginTop: "100rem", marginBottom: "150rem"}}>
                <div className="ms_heading w-100 text-center">
                    <h1>{pageData?.title || "استوری ها"}</h1>
                    <span className="ms_heading_underline" aria-hidden="true"></span>
                </div>
                <div className="ms_album_slider ms_slider_stories swiper-container">
                    <div className="swiper-wrapper">
                        {
                            pageContent ?
                                pageContent.map((story, index) => (
                                    <div
                                        data-category-id={story.id}
                                        key={index}
                                        className="swiper-slide"
                                        onClick={() => openStory(story.id)}
                                    >
                                        <div className="ms_rcnt_box">
                                            <div
                                                className="ms_rcnt_box_img"
                                                style={{
                                                    borderRadius: "50%",
                                                    padding: "4rem",
                                                    background: "linear-gradient(to top left, #14182A,#21B1CD,#0068E2,#21B1CD)",
                                                }}
                                            >
                                                <img src={story.thumbnail} alt={story.title}
                                                     style={{
                                                         borderRadius: "50%",
                                                }}/>
                                                {
                                                    !isMobile && (
                                                        <div className="ms_main_overlay" style={{borderRadius: "50%"}}>
                                                            <div className="ms_box_overlay" style={{borderRadius: "50%"}}/>
                                                            <div
                                                                className="ms_play_icon"
                                                            >
                                                                <img src="images/svg/play.svg" alt="Play Icon"/>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className="ms_box_overlay_on">
                                                    <div className="ovrly_text_div">
                                                    <span className="ovrly_text1">
                                                        <a href="#" className="prevent-default">
                                                            {story.title}
                                                        </a>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ms_rcnt_box_text">
                                                <h3>
                                                    <a href="#">{truncateText(story?.name, 50, 45)}</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                (
                                    <div className="loading" style={{textAlign: "center", padding: "2rem"}}></div>
                                )
                        }

                    </div>
                </div>
                <div className="swiper-button-next9 slider_nav_next" style={{marginTop: "16rem"}}/>
                <div className="swiper-button-prev9 slider_nav_prev" style={{marginTop: "16rem"}}/>
            </div>
            {
                storyOpen && !isLoading && (
                    <div
                        style={{
                            direction: 'ltr',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            flexDirection: 'column',
                            zIndex: 9999,
                        }}
                        dir="ltr"
                    >
                        <button
                            onClick={closeStory}
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                position: 'relative',
                                top: 60,
                                right: -150,
                                zIndex: 9999,
                                background: 'none',
                                border: 'none',
                                borderRadius: '50%',
                                color: 'white',
                                fontSize: 24,
                                width: 40,
                                height: 40,
                                cursor: 'pointer',
                            }}>
                            ✕
                        </button>

                        <Stories
                            stories={activeStory}
                            currentIndex={currentIndex}
                            defaultInterval={1000}
                            // width={360}
                            // height={640}
                            loop={true}
                            isPaused={false}
                            preventDefault={false}
                            preloadCount={1}
                            onNext={() => updateStoryIndex(1)}
                            onPrevious={() => updateStoryIndex(-1)}
                            onStoryEnd={() => updateStoryIndex(1)}
                            keyboardNavigation={true}
                            onAllStoriesEnd={closeStory}
                            storyStyles={{
                                aspectRatio: '9/16'
                            }}
                        />
                    </div>
                )
            }
        </>
        )
}

export default StoryList;
