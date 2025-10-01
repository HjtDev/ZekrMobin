import React, {useEffect} from 'react'

const TopPosts = () => {
    useEffect(() => {
        if (window.Swiper) {
            if (window.albumSlider) {
                window.albumSlider.destroy(true, true);
            }

            // Re-init
            window.albumSlider = new window.Swiper('.ms_album_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-next3',
                    prevEl: '.swiper-button-prev3',
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
        <div className="ms_fea_album_slider">
            <div className="ms_heading">
                <h1>آلبوم های منتخب</h1>
                <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
            </div>
            <div className="ms_album_slider swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album1.jpg" alt=""/>
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
                                    <a href="#">Bloodlust</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album2.jpg" alt=""/>
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
                                    <a href="#">Time flies</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album3.jpg" alt=""/>
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
                                    <a href="#">Dark matters</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album4.jpg" alt=""/>
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
                                    <a href="#">Eye to eye</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album5.jpg" alt=""/>
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
                                    <a href="#">Cloud nine</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album6.jpg" alt=""/>
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
                                    <a href="#">Cobweb of lies</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album1.jpg" alt=""/>
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
                                    <a href="#">Bloodlust</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album2.jpg" alt=""/>
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
                                    <a href="#">Time flies</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album3.jpg" alt=""/>
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
                                    <a href="#">Dark matters</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_rcnt_box">
                            <div className="ms_rcnt_box_img">
                                <img src="images/album/album4.jpg" alt=""/>
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
                                    <a href="#">Eye to eye</a>
                                </h3>
                                <p>Ava Cornish &amp; Brian Hill</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Arrows */}
            <div className="swiper-button-next3 slider_nav_next"/>
            <div className="swiper-button-prev3 slider_nav_prev"/>
        </div>)
}
export default TopPosts
