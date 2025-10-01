import React, {useEffect} from 'react'

const TopArtists = () => {
    useEffect(() => {
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
                    nextEl: '.swiper-button-next1',
                    prevEl: '.swiper-button-prev1',
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
    }, []);
    return (
        <div className="ms_featured_slider">
            <div className="ms_heading">
                <h1>خوانندگان برگزیده</h1>
                <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
            </div>
            <div className="ms_feature_slider swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song1.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Best Of Ava Cornish</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song2.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Until I Met You</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song3.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Gimme Some Courage</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song4.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Dark Alley Acoustic</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song5.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Walking Promises</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song6.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Desired Games</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song1.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Dream Your Moments (Duet)</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song2.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Until I Met You</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song3.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Gimme Some Courage</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/featured/song4.jpg" alt=""/>
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"/>
                                    <div className="ms_more_icon">
                                        <img src="images/svg/more.svg" alt=""/>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav"/>
                          </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue"/>
                          </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn"/>
                          </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst"/>
                          </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share"/>
                          </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3>
                                    <a href="#">Dark Alley Acoustic</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Arrows */}
            <div className="swiper-button-next1 slider_nav_next"/>
            <div className="swiper-button-prev1 slider_nav_prev"/>
        </div>)
}
export default TopArtists
