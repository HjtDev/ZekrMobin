import React from 'react'

const Player = () => {
    return (
        <div className="ms_player_wrapper">
            <div className="ms_player_close">
                <i className="fa fa-angle-down" aria-hidden="true"/>
            </div>
            <div className="player_mid">
                <div className="audio-player">
                    <div id="jquery_jplayer_1" className="jp-jplayer"/>
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
                                            <div className="jp-track-name"/>
                                            <div className="jp-artist-name"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="play_song_options">
                                <ul>
                                    <li>
                                        <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_download"/>
                      </span>
                                            دانلود
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_fav"/>
                      </span>
                                            علاقه مندی ها
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_playlist"/>
                      </span>
                                            افزودن به پلی لیست
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                      <span className="song_optn_icon">
                        <i className="ms_icon icon_share"/>
                      </span>
                                            اشتراک گذاری
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <span className="play-left-arrow">
                <i className="fa fa-angle-left" aria-hidden="true"/>
              </span>
                        </div>
                        {/*--Right Queue--*/}
                        <div className="jp_queue_wrapper">
              <span className="que_text" id="myPlaylistQueue">
                <i className="fa fa-angle-up" aria-hidden="true"/> لیست
              </span>
                            <div id="playlist-wrap" className="jp-playlist">
                                <div className="jp_queue_cls">
                                    <i className="fa fa-times" aria-hidden="true"/>
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
                                        <i className="ms_play_control"/>
                                    </button>
                                    <button className="jp-play" tabIndex={0}>
                                        <i className="ms_play_control"/>
                                    </button>
                                    <button className="jp-next" tabIndex={0}>
                                        <i className="ms_play_control"/>
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
                                                        <span/>
                                                    </div>
                                                    <div className="handle"/>
                                                    <div className="round">
                                                        <img src="images/svg/volume.svg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <input></input> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="jp-toggles flex-item">
                                    <button className="jp-shuffle" tabIndex={0} title="Shuffle">
                                        <i className="ms_play_control"/>
                                    </button>
                                    <button className="jp-repeat" tabIndex={0} title="Repeat">
                                        <i className="ms_play_control"/>
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
    )
}
export default Player
