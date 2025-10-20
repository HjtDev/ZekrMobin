import React, {useEffect, useState} from 'react'
import { getMainPageData, getSectionData } from '../api/section-data.js';
import truncateText from "../assets/js/utility.js";

const TopArtists = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState(null);

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.featuredSwiper) {
                window.featuredSwiper.destroy(true, true);
            }

            // Re-init
            window.featuredSwiper = new window.Swiper('.ms_feature_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev1',
                    prevEl: '.swiper-button-next1',
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

    const loadPageData = async (section_id) => {
        const { success, data } = await getSectionData(section_id);
        if(success) {
            setPageData(data);
        }
    }
    const loadPageContent = async (section, filters, limit) => {
        const { success, content } = await getMainPageData(section, filters, limit);
        if(success) {
            setPageContent(content);
            setTimeout(() => {initializeSwiper()}, 10);
        }
    }

    useEffect(() => {
        loadPageData(3);
    }, []);

    useEffect(() => {
        if(pageData?.content) {
            loadPageContent(pageData.content, '', 6);
        }
    }, [pageData]);

    return (
        <div className="ms_featured_slider">
            <div className="ms_heading">
                <h1>{pageData?.title || "هنرمند های برتر"}</h1>
                <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
            </div>
            <div className="ms_feature_slider swiper-container">
                <div className="swiper-wrapper">
                    {
                        pageContent ?
                            pageContent.map((element, index) => (
                                <div data-artist-id={element.id} key={index} className="swiper-slide">
                                    <div className="ms_rcnt_box">
                                        <div className="ms_rcnt_box_img">
                                            <img src={element.profile_picture} alt=""/>
                                            <div className="ms_main_overlay">
                                                <div className="ms_box_overlay"/>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms_rcnt_box_text">
                                            <h3>
                                                <a href="#">{truncateText(element?.name, 50, 45)}</a>
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
            {/* Add Arrows */}
            <div className="swiper-button-next1 slider_nav_next"/>
            <div className="swiper-button-prev1 slider_nav_prev"/>
        </div>)
}
export default TopArtists
