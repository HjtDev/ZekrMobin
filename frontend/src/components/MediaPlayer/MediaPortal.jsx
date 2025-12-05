import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import api from '../../api/api.js';
import '../../assets/css/MediaPortal.css'
import CustomSkeleton from '../CustomSkeleton.jsx';
import LazySection from '../LazyLoader/LazySection.jsx';
import { getComments, createComments } from '../../api/comment.js';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext.jsx';
import likePost from '../../api/like.js';
import downloadPost from '../../api/download.js';
import ShareLink from '../NativeShare/ShareLink.jsx';
import getSuggestedPosts from '../../api/suggestion.js';
import toJalaliDate from "../../assets/js/jalaali-conventor.js";
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import truncateText from "../../assets/js/utility.js";
import PERSIAN from "../../assets/js/player-translation.js";

const modalRoot = document.getElementById("modal-root");

const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// --- PLAYLIST ITEM STYLES (kept same as your original) ---
const itemStyles = {
    padding: '12px 18px',
    marginBottom: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#E0E0E0',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRight: '4px solid transparent',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
};

const activeItemStyles = {
    ...itemStyles,
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
    borderRight: '4px solid #007bff',
    color: '#FFFFFF',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
};

const hoverStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
};

// --- comment / other UI styles (kept same) ---
const commentAreaStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#E0E0E0',
    borderRadius: '4px',
    padding: '10px 15px',
    resize: 'none',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    minHeight: '80px',
    marginTop: "15rem"
};

const buttonStyle = {
    fontSize: '14px',
    padding: '6px 12px',
    lineHeight: '1.2',
};

const commentItemStyle = {
    padding: '12px 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#E0E0E0',
};

// --- overlay/modal styles (restored) ---
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(18,25,40,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "10px",
    overflow: "auto",
};

const modalStyle = {
    background: "rgba(18,25,40,0.95)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    width: "88%",
    maxHeight: "90vh",
    overflowY: "auto",
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
};

// --- small UI components (unchanged) ---
const PlayListItem = ({ item, isActive, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    let style = isActive ? activeItemStyles : itemStyles;
    if (isHovered && !isActive) style = { ...style, ...hoverStyles };

    const iconClass = isActive ? 'fa fa-play-circle text-primary' : 'fa fa-music text-light';

    return (
        <div
            className="row g-0 align-items-center mx-0"
            style={style}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="col-9 d-flex align-items-center">
                <i className={`${iconClass} me-3`} style={{ width: '25px', fontSize: '18px', textAlign: 'center' }}></i>
                <p className="mb-0 text-truncate" style={{ fontSize: '16px', lineHeight: '1.2' }}>
                    {item.display_order}. {item.name}
                </p>
            </div>
            <div className="col-3 text-end">
                <small className="text-muted" style={{ fontSize: '12px' }}>{item.files?.[0]?.duration || '0:00'}</small>
            </div>
        </div>
    );
};

const PlaylistContainer = ({ media = [], activeMediaId, onSelect }) => {
    const playlistContainerStyle = {
        maxHeight: '75vh',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    };

    return (
        <div className="playlist-scrollbar-hidden" style={playlistContainerStyle}>
            {media.map(item => (
                <PlayListItem
                    key={item.id}
                    item={item}
                    isActive={activeMediaId === item.id}
                    onClick={() => onSelect(item)}
                />
            ))}
        </div>
    );
};

const CommentInput = ({ postID }) => {

    const [commentContent, setCommentContent] = useState('');
    const { isLoggedIn } = useAuth();
    const sendComment = async (postID, commentContent) => {
        if(!isLoggedIn) {
            toast.warning('ابتدا یک حساب کاربری بسازید.');
            return
        }
        if(!commentContent.trim()) {
            toast.warning("شما نمی توانید یک نظر خالی ارسال کنید.");
            return;
        }
        toast.info('در حال ثبت نظر...');
        const { success, msg } = await createComments(postID, commentContent);
        msg.forEach((message) => {
            if(success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        })
        setCommentContent('');
    }

    return (
        <div className="d-flex" style={{marginBottom: "15rem"}}>
            <div className="flex-grow-1">
            <textarea
                className="form-control"
                style={commentAreaStyle}
                rows="3"
                placeholder="نظر شما درباره پست ..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
            />
                <div className="text-end" style={{marginTop: "15rem"}}>
                    <button className="btn btn-outline-secondary me-2 right-border" style={buttonStyle} onClick={() => setCommentContent('')}>
                        لغو
                    </button>
                    <button className="btn btn-primary left-border" style={buttonStyle} onClick={() => sendComment(postID, commentContent)}>
                        ارسال
                    </button>
                </div>
            </div>
        </div>
    )
};

const CommentItem = ({ username, time, text }) => (
    <div className="d-flex" style={commentItemStyle}>
        <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-1">
                <p className="mb-0 fw-bold" style={{ fontSize: '14px', color: '#A0A0A0', marginLeft: "5rem" }}>{username}</p>
                <small className="text-muted" style={{ fontSize: '12px' }}>{time}</small>
            </div>
            <p className="mb-0" style={{ fontSize: '15px' }}>{text}</p>
        </div>
    </div>
);

const CommentSection = ({ postID }) => {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const getPostComment = async () => {
            const { success, msg, comments } = await getComments(postID);
            setComments(comments);
            msg.forEach((message) => {
                if(success) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            });
        }

        getPostComment();
    }, []);

    return (
        <div style={{ marginTop: "15rem" }}>
            <h4 className="text-light mb-4" style={{ fontSize: '22px' }}>
                <i className="fa fa-comment text-primary" style={{ marginLeft: "5rem" }}></i>
                <small>نظرات</small>
            </h4>
            <CommentInput postID={postID} />
            {
                comments ?
                    comments.map((comment) => (
                        <CommentItem username={comment.user} time={comment.time_since} text={comment.content} />
                    )) :
                    <p className="font-weight-bold text-center text-muted" style={{ fontSize: "25rem", marginTop: "35rem" }}>نظری وجود ندارد</p>
            }
        </div>
    );
};

