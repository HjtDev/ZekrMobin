import React, {useEffect} from 'react'

const LiveSuggestion = () => {
    useEffect(() => {
        if (window.Swiper) {
            if (window.radioSlider) {
                window.radioSlider.destroy(true, true);
            }

            // Re-init
            window.radioSlider = new window.Swiper('.ms_radio_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-next4',
                    prevEl: '.swiper-button-prev4',
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
        <div className="ms_radio_wrapper">
            <div className="ms_heading">
                <h1>رادیو پخش زنده</h1>
                <span className="veiw_all">
                    <a href="#">مشاهده بیشتر</a>
                </span>
            </div>
            <div className="ms_radio_slider swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img1.jpg" alt=""/>
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
                                    <a href="#">Top Trendings</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img2.jpg" alt=""/>
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
                                    <a href="#">New Romantic Charts</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img3.jpg" alt=""/>
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
                                    <a href="#">Dance Beats - Hip Hops</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img4.jpg" alt=""/>
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
                                    <a href="#">Workout Time</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img5.jpg" alt=""/>
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
                                    <a href="#">Best Classics Of All Time</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img6.jpg" alt=""/>
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
                                    <a href="#">Heart Broken - Soul Music</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/radio/img1.jpg" alt=""/>
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
                                <img src="images/radio/img2.jpg" alt=""/>
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
                                <img src="images/radio/img3.jpg" alt=""/>
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
                                <img src="images/radio/img4.jpg" alt=""/>
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
            <div className="swiper-button-next4 slider_nav_next"/>
            <div className="swiper-button-prev4 slider_nav_prev"/>
        </div>
    )
}
export default LiveSuggestion
