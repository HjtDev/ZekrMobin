import React, {useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserPosts, clearHistory } from '../api/user-posts.js';
import { toast } from 'react-toastify';
import CustomSkeleton from "../components/CustomSkeleton.jsx";
import MediaPortal from '../components/MediaPlayer/MediaPortal.jsx';


const History = () => {
    const { isLoggedIn, loadingUserData } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [pageContent, setPageContent] = useState(null);

    const [isOpen, setIsOpen] = useState({});
    const handleMediaClick = (postId) => {
        setIsOpen((prev) => ({ ...prev, [postId]: true }));
    };

    const handleClearHistory = async () => {
        const { success, msg } = await clearHistory();
        const messanger = success ? toast.success : toast.error;
        msg.forEach(message => messanger(message));
        setPageContent(null);
    }

    useEffect(() => {
        setIsLoading(true);
        const loadPageContent = async () => {
            const { success, msg, posts } = await getUserPosts("history");
            setPageContent(posts);

            const messanger = success ? toast.success : toast.error
            msg.forEach((message) => {
                messanger(message);
            });
        }
        loadPageContent();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if(!loadingUserData && !isLoggedIn) {
            navigate('/', { replace: true })
        }
    }, [isLoggedIn, loadingUserData, navigate]);
    return (
        <div className="ms_top_artist">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ms_heading">
                            <h1>تاریخچه</h1>
                            <span className="hstry_clear ms_btn">
                                <a href="#" className="prevent-default" onClick={() => handleClearHistory()}>پاک کردن</a>
                              </span>
                        </div>
                    </div>
                    {
                        !isLoading && pageContent && pageContent?.length > 0 ?
                            pageContent.map((post, index) => (
                                 <div className="col-lg-2 col-md-6" key={index}>
                                    <div className="ms_rcnt_box marger_bottom30">
                                        <div className="ms_rcnt_box_img">
                                            <img src={post.thumbnail} alt={post.title} className="img-fluid"/>
                                            <div className="ms_main_overlay">
                                                <div className="ms_box_overlay"/>
                                                <div className="ms_play_icon" onClick={() => handleMediaClick(post.id)}>
                                                    <img src="/images/svg/play.svg" alt="Play SVG"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms_rcnt_box_text">
                                            <h3>
                                                <a href="#">{post.title}</a>
                                            </h3>
                                            <p>{post.artist.name}</p>
                                        </div>
                                    </div>
                                     <MediaPortal
                                         isOpen={isOpen[post.id]}
                                         onClose={() =>
                                             setIsOpen((prev) => ({ ...prev, [post.id]: false }))
                                         }
                                         postID={post.id}
                                     />
                                </div>
                            )) : (
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="ms_rcnt_box marger_bottom30 text-right">
                                        <CustomSkeleton width={310} height={310}/>
                                        <div className="ms_rcnt_box_text">
                                            <CustomSkeleton width={150} height={30}/>
                                            <CustomSkeleton width={250} height={30}/>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
export default History
