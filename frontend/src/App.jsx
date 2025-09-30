import './App.css'

function App() {

  return (
    <>
        <div className="ms_loader">
            <div className="wrap">
                <img src="images/loader.gif" alt="" />
            </div>
        </div>
        {/*--Main Wrapper Start--*/}
        <div className="ms_main_wrapper">
            {/*-Side Menu Start-*/}
            <div className="ms_sidemenu_wrapper">
                <div className="ms_nav_close">
                    <i className="fa fa-angle-left" aria-hidden="true" />
                </div>
                <div className="ms_sidemenu_inner">
                    <div className="ms_logo_inner">
                        <div className="ms_logo">
                            <a href="index.html">
                                <img src="images/logo.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="ms_logo_open">
                            <a href="index.html">
                                <img src="images/open_logo.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                    </div>
                    <div className="ms_nav_wrapper">
                        <ul>
                            <li>
                                <a href="index.html" className="active" title="خانه">
                <span className="nav_icon">
                  <span className="icon icon_discover" />
                </span>
                                    <span className="nav_text">خانه</span>
                                </a>
                            </li>
                            <li>
                                <a href="album.html" title="آلبوم ها">
                <span className="nav_icon">
                  <span className="icon icon_albums" />
                </span>
                                    <span className="nav_text">آلبوم ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="artist.html" title="خوانندگان">
                <span className="nav_icon">
                  <span className="icon icon_artists" />
                </span>
                                    <span className="nav_text">خوانندگان</span>
                                </a>
                            </li>
                            <li>
                                <a href="genres.html" title="سبک ها">
                <span className="nav_icon">
                  <span className="icon icon_genres" />
                </span>
                                    <span className="nav_text">سبک ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="top_track.html" title="برترین ها">
                <span className="nav_icon">
                  <span className="icon icon_tracks" />
                </span>
                                    <span className="nav_text">برترین ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="free_music.html" title="موزیک رایگان">
                <span className="nav_icon">
                  <span className="icon icon_music" />
                </span>
                                    <span className="nav_text">موزیک رایگان</span>
                                </a>
                            </li>
                            <li>
                                <a href="stations.html" title="ایستگاه رادیویی">
                <span className="nav_icon">
                  <span className="icon icon_station" />
                </span>
                                    <span className="nav_text">ایستگاه رادیویی</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav_downloads">
                            <li>
                                <a href="download.html" title="دانلود ها">
                <span className="nav_icon">
                  <span className="icon icon_download" />
                </span>
                                    <span className="nav_text">دانلود ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="purchase.html" title="پیشنهاد هفته">
                <span className="nav_icon">
                  <span className="icon icon_purchased" />
                </span>
                                    <span className="nav_text">پیشنهاد هفته</span>
                                </a>
                            </li>
                            <li>
                                <a href="favourite.html" title="علاقه مندی ها">
                <span className="nav_icon">
                  <span className="icon icon_favourite" />
                </span>
                                    <span className="nav_text">علاقه مندی ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="history.html" title="تاریخچه">
                <span className="nav_icon">
                  <span className="icon icon_history" />
                </span>
                                    <span className="nav_text">تاریخچه</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav_playlist">
                            <li>
                                <a href="feature_playlist.html" title="آهنگ های ویژه">
                <span className="nav_icon">
                  <span className="icon icon_fe_playlist" />
                </span>
                                    <span className="nav_text">آهنگ های ویژه</span>
                                </a>
                            </li>
                            <li>
                                <a href="add_playlist.html" title="ایجاد لیست جدید">
                <span className="nav_icon">
                  <span className="icon icon_c_playlist" />
                </span>
                                    <span className="nav_text">ایجاد لیست جدید</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*-Main Content Start-*/}
            <div className="ms_content_wrapper padder_top80">
                {/*-Header-*/}
                <div className="ms_header">
                    <div className="ms_top_left">
                        <div className="ms_top_search">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="جستجوی آهنگ، خواننده و ..."
                            />
                            <span className="search_icon">
              <img src="images/svg/search.svg" alt="" />
            </span>
                        </div>
                        <div className="ms_top_trend">
            <span>
              <a href="#" className="ms_color">
                آهنگ های پربازدید :
              </a>
            </span>{" "}
                            <span className="top_marquee">
              <a href="#">Dream your moments</a>
            </span>
                        </div>
                    </div>
                    <div className="ms_top_right">
                        <div className="ms_top_lang">
            <span data-toggle="modal" data-target="#lang_modal">
              زبان ها <img src="images/svg/lang.svg" alt="" />
            </span>
                        </div>
                        <div className="ms_top_btn">
                            <a
                                href="javascript:;"
                                className="ms_btn reg_btn"
                                data-toggle="modal"
                                data-target="#myModal"
                            >
                                <span>ثبت نام</span>
                            </a>
                            <a
                                href="javascript:;"
                                className="ms_btn login_btn"
                                data-toggle="modal"
                                data-target="#myModal1"
                            >
                                <span>ورود</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/*-Banner-*/}
                <div className="ms-banner">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="ms_banner_img">
                                    <img src="images/banner.png" alt="" className="img-fluid" />
                                </div>
                                <div className="ms_banner_text">
                                    <h1>آلبوم های</h1>
                                    <h1 className="ms_color">منتشر شده این ماه !</h1>
                                    <p>
                                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                        استفاده از طراحان گرافیک است. <br /> چاپگرها و متون بلکه
                                        روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط
                                        فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
                                        ابزارهای کاربردی می باشد.{" "}
                                    </p>
                                    <div className="ms_banner_btn">
                                        <a href="#" className="ms_btn">
                                            حالا گوش دهید
                                        </a>
                                        <a href="#" className="ms_btn">
                                            اضافه کردن به لیست
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*-Recently Played Music-*/}
                <div className="ms_rcnt_slider">
                    <div className="ms_heading">
                        <h1>آخرین بازدیدها</h1>
                        <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Dream Your Moments (Duet)</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Until I Met You</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Gimme Some Courage</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Dark Alley Acoustic</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music5.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Walking Promises</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music6.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Desired Games</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Dream Your Moments (Duet)</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Until I Met You</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Gimme Some Courage</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="ms_rcnt_box">
                                    <div className="ms_rcnt_box_img">
                                        <img src="images/music/r_music4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms_rcnt_box_text">
                                        <h3>
                                            <a href="#">Dark Alley Acoustic</a>
                                        </h3>
                                        <p>Ava Cornish &amp; Brian Hill</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Add Arrows */}
                    <div className="swiper-button-next slider_nav_next" />
                    <div className="swiper-button-prev slider_nav_prev" />
                </div>
                {/*-Weekly Top 15-*/}
                <div className="ms_weekly_wrapper">
                    <div className="ms_weekly_inner">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="ms_heading">
                                    <h1>15 آهنگ برتر هفته</h1>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 padding_right40">
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">01</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song1.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Until I Met You</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">02</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song2.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Walking Promises</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">03</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song3.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Gimme Some Courage</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">04</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song4.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Desired Games</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">05</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song5.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Dark Alley Acoustic</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 padding_right40">
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">06</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song6.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Walking Promises</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">07</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song7.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Endless Things</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box ms_active_play">
                                    <div className="weekly_right">
                                        <span className="w_top_no">08</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song8.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <div className="ms_bars">
                                                        <div className="bar" />
                                                        <div className="bar" />
                                                        <div className="bar" />
                                                        <div className="bar" />
                                                        <div className="bar" />
                                                        <div className="bar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Dream Your Moments</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">09</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song9.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Until I Met You</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">10</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song5.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Gimme Some Courage</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">11</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song2.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Dark Alley Acoustic</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">12</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song11.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">The Heartbeat Stops</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">13</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song12.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">One More Stranger</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">14</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song13.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Walking Promises</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ms_divider" />
                                <div className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">15</span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img
                                                    src="images/weekly/song14.jpg"
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">Endless Things</a>
                                                </h3>
                                                <p>Ava Cornish</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_left">
                                        <span className="w_song_time">5:10</span>
                                        <span className="ms_more_icon" data-other={1}>
                    <img src="images/svg/more.svg" alt="" />
                  </span>
                                    </div>
                                    <ul className="more_option">
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_queue" />
                      </span>
                                                افزودن به لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_dwn" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_playlst" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="opt_icon">
                        <span className="icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*-Featured Artists Music-*/}
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
                                        <img src="images/featured/song1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song5.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song6.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/featured/song4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                    <div className="swiper-button-next1 slider_nav_next" />
                    <div className="swiper-button-prev1 slider_nav_prev" />
                </div>
                {/*--Add Section Start--*/}
                <div className="ms_advr_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <a href="#">
                                    <img src="images/adv.jpg" alt="" className="img-fluid" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--New Releases Section Start--*/}
                <div className="ms_releases_wrapper">
                    <div className="ms_heading">
                        <h1>جدیدترین آهنگ ها</h1>
                        <span className="veiw_all">
            <a href="#">مشاهده بیشتر</a>
          </span>
                    </div>
                    <div className="ms_release_slider swiper-container">
                        <div className="ms_divider" />
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="ms_release_box">
                                    <div className="w_top_song">
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src="images/weekly/song1.jpg" alt="" />
                                            <div className="ms_song_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src="images/weekly/song2.jpg" alt="" />
                                            <div className="ms_song_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src="images/weekly/song3.jpg" alt="" />
                                            <div className="ms_song_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src="images/weekly/song4.jpg" alt="" />
                                            <div className="ms_song_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <span className="slider_dot" />
                                        <div className="w_tp_song_img">
                                            <img src="images/weekly/song5.jpg" alt="" />
                                            <div className="ms_song_overlay"></div>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                    <div className="swiper-button-next2 slider_nav_next" />
                    <div className="swiper-button-prev2 slider_nav_prev" />
                </div>
                {/*--Featured Albumn Section Start--*/}
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
                                        <img src="images/album/album1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album5.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album6.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/album/album4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                    <div className="swiper-button-next3 slider_nav_next" />
                    <div className="swiper-button-prev3 slider_nav_prev" />
                </div>
                {/*--Top Genres Section Start--*/}
                <div className="ms_genres_wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>سبک های پرمخاطب</h1>
                                <span className="veiw_all">
                <a href="#">مشاهده بیشتر</a>
              </span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ms_genres_box">
                                <img src="images/genrs/img1.jpg" alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                  <span className="ovrly_text1">
                    <a href="#">عاشقانه</a>
                  </span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                  <span className="ovrly_text1">
                    <a href="#">عاشقانه</a>
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="ms_genres_box">
                                        <img
                                            src="images/genrs/img2.jpg"
                                            alt=""
                                            className="img-fluid"
                                        />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">کلاسیک</a>
                      </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">کلاسیک</a>
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="ms_genres_box">
                                        <img
                                            src="images/genrs/img3.jpg"
                                            alt=""
                                            className="img-fluid"
                                        />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">هیپ هاپ</a>
                      </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">هیپ هاپ</a>
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="ms_genres_box">
                                        <img
                                            src="images/genrs/img5.jpg"
                                            alt=""
                                            className="img-fluid"
                                        />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">شاد مجلسی</a>
                      </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">شاد مجلسی</a>
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="ms_genres_box">
                                        <img
                                            src="images/genrs/img6.jpg"
                                            alt=""
                                            className="img-fluid"
                                        />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
                                            </div>
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">پاپ</a>
                      </span>
                                            </div>
                                        </div>
                                        <div className="ms_box_overlay_on">
                                            <div className="ovrly_text_div">
                      <span className="ovrly_text1">
                        <a href="#">پاپ</a>
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="ms_genres_box">
                                <img src="images/genrs/img4.jpg" alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div className="ms_play_icon">
                                        <img src="images/svg/play.svg" alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                  <span className="ovrly_text1">
                    <a href="#">راک</a>
                  </span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                  <span className="ovrly_text1">
                    <a href="#">راک</a>
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--Add Section Start--*/}
                <div className="ms_advr_wrapper ms_advr2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <a href="#">
                                    <img src="images/adv1.jpg" alt="" className="img-fluid" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--Live Radio Section Start--*/}
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
                                        <img src="images/radio/img1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img5.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img6.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img1.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img2.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img3.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                                        <img src="images/radio/img4.jpg" alt="" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div className="ms_more_icon">
                                                <img src="images/svg/more.svg" alt="" />
                                            </div>
                                            <ul className="more_option">
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_fav" />
                          </span>
                                                        علاقه مندی ها
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_queue" />
                          </span>
                                                        افزودن به لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_dwn" />
                          </span>
                                                        دانلود
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_playlst" />
                          </span>
                                                        افزودن به پلی لیست
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                          <span className="opt_icon">
                            <span className="icon icon_share" />
                          </span>
                                                        اشتراک گذاری
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="ms_play_icon">
                                                <img src="images/svg/play.svg" alt="" />
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
                    <div className="swiper-button-next4 slider_nav_next" />
                    <div className="swiper-button-prev4 slider_nav_prev" />
                </div>
                {/*--Main div close--*/}
            </div>
            {/*--Footer Start--*/}
            <div className="ms_footer_wrapper">
                <div className="ms_footer_logo">
                    <a href="index.html">
                        <img src="images/open_logo.png" alt="" />
                    </a>
                </div>
                <div className="ms_footer_inner">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box">
                                <h1 className="footer_title">miraculous</h1>
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                                    نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.{" "}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box footer_app">
                                <h1 className="footer_title">دانلود اپ موبایل</h1>
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است.{" "}
                                </p>
                                <a href="#" className="foo_app_btn">
                                    <img
                                        src="images/google_play.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                </a>
                                <a href="#" className="foo_app_btn">
                                    <img src="images/app_store.jpg" alt="" className="img-fluid" />
                                </a>
                                <a href="#" className="foo_app_btn">
                                    <img src="images/windows.jpg" alt="" className="img-fluid" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box footer_subscribe">
                                <h1 className="footer_title">خبرنامه</h1>
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است.{" "}
                                </p>
                                <form>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="نام ..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="ایمیل ..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <a href="#" className="ms_btn">
                                            عضویت در خبرنامه
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box footer_contacts">
                                <h1 className="footer_title">تماس با ما</h1>
                                <ul className="foo_con_info">
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/phone.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">تلفن های تماس :</span>
                                            <span>(+98) 2112-34567</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/message.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">ایمیل ما :</span>
                                            <span>
                      <a href="#">demo@mail.com </a>,{" "}
                                                <a href="#">dummy@mail.com</a>
                    </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/add.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">آدرس :</span>
                                            <span>598 پلاک , لندن</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className="foo_sharing">
                                    <div className="share_title" />
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter" aria-hidden="true" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-google-plus" aria-hidden="true" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--Copyright--*/}
                <div className="col-lg-12">
                    <div className="ms_copyright">
                        <div className="footer_border" />
                        <p>
                            تمامی حقوق این سایت متعلق به The Miraculous می باشد. طراحی توسط{" "}
                            <a href="https://www.rtl-theme.com/author/3mad/">3mad</a>
                        </p>
                    </div>
                </div>
            </div>
            {/*--Audio Player Section--*/}
            <div className="ms_player_wrapper">
                <div className="ms_player_close">
                    <i className="fa fa-angle-down" aria-hidden="true" />
                </div>
                <div className="player_mid">
                    <div className="audio-player">
                        <div id="jquery_jplayer_1" className="jp-jplayer" />
                        <div
                            id="jp_container_1"
                            className="jp-audio"
                            role="application"
                            aria-label="media player"
                        >
                            <div className="player_left">
                                <div className="ms_play_song">
                                    <div className="play_song_name">
                                        <a href="javascript:void(0);" id="playlist-text">
                                            <div className="jp-now-playing flex-item">
                                                <div className="jp-track-name" />
                                                <div className="jp-artist-name" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="play_song_options">
                                    <ul>
                                        <li>
                                            <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_download" />
                      </span>
                                                دانلود
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_fav" />
                      </span>
                                                علاقه مندی ها
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_playlist" />
                      </span>
                                                افزودن به پلی لیست
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_share" />
                      </span>
                                                اشتراک گذاری
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <span className="play-left-arrow">
                <i className="fa fa-angle-left" aria-hidden="true" />
              </span>
                            </div>
                            {/*--Right Queue--*/}
                            <div className="jp_queue_wrapper">
              <span className="que_text" id="myPlaylistQueue">
                <i className="fa fa-angle-up" aria-hidden="true" /> لیست
              </span>
                                <div id="playlist-wrap" className="jp-playlist">
                                    <div className="jp_queue_cls">
                                        <i className="fa fa-times" aria-hidden="true" />
                                    </div>
                                    <h2>queue</h2>
                                    <div className="jp_queue_list_inner">
                                        <ul>
                                            <li>&nbsp;</li>
                                        </ul>
                                    </div>
                                    <div className="jp_queue_btn">
                                        <a
                                            href="javascript:;"
                                            className="ms_clear"
                                            data-toggle="modal"
                                            data-target="#clear_modal"
                                        >
                                            پاک کردن
                                        </a>
                                        <a
                                            href="clear_modal"
                                            className="ms_save"
                                            data-toggle="modal"
                                            data-target="#save_modal"
                                        >
                                            ذخیره
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="jp-type-playlist">
                                <div className="jp-gui jp-interface flex-wrap justify-content-center">
                                    <div className="jp-controls flex-item text-left">
                                        <button className="jp-previous" tabIndex={0}>
                                            <i className="ms_play_control" />
                                        </button>
                                        <button className="jp-play" tabIndex={0}>
                                            <i className="ms_play_control" />
                                        </button>
                                        <button className="jp-next" tabIndex={0}>
                                            <i className="ms_play_control" />
                                        </button>
                                    </div>
                                    <div className="jp-progress-container flex-item">
                                        <div className="jp-time-holder">
                    <span
                        className="jp-current-time"
                        role="timer"
                        aria-label="time"
                    >
                      &nbsp;
                    </span>
                                            <span
                                                className="jp-duration"
                                                role="timer"
                                                aria-label="duration"
                                            >
                      &nbsp;
                    </span>
                                        </div>
                                        <div className="jp-progress">
                                            <div className="jp-seek-bar">
                                                <div className="jp-play-bar">
                                                    <div className="bullet"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jp-volume-controls flex-item">
                                        <div className="widget knob-container">
                                            <div className="knob-wrapper-outer">
                                                <div className="knob-wrapper">
                                                    <div className="knob-mask">
                                                        <div className="knob d3">
                                                            <span />
                                                        </div>
                                                        <div className="handle" />
                                                        <div className="round">
                                                            <img src="images/svg/volume.svg" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <input></input> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jp-toggles flex-item">
                                        <button className="jp-shuffle" tabIndex={0} title="Shuffle">
                                            <i className="ms_play_control" />
                                        </button>
                                        <button className="jp-repeat" tabIndex={0} title="Repeat">
                                            <i className="ms_play_control" />
                                        </button>
                                    </div>
                                    <div className="jp_quality_optn custom_select">
                                        <select>
                                            <option>کیفیت</option>
                                            <option value={1}>FLAC</option>
                                            <option value={2}>MP3</option>
                                            <option value={3}>OGG</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*main div*/}
            </div>
        </div>
        {/*--Register Modal Start--*/}
        {/* Modal */}
        <div className="ms_register_popup">
            <div id="myModal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog register_dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close" />
                        </button>
                        <div className="modal-body">
                            <div className="ms_register_img">
                                <img src="images/register_img.png" alt="" className="img-fluid" />
                            </div>
                            <div className="ms_register_form">
                                <h2>ثبت نام / ورود</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="نام کاربری"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-user" aria-hidden="true" />
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="ایمیل"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-envelope" aria-hidden="true" />
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-lock" aria-hidden="true" />
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="تکرار رمز عبور"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className=" fa_icon form-lock" aria-hidden="true" />
                </span>
                                </div>
                                <a href="#" className="ms_btn">
                                    ثبت نام
                                </a>
                                <p>
                                    قبلا ثبت نام کرده اید ؟{" "}
                                    <a
                                        href="#myModal1"
                                        data-toggle="modal"
                                        className="ms_modal hideCurrentModel"
                                    >
                                        ورود
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*--Login Popup Start--*/}
            <div id="myModal1" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog login_dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close" />
                        </button>
                        <div className="modal-body">
                            <div className="ms_register_img">
                                <img src="images/register_img.png" alt="" className="img-fluid" />
                            </div>
                            <div className="ms_register_form">
                                <h2>ثبت نام / ورود</h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="ایمیل"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-envelope" aria-hidden="true" />
                </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="form-control"
                                    />
                                    <span className="form_icon">
                  <i className="fa_icon form-lock" aria-hidden="true" />
                </span>
                                </div>
                                <div className="remember_checkbox">
                                    <label>
                                        مرا بخاطر داشته باش
                                        <input type="checkbox" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <a href="profile.html" className="ms_btn" target="_blank">
                                    ورود
                                </a>
                                <div className="popup_forgot">
                                    <a href="#">رمز عبور را فراموش کرده اید ؟</a>
                                </div>
                                <p>
                                    حساب کاربری ندارید ؟{" "}
                                    <a
                                        href="#myModal"
                                        data-toggle="modal"
                                        className="ms_modal1 hideCurrentModel"
                                    >
                                        ثبت نام
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*--Language Selection Modal--*/}
        <div className="ms_lang_popup">
            <div id="lang_modal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close" />
                        </button>
                        <div className="modal-body">
                            <h1>انتخاب زبان</h1>
                            <p>لطفا زبان مورد نظر موسیقی را انتخاب کنید.</p>
                            <ul className="lang_list">
                                <li>
                                    <label className="lang_check_label">
                                        انگلیسی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        هندی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        روسی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        فرانسوی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        آلمانی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        اسپانیایی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        چینی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        ژاپنی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        عربی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        ایتالیایی
                                        <input type="checkbox" name="check" />
                                        <span className="label-text" />
                                    </label>
                                </li>
                            </ul>
                            <div className="ms_lang_btn">
                                <a href="#" className="ms_btn">
                                    تایید
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*--Queue Clear Model --*/}
        <div className="ms_clear_modal">
            <div id="clear_modal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close" />
                        </button>
                        <div className="modal-body">
                            <h1>آبا شما برای پاک کردن پلی لیست مطمئن هستبد؟</h1>
                            <div className="clr_modal_btn">
                                <a href="#">پاک کن</a>
                                <a href="#">انصراف</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*--Queue Save Modal--*/}
        <div className="ms_save_modal">
            <div id="save_modal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close" />
                        </button>
                        <div className="modal-body">
                            <h1>عضو شوید و آهنگ های خود را به اشتراک گذارید !</h1>
                            <div className="save_modal_btn">
                                <a href="#">
                                    <i className="fa fa-google-plus-square" aria-hidden="true" />{" "}
                                    عضویت از طریق اکانت google{" "}
                                </a>
                                <a href="#">
                                    <i className="fa fa-facebook-square" aria-hidden="true" /> عضویت
                                    از طریق facebook
                                </a>
                            </div>
                            <div className="ms_save_email">
                                <h3>یا استفاده از ایمیل</h3>
                                <div className="save_input_group">
                                    <input
                                        type="text"
                                        placeholder="نام ..."
                                        className="form-control"
                                    />
                                </div>
                                <div className="save_input_group">
                                    <input
                                        type="password"
                                        placeholder="ایمیل ..."
                                        className="form-control"
                                    />
                                </div>
                                <button className="save_btn">ورود</button>
                            </div>
                            <div className="ms_dnt_have">
                                <span>حساب کاربری ندارید ؟</span>
                                <a
                                    href="javascript:;"
                                    className="hideCurrentModel"
                                    data-toggle="modal"
                                    data-target="#myModal"
                                >
                                    ثبت نام
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*Main js file Style*/}
    </>
  )
}

export default App
