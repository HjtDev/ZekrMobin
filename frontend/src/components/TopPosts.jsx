import React, {useEffect, useState} from 'react'
import { getMainPageData, getSectionData } from '../api/section-data.js';
import truncateText from "../assets/js/utility.js";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TopPosts = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const navigate = useNavigate();

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.topPostSlider) {
                window.topPostSlider.destroy(true, true);
            }

            // Re-init
            window.topPostSlider = new window.Swiper('.ms_top_posts_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev3',
                    prevEl: '.swiper-button-next3',
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
        loadPageData(5);
    }, []);

    useEffect(() => {
        if(pageData?.content) {
            loadPageContent(pageData.content, '', 15);
        }
    }, [pageData]);

    return (
        <div className="ms_fea_album_slider">
            <div className="ms_heading w-100 text-center">
                <h1>{pageData?.title || "دسته بندی های منتخب"}</h1>
                <span className="ms_heading_underline" aria-hidden="true"></span>
                <span className="veiw_all w-100">
                    <Link to="/posts/">
                        مشاهده بیشتر
                    </Link>
                </span>
            </div>
            <div className="ms_album_slider ms_top_posts_slider swiper-container">
                <div className="swiper-wrapper">
                    {
                        pageContent ?
                            pageContent.map((category, index) => (
                                <div data-category-id={category.id} key={index} className="swiper-slide">
                                    <div className="ms_rcnt_box">
                                        <div className="ms_rcnt_box_img">
                                            <img src={category.thumbnail} alt={category.name}/>
                                            <div className="ms_main_overlay">
                                                <div className="ms_box_overlay"/>
                                                <div
                                                    className="ms_play_icon"
                                                    onClick={() => navigate(`/posts/?categories=${category.id}`)}
                                                >
                                                    <img src="images/svg/play.svg" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms_rcnt_box_text">
                                            <h3 onClick={() => navigate(`/posts/?categories=${category.id}`)}>
                                                <a href="#">{truncateText(category?.name, 50, 45)}</a>
                                            </h3>
                                            <p>دسته بندی منتخب - {category.post_count} پست</p>
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
            <div className="swiper-button-next3 slider_nav_next"/>
            <div className="swiper-button-prev3 slider_nav_prev"/>
        </div>)
}
export default TopPosts
