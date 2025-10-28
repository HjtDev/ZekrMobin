import React, { useEffect, useState } from 'react'
import { getMainPageData, getSectionData } from '../api/section-data.js'
import truncateText from "../assets/js/utility.js";
import { Link } from 'react-router-dom';

const TopCategories = () => {
    const [pageData, setPageData] = useState(null)
    const [pageContent, setPageContent] = useState(null)

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.categorySlider) {
                window.categorySlider.destroy(true, true)
            }

            window.categorySlider = new window.Swiper('.ms_category_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev-cat',
                    prevEl: '.swiper-button-next-cat',
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
            })
        }
    }

    const loadPageData = async (section_id) => {
        const { success, data } = await getSectionData(section_id)
        if (success) {
            setPageData(data)
        }
    }

    const loadPageContent = async (section, filters, limit) => {
        const { success, content } = await getMainPageData(section, filters, limit)
        if (success) {
            setPageContent(content)
            setTimeout(() => {
                initializeSwiper()
            }, 10)
        }
    }

    useEffect(() => {
        loadPageData(6) // section id for top categories
    }, [])

    useEffect(() => {
        if (pageData?.content) {
            loadPageContent(pageData.content, '', 8)
        }
    }, [pageData])

    return (
        <div className="ms_fea_album_slider">
            <div className="ms_heading w-100 text-center">
                <h1>{pageData?.title || 'دسته بندی های برتر'}</h1>
                <span className="ms_heading_underline" aria-hidden="true"></span>
                <span className="veiw_all w-100">
                    <Link to="/posts/">
                        مشاهده بیشتر
                    </Link>
                </span>
            </div>

            <div className="ms_category_slider swiper-container">
                <div className="swiper-wrapper">
                    {pageContent ? (
                        pageContent.map((category, index) => (
                            <div data-category-id={category.id} key={index} className="swiper-slide">
                                <div className="ms_genres_box">
                                    <img src={category.thumbnail} alt={category.name} className="img-fluid" />
                                    <div className="ms_main_overlay">
                                        <div className="ms_box_overlay" />
                                        <div className="ms_play_icon">
                                            <img src="images/svg/play.svg" alt="" />
                                        </div>
                                        <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">{category.post_count} پست</a>
                      </span>
                                        </div>
                                    </div>
                                    <div className="ms_box_overlay_on">
                                        <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">{truncateText(category?.name, 50, 45)}</a>
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="loading" style={{ textAlign: 'center', padding: '2rem' }} />
                    )}
                </div>
            </div>

            {/* Arrows */}
            <div className="swiper-button-next-cat slider_nav_next" />
            <div className="swiper-button-prev-cat slider_nav_prev" />
        </div>
    )
}

export default TopCategories
