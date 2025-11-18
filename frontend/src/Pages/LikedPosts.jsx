import React, {useEffect, useState} from 'react'
import "../assets/css/LikedPosts.css"
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { getUserPosts } from '../api/user-posts.js';
import { toast } from 'react-toastify';
import CustomSkeleton from "../components/CustomSkeleton.jsx";
import MediaPortal from '../components/MediaPlayer/MediaPortal.jsx';
import { LikeButton, DownloadButton, ShareButton } from '../assets/js/quickActions.jsx';

const LikedPosts = () => {
    const navigate = useNavigate();
    const { isLoggedIn, loadingUserData } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [pageContent, setPageContent] = useState(null);

    const [isOpen, setIsOpen] = useState({});
    const handleMediaClick = (postId) => {
        setIsOpen((prev) => ({ ...prev, [postId]: true }));
    };

    const deleteRow = (postID) => {
        setPageContent((prev) => prev.filter((p) => p.id !== postID));
    }

    useEffect(() => {
        setIsLoading(true);
        const loadPageContent = async () => {
            const { success, msg, posts } = await getUserPosts("liked");
            setPageContent(posts)

            const messanger = success ? toast.success : toast.error
            msg.forEach((message) => messanger(message));
        }
        loadPageContent();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if(!loadingUserData && !isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, loadingUserData, navigate]);
    return (
        <div className="ms_free_download ms_purchase_wrapper">
            <div className="ms_heading">
                <h1>علاقه مندی های شما</h1>
            </div>
            <div className="album_inner_list" style={{ paddingBlock: "25rem"}}>
                <div className="album_list_wrapper">
                    <ul className="album_list_name">
                        <li className="w-10"></li>
                        <li className="w-22">پست</li>
                        <li className="w-22">هنرمند</li>
                        <li className="text-center w-22">زمان</li>
                        <li className="text-center w-22">بیشتر</li>
                    </ul>
                    {
                        !isLoading && pageContent && pageContent?.length > 0 ?
                            pageContent.map((post, index) => (
                                <ul className={`${isOpen[post.id] && "play_active_song"}`} key={index}>
                                    <li className="w-10" onClick={() => handleMediaClick(post.id)}>
                                        <a href="#" role="button" className="prevent-default">
                                            <span className="play_no">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="play_hover"/>
                                        </a>
                                    </li>
                                    <li className="w-22" onClick={() => handleMediaClick(post.id)}>
                                        <a href="#" className="prevent-default" role="button">{post.title}</a>
                                    </li>
                                    <li className="w-22">
                                        <a href={`${window.location.origin}/posts/?artists=${post.artist.id}`}>{post.artist.name}</a>
                                    </li>
                                    <li className="text-center w-22" onClick={() => handleMediaClick(post.id)}>
                                        <a href="#" role="button" className="prevent-default">{post.duration}</a>
                                    </li>
                                    <li className="text-center ms_more_icon w-22">
                                        <a href="javascript:;">
                                            <span className="ms_icon1 ms_active_icon"/>
                                        </a>
                                        <ul className="more_option" style={{zIndex: "999"}}>
                                            <li>
                                                <LikeButton postID={post.id} callAfterAction={deleteRow} />
                                            </li>
                                            <li>
                                                <DownloadButton postID={post.id} />
                                            </li>
                                            <li>
                                                <ShareButton postID={post.id} />
                                            </li>
                                        </ul>
                                    </li>
                                    <MediaPortal
                                        isOpen={isOpen[post.id]}
                                        onClose={() =>
                                            setIsOpen((prev) => ({ ...prev, [post.id]: false }))
                                        }
                                        postID={post.id}
                                    />
                                </ul>
                            )) : (
                                <ul>
                                    <li className="w-10">
                                        <a href="#">
                                            <span className="play_no"><CustomSkeleton height={30} width={30} /></span>
                                            <span className="play_hover"/>
                                        </a>
                                    </li>
                                    <li className="w-22">
                                        <a href="#"><CustomSkeleton width={150} height={30} /></a>
                                    </li>
                                    <li className="w-22">
                                        <a href="#"><CustomSkeleton width={150} height={30} /></a>
                                    </li>
                                    <li className="text-center w-22">
                                        <a href="#"><CustomSkeleton width={60} height={30} /></a>
                                    </li>
                                    <li className="text-center ms_more_icon w-22">
                                        <CustomSkeleton width={30} height={30} />
                                    </li>
                                </ul>
                            )
                    }

                </div>
            </div>
        </div>
    )
}
export default LikedPosts