// --- MEDIA PORTAL COMPONENT ---
const MediaPortal = ({ isOpen, onClose, postID }) => {
    // Hooks are always called (no early return before them)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [post, setPost] = useState(null);
    const [activeMedia, setActiveMedia] = useState(null);
    const [activeQuality, setActiveQuality] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [descriptionToShow, setDescriptionToShow] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = (e) => {
        e.preventDefault();
        setDescriptionToShow(descriptionToShow === post.description ? truncateText(post.description, 150, 150) : post.description);
    }

    const getDownloadLink = async () => {
        if(!post) {
            toast.warning('این پست قابل دانلود نیست.');
        }
        const { success, msg, links } = await downloadPost(post.id);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        if(success) {
            msg.forEach((message) => {
                toast.success(message);
            });
            await delay(1000);
            for(const link of links) {
                window.open(link);
                await delay(250);
            }
        } else {
            msg.forEach((message) => {
                toast.error(message);
            });
        }
    }

    const updateLike = async (e) => {
        e.preventDefault();
        if(!isLoggedIn) {
            toast.warning('ابتدا یک حساب کاربری بسازید.');
            return;
        }
        if(!post) {
            toast.warning('این پست قابل لایک کردن نیست.');
            return;
        }
        const { success, msg, is_liked } = await likePost(post.id);
        msg.forEach((message) => {
            if(success) {
                toast.success(message);
            } else {
                toast.error(message);
            }
        });
        if(success) {
            setPost((prev) => ({...prev, "is_liked": is_liked}));
        }
    }

    const getSuggestionList = async (e) => {
        e.preventDefault();
        if(!post) {
            toast.warning('مشکلی پیش آمد لطفا بعدا تلاش کنید.');
        }
        const { success, posts } = await getSuggestedPosts(post.id);
        if(success && posts && posts.length > 0) {
            toast.success('در حال بارگزاری پست ها');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate(`/posts/?section=${posts.join(",")}`, { replace: false });
            if(pathname.startsWith("/posts")) window.location.reload();
        } else {
            toast.error('پستی برای پیشنهاد وجود ندارد.');
        }
    }

    useEffect(() => {
        if(!isOpen) return;

        window.history.pushState({ modalOpen: true }, "");

        const handlePopState = () => {
            if(isOpen) onClose();
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
            if(window.history.state?.modalOpen) window.history.back();
        };
    }, [isOpen, onClose]);

    // fetch post when postID changes
    useEffect(() => {
        if (!postID) {
            setPost(null);
            setActiveMedia(null);
            setActiveQuality(null);
            return;
        }

        let cancelled = false;
        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await api.get("media/posts/post/", {
                    params: { id: postID, quick: 0 },
                });
                if (cancelled) return;
                const data = response.data.post;
                setPost(data);
                setShowMore(data.description && data.description.length > 150);
                setDescriptionToShow(truncateText(data.description, 150, 150));

                // default selection
                if (data.media?.length > 0) {
                    const firstMedia = data.media[0];
                    setActiveMedia(firstMedia);
                    if (firstMedia.files?.length > 0) {
                        setActiveQuality(firstMedia.files[0]);
                    } else {
                        setActiveQuality(null);
                    }
                } else {
                    setActiveMedia(null);
                    setActiveQuality(null);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                if (!cancelled) {
                    setPost(null);
                    setActiveMedia(null);
                    setActiveQuality(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        if(isOpen) {
            fetchPost();
        }
        return () => { cancelled = true; };
    }, [postID, isOpen]);

    // resize listener (debounced)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        const debounced = debounce(handleResize, 150);
        window.addEventListener('resize', debounced);
        return () => window.removeEventListener('resize', debounced);
    }, []);

    // Early return after hooks (prevents rendering if modal not open)
    if (!isOpen) return null;

    const exitButtonStyle = {
        position: 'absolute',
        top: '24px',
        right: '10px',
        zIndex: 10,
        color: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        lineHeight: '32px',
        textAlign: 'center',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    const handleExitHover = (e, isHovering) => {
        e.currentTarget.style.backgroundColor = isHovering ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
    };

    const handleMediaClick = (mediaItem) => {
        setActiveMedia(mediaItem);
        if (mediaItem.files?.length > 0) {
            setActiveQuality(mediaItem.files[0]);
        } else {
            setActiveQuality(null);
        }
    };


    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose} style={overlayStyle}>
            <div
                className="modal-content container-fluid modal-scrollbar-hidden"
                style={{ ...modalStyle, position: 'relative' }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    style={exitButtonStyle}
                    onClick={onClose}
                    onMouseOver={(e) => handleExitHover(e, true)}
                    onMouseOut={(e) => handleExitHover(e, false)}
                    title="Close"
                >
                    <i className="fa fa-times"></i>
                </button>

                <div className="row flex-lg-row flex-column">
                    {/* Playlist */}
                    <div className="col-lg-3 col-12 order-lg-1 order-2">
                        {
                            post?.media ?
                                <PlaylistContainer
                                    media={post.media || []}
                                    activeMediaId={activeMedia.id}
                                    onSelect={handleMediaClick}
                                /> :
                                <CustomSkeleton height={500} />
                        }
                    </div>

                    {/* Player */}
                    <div className="col-lg-9 col-12 mb-3 mb-lg-0 order-lg-2 order-1">
                        {loading ? (
                            <CustomSkeleton height={500} />
                        ) : activeQuality ? (
                            <div className='d-flex justify-content-center align-items-center flex-column' style={{ marginBottom: "15rem"}}>
                                {
                                    activeMedia?.files?.[0].media_type === "audio" &&
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            style={{
                                                width: isMobile ? '100%' : '450px',
                                                borderRadius: '12px',
                                                marginBottom: '5rem',
                                                objectFit: 'cover',
                                                boxShadow: '1px 1px 12px'
                                            }}
                                        />
                                }
                                <MediaPlayer
                                    title={post?.title || 'Media Player'}
                                    poster={post?.thumbnail}
                                    aspectRatio={
                                        activeMedia?.files?.[0]?.media_type === "audio"
                                            ? "9/1"
                                            : (isMobile ? "9/16" : "16/9")
                                    }
                                    autoPlay={false}
                                    controls={false}
                                    fullscreenOrientation={false}
                                    playsInline={true}
                                    onPointerDown={(e) => {
                                        const startY = e.clientY;
                                        const handleMove = (moveEvent) => {
                                            if (Math.abs(MouseEvent.clientY - startY) > 5) {
                                                e.preventDefault();
                                            }
                                            document.removeEventListener('pointermove', handleMove);
                                        }
                                        document.addEventListener('pointermove', handleMove);
                                    }}
                                    src={activeMedia?.files?.map((file) => {
                                        let mimeType = 'video/mp4';
                                        if (file.media_type === 'audio') {
                                            if (file.file.endsWith('.opus')) mimeType = 'audio/ogg';
                                            else if (file.file.endsWith('.mp3')) mimeType = 'audio/mpeg';
                                            else if (file.file.endsWith('.wav')) mimeType = 'audio/wav';
                                        } else if (file.media_type === 'video') {
                                            if (file.file.endsWith('.webm')) mimeType = 'video/webm';
                                            else mimeType = 'video/mp4';
                                        }

                                        return {
                                            src: file.file,
                                            type: mimeType,
                                            label: file.quality || '',
                                            default: file.id === activeQuality?.id
                                        };
                                    })}
                                >
                                    <MediaProvider/>
                                    <PlyrLayout
                                        icons={plyrLayoutIcons}
                                        translations={PERSIAN}
                                        clickToFullscreen={true}
                                        clickToPlay={true}
                                    />
                                </MediaPlayer>
                            </div>

                        ) : (
                            <div className="text-center text-light py-5">
                                رسانه‌ای برای پخش موجود نیست.
                            </div>
                        )}
                        <div className="text-gray d-flex justify-content-between align-items-center" style={{ fontWeight: "bold", marginBottom: "15rem" }}>
                            <h2 className='text-right w-100' style={{ fontWeight: "bold", fontSize: "20rem", color: "gray" }}>{post?.title}</h2>
                            <span className="text-left w-100" dir="ltr"><i className="fa fa-eye"></i> {post?.views_count}</span>
                        </div>
                        <div className="d-flex justify-content-start align-items-center flex-column" style={{ marginBottom: "15rem" }}>
                            <div className="w-100">
                                <p key={descriptionToShow} className="text-expand">
                                    {descriptionToShow}
                                </p>
                            </div>
                            {
                                showMore && (
                                    <div className="w-100" style={{ marginTop: "5rem" }}>
                                        <Link to="#" onClick={(e) => handleShowMore(e)}>مشاهده بیشتر</Link>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row justify-content-between align-items-center text-center option-container">
                            <div className="col-3 hover-info">
                                <a href="#" onClick={(e) => updateLike(e)} className="text-muted"><span className={`fa fa-thumbs-up d-block ${post?.is_liked ? 'text-info' : ''}`} style={{ cursor: "pointer" }}></span>لایک</a>
                            </div>
                            <div className="col-3 hover-info">
                                <ShareLink url={`${window.location.origin}/?play=${post?.id}`} title={post?.share_text || post?.title} text={post?.share_text || post?.title} className="text-muted">
                                    <span className="fa fa-share d-block" style={{ cursor: "pointer" }}></span>اشتراک
                                </ShareLink>
                            </div>
                            <div className="col-3 hover-info">
                                <a href="#" onClick={(e) => getSuggestionList(e)} className="text-muted"><span className="fa fa-list d-block" style={{ cursor: "pointer" }}></span>پیشنهادی</a>
                            </div>
                            <div className="col-3 hover-info">
                                <a href={activeMedia?.files?.[0]?.file} target="_blank" className="text-muted"><span className="fa fa-download d-block" style={{ cursor: "pointer" }}></span>دانلود</a>
                            </div>
                        </div>
                        <div className="text-gray d-flex justify-content-between align-items-center" style={{ fontWeight: "bold", marginTop: "10rem", marginBottom: "10rem" }}>
                            <p className='text-right w-100'>تاریخ انتشار: {post?.created_at && toJalaliDate(post?.created_at)}</p>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "8px",
                                width: "100%"
                            }}>
                                {post?.tags?.map(tag => (
                                    <Link
                                        to={`/posts/?tags=${tag.id}`}
                                        reloadDocument={true}
                                        key={tag.id}
                                        style={{
                                            backgroundColor: "rgba(20,27,42,0.64)",
                                            boxShadow: "1px 1px 5px #0000000109",
                                            color: "#ffffff",
                                            borderRadius: "12px",
                                            padding: "4px 10px",
                                            fontSize: "15rem",
                                            fontWeight: "500",
                                            border: "1px solid #08306b",
                                        }}
                                    >
                                        {tag.name || '—'}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <LazySection>
                            <CommentSection postID={postID} />
                        </LazySection>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default MediaPortal;
