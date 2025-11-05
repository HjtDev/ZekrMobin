import React, { useEffect, useState } from "react";
import { getMainPageData, getSectionData } from "../api/section-data.js";
import MediaPortal from "./MediaPlayer/MediaPortal.jsx";
import truncateText from "../assets/js/utility.js";
import {DownloadButton, LikeButton, ShareButton} from "../assets/js/quickActions.jsx";

const WeeklyTop = () => {
    const [pageData, setPageData] = useState(null);
    const [pageContent, setPageContent] = useState([]);
    const [isOpen, setIsOpen] = useState({});

    const getWeeklyData = async (section_id) => {
        const { success, data } = await getSectionData(section_id);
        setPageData(data || null);
    };

    const loadWeeklyData = async (section, filters, limit) => {
        const { success, content } = await getMainPageData(section, filters, limit);
        setPageContent(content || []);
    };

    useEffect(() => {
        getWeeklyData(2);
    }, []);

    useEffect(() => {
        if (pageData?.content) {
            loadWeeklyData(pageData?.content, "", 15);
        }
    }, [pageData]);

    // Split posts into columns of 5
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const columns = chunkArray(pageContent, 5);

    return (
        <div className="ms_weekly_wrapper">
            <div className="ms_weekly_inner">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ms_heading w-100 text-center">
                            <h1>{pageData?.title || "برترین های این هفته"}</h1>
                            <span className="ms_heading_underline" aria-hidden="true"></span>
                        </div>
                    </div>

                    {columns.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className={`col-lg-4 col-md-12 ${
                                colIndex !== columns.length - 1 ? "padding_right40" : ""
                            }`}
                        >
                            {col.map((post, index) => (
                                <div key={post.id} className="ms_weekly_box">
                                    <div className="weekly_right">
                                        <span className="w_top_no">
                                            {(colIndex * 5 + index + 1).toString().padStart(2, "0")}
                                        </span>
                                        <div
                                            className="w_top_song"
                                            onClick={() =>
                                                setIsOpen((prev) => ({ ...prev, [post.id]: true }))
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="w_tp_song_img">
                                                <img
                                                    src={post.thumbnail || "images/weekly/default.jpg"}
                                                    alt={post.title}
                                                    className="img-fluid"
                                                />
                                                <div className="ms_song_overlay"></div>
                                                <div className="ms_play_icon">
                                                    <img src="images/svg/play.svg" alt="Play" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3>
                                                    <a href="#">{truncateText(post?.title, -1, 25)}</a>
                                                </h3>
                                                <p>{truncateText(post?.artist?.name, 30, 30) || "ناشناس"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="weekly_left">
                                        <span className="w_song_time">{post.duration}</span>
                                        <span className="ms_more_icon" data-other={1}>
                                            <img src="images/svg/more.svg" alt="More" />
                                        </span>
                                    </div>

                                    <ul className="more_option">
                                        <LikeButton postID={post?.id}/>
                                        <DownloadButton postID={post?.id}/>
                                        <ShareButton postID={post?.id}/>
                                    </ul>

                                    {/* Divider between items */}
                                    {index < col.length - 1 && (
                                        <div
                                            className="ms_divider"
                                            style={{ marginTop: "20px", marginBottom: "-30px" }}
                                        />
                                    )}

                                    {/* 🟢 Media Modal */}
                                    {isOpen[post.id] && (
                                        <MediaPortal
                                            isOpen={isOpen[post.id]}
                                            onClose={() =>
                                                setIsOpen((prev) => ({ ...prev, [post.id]: false }))
                                            }
                                            postID={post.id}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyTop;
