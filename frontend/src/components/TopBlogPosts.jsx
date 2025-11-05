import React, {useEffect, useState} from 'react'
import { getFilteredBlogPosts } from '../api/blog.js';
import truncateText from '../assets/js/utility.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopArtists = () => {
    const [pageContent, setPageContent] = useState(null);

    const navigate = useNavigate();

    const initializeSwiper = () => {
        if (window.Swiper) {
            if (window.blogSwiper) {
                window.blogSwiper.destroy(true, true);
            }

            // Re-init
            window.blogSwiper = new window.Swiper('.ms_blog_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-prev8',
                    prevEl: '.swiper-button-next8',
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

    const loadPageContent = async () => {
        const { success, msg, posts, updatedPagination } = await getFilteredBlogPosts({
            selector: "all",
            filters: {
                date: "newest"
            },
            limit: 6
        }, 1);
        if(success) {
            setPageContent(posts);
            setTimeout(() => {initializeSwiper()}, 100);
            msg.forEach(message => toast.success(message));
        } else {
            msg.forEach(message => toast.error(message));
        }
    }

    useEffect(() => {
        loadPageContent();
    }, []);

    return (
        <div className="ms_featured_slider">
            <div className="ms_heading w-100 text-center">
                <h1>پست های جدید مجله</h1>
                <span className="ms_heading_underline" aria-hidden="true"></span>
                <span className="veiw_all w-100">
                    <Link to="/blog/">
                        مشاهده بیشتر
                    </Link>
                </span>
            </div>
            <div className="ms_feature_slider ms_blog_slider swiper-container">
                <div className="swiper-wrapper">
                    {
                        pageContent ?
                            pageContent.map((b_post, index) => (
                                <div
                                    data-artist-id={b_post.id}
                                    key={index}
                                    className="swiper-slide"
                                    onClick={() => {
                                        navigate(`/blog/post/${b_post.id}/${b_post.title}`, { replace: true });
                                    }}
                                >
                                    <div className="ms_rcnt_box">
                                        <div className="ms_rcnt_box_img">
                                            <img src={b_post.thumbnail} alt={b_post.title}/>
                                        </div>
                                        <div className="ms_rcnt_box_text">
                                            <h3>
                                                <a href="#">{truncateText(b_post?.title, 50, 45)}</a>
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
            <div className="swiper-button-next8 slider_nav_next"/>
            <div className="swiper-button-prev8 slider_nav_prev"/>
        </div>)
}
export default TopArtists
