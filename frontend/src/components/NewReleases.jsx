import React, {useEffect} from 'react'

const NewReleases = () => {
    useEffect(() => {
        if (window.Swiper) {
            if (window.releaseSlider) {
                window.releaseSlider.destroy(true, true);
            }

            // Re-init
            window.releaseSlider = new window.Swiper('.ms_release_slider.swiper-container', {
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                speed: 1500,
                navigation: {
                    nextEl: '.swiper-button-next2',
                    prevEl: '.swiper-button-prev2',
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
        <div className="ms_releases_wrapper">
            <div className="ms_heading">
                <h1>جدیدترین آهنگ ها</h1>
                <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
            </div>
            <div className="ms_release_slider swiper-container">
                <div className="ms_divider"/>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="ms_release_box">
                            <div className="w_top_song">
                                <span className="slider_dot"/>
                                <div className="w_tp_song_img">
                                    <img src="images/weekly/song1.jpg" alt=""/>
                                    <div className="ms_song_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                                <div className="w_tp_song_name">
                                    <h3>
                                        <a href="#">Dark Alley Acoustic</a>
                                    </h3>
                                    <p>Ava Cornish</p>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">5:10</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_release_box">
                            <div className="w_top_song">
                                <span className="slider_dot"/>
                                <div className="w_tp_song_img">
                                    <img src="images/weekly/song2.jpg" alt=""/>
                                    <div className="ms_song_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                                <div className="w_tp_song_name">
                                    <h3>
                                        <a href="#">Dark Alley Acoustic</a>
                                    </h3>
                                    <p>Ava Cornish</p>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">5:10</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_release_box">
                            <div className="w_top_song">
                                <span className="slider_dot"/>
                                <div className="w_tp_song_img">
                                    <img src="images/weekly/song3.jpg" alt=""/>
                                    <div className="ms_song_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                                <div className="w_tp_song_name">
                                    <h3>
                                        <a href="#">Dark Alley Acoustic</a>
                                    </h3>
                                    <p>Ava Cornish</p>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">5:10</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_release_box">
                            <div className="w_top_song">
                                <span className="slider_dot"/>
                                <div className="w_tp_song_img">
                                    <img src="images/weekly/song4.jpg" alt=""/>
                                    <div className="ms_song_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                                <div className="w_tp_song_name">
                                    <h3>
                                        <a href="#">Dark Alley Acoustic</a>
                                    </h3>
                                    <p>Ava Cornish</p>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">5:10</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="ms_release_box">
                            <div className="w_top_song">
                                <span className="slider_dot"/>
                                <div className="w_tp_song_img">
                                    <img src="images/weekly/song5.jpg" alt=""/>
                                    <div className="ms_song_overlay"></div>
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt=""/>
                                    </div>
                                </div>
                                <div className="w_tp_song_name">
                                    <h3>
                                        <a href="#">Dark Alley Acoustic</a>
                                    </h3>
                                    <p>Ava Cornish</p>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">5:10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Arrows */}
            <div className="swiper-button-next2 slider_nav_next"/>
            <div className="swiper-button-prev2 slider_nav_prev"/>
        </div>)
}
export default NewReleases
