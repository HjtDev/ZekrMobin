import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom';
import { toast } from "react-toastify";
import { getBlogPost, getBlogPostComments, createBlogPostComment, getBlogPostSuggestion } from '../api/blog.js';
import CustomSkeleton from '../components/CustomSkeleton.jsx';
import "../assets/css/Blog.css"
import ShareLink from "../components/NativeShare/ShareLink.jsx";
import LazySection from "../components/LazyLoader/LazySection.jsx";
import { useAuth } from '../contexts/AuthContext.jsx';

const Comments = ({ postID }) => {
    const [commentIsLoading, setCommentIsLoading] = useState(true);
    const [comments, setComments] = useState(null);

    const fetchComments = async () => {
        setCommentIsLoading(true);
        const { success, msg, comments } = await getBlogPostComments(postID);
        setComments(comments);
        const messanger = success ? toast.success : toast.error;
        msg.forEach(message => messanger(message));
        setCommentIsLoading(false);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <ol>
            {
                commentIsLoading ?
                    (
                        <li>
                            <div className="ms_comment_section">
                                <div className="comment_info">
                                    <div className="comment_head" style={{marginBottom: "10rem"}}>
                                        <h3><CustomSkeleton width={200} height={20}/></h3>
                                        <p><CustomSkeleton width={300} height={20}/></p>
                                    </div>
                                    <p>
                                        <CustomSkeleton height={15}/>
                                        <CustomSkeleton height={15}/>
                                        <CustomSkeleton height={15}/>
                                        <CustomSkeleton height={15}/>
                                        <CustomSkeleton height={15}/>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ) : comments && comments.length > 0 ?
                        comments.map((comment, index) => (
                            <li key={index}>
                                <div className="ms_comment_section">
                                    <div className="comment_info pr-0">
                                        <div className="comment_head">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-6 text-right">{comment.user}</div>
                                                <div className="col-6 text-left">{comment.time_since}</div>
                                            </div>
                                        </div>
                                        <p className="text-right" style={{ padding: "10rem" }}>{comment.content}</p>
                                    </div>
                                </div>
                            </li>
                        )) : (
                            <li>
                                <p>نظری وجود ندارد.</p>
                            </li>
                        )
            }
        </ol>
    )
}

const CommentInput = ({ postID }) => {
    const { isLoggedIn } = useAuth();

    const [sendingComment, setSendingComment] = useState(false);
    const [content, setContent] = useState('');

    const sendComment = async () => {
        setSendingComment(true);
        const { success, msg} = await createBlogPostComment(postID, content);
        let messanger = null;
        if(success) {
            messanger = toast.success;
            setContent('');
        } else {
            messanger = toast.error;
        }
        msg.forEach(message => messanger(message));
        setSendingComment(false);
    }

    return (
        <div className="blog_comments_forms" style={{ marginBottom: "15rem"}}>
            <h1>{ isLoggedIn ? "ارسال نظر" : "برای ارسال نظر ابتدا باید یک حساب کاربری بسازید."}</h1>
            {
                isLoggedIn && (
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="comment_input_wrapper">
                            <textarea
                                id="comment"
                                name="comment"
                                className="cmnt_field"
                                placeholder="نظر خود را بنویسید ..."
                                maxLength="320"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="comment-form-submit">
                                {
                                    sendingComment ?
                                        (
                                            <div className="loading"></div>
                                        ) : (
                                            <a href="#" className="prevent-default ms_btn" onClick={sendComment}>
                                                ارسال نظر
                                            </a>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const SuggestionList = ({ postID }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestions, setSuggestions] = useState(null);

    const fetchSuggestions = async () => {
        setIsLoading(true);
        const { success, msg, posts } = await getBlogPostSuggestion(postID, "category", 3);
        setSuggestions(posts);
        const messanger = success ? toast.success : toast.error;
        msg.forEach(message => messanger(message));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchSuggestions();
    }, [postID]);

    return (
        <div className="widget widget_recent_entries">
            <h2 className="widget-title">پست های پیشنهادی</h2>
            <ul>
                {
                    isLoading ?
                        (
                            <li>
                                <div className="recent_cmnt_img">
                                    <CustomSkeleton height={50} />
                                </div>
                                <div className="recent_cmnt_data">
                                    <h4>
                                        <a href="#"><CustomSkeleton width={60} height={13} /></a>
                                    </h4>
                                    <span><CustomSkeleton width={100} height={13} /></span>
                                </div>
                            </li>
                        ) : suggestions && suggestions.length > 0 ?
                            suggestions.map((suggestion, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-start" style={{ gap: "30rem"}}>
                                    <Link to={`/blog/post/${suggestion.id}/${suggestion.title}`}>
                                        <div className="recent_cmnt_img">
                                            <img src={suggestion.thumbnail} alt={suggestion.title}
                                                 style={{width: "80px", height: "50px", marginTop: "5rem"}}/>
                                        </div>
                                    </Link>
                                    <div className="recent_cmnt_data">
                                        <h4>
                                            <Link to={`/blog/post/${suggestion.id}/${suggestion.title}`}>
                                                {suggestion.title}
                                            </Link>
                                        </h4>
                                        <span>{suggestion.time_since}</span>
                                    </div>
                                </li>
                            )) : (
                                <li>
                                    <div className="recent_cmnt_data">
                                        <h4>
                                            <a href="#">پستی برای پیشنهاد وجود ندارد</a>
                                        </h4>
                                    </div>
                                </li>
                            )
                }

            </ul>
        </div>
    )
}

const Blog = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState(null);

    const fetchPost = async (postID) => {
        setIsLoading(true);
        const { success, msg, post } = await getBlogPost(postID, false);
        setPost(post);
        setIsLoading(false);
        const messanger = success ? toast.success : toast.error;
        msg.forEach(message => messanger(message));
        setIsLoading(false);
    }

    useEffect(() => {
        const validID = Number(id);
        fetchPost(validID);
    }, [id]);
    return (
        <div className="ms_blog_single_wrapper">
            <div className="row">
                <div className="col-lg-9 col-md-9">
                    {
                        isLoading || !post ?
                            (
                                <div className="ms_blog_single">
                                    <div className="blog_single_img">
                                        <CustomSkeleton height={400} />
                                    </div>
                                    <div className="blog_single_content">
                                        <h3 className="ms_blog_title">
                                            <CustomSkeleton height={30} />
                                        </h3>
                                        <div className="ms_post_meta">
                                            <ul className="d-flex justify-content-start align-items-center" style={{ gap: "10rem" }}>
                                                <li><CustomSkeleton width={90} height={30} /></li>
                                                <li><CustomSkeleton width={90} height={30} /></li>
                                                <li><CustomSkeleton width={90} height={30} /></li>
                                            </ul>
                                        </div>
                                        <p>
                                            <CustomSkeleton width={600}  height={20} />
                                            <CustomSkeleton width={650}  height={20} />
                                            <CustomSkeleton width={500}  height={20} />
                                            <CustomSkeleton width={550}  height={20} />
                                            <CustomSkeleton width={400}  height={20} />
                                        </p>
                                    </div>
                                </div>
                            ) :  (
                                <div className="ms_blog_single">
                                    <div className="blog_single_img">
                                        <img src={post.thumbnail} alt={post.title} className="img-fluid"/>
                                    </div>
                                    <div className="blog_single_content">
                                        <h3 className="ms_blog_title">{post.title}</h3>
                                        <div className="ms_post_meta">
                                            <ul>
                                                <li>{post.time_since}</li>
                                                <li>&nbsp;/&nbsp;</li>
                                                <li> {post.comments_count} دیدگاه</li>
                                                <li>&nbsp;/&nbsp;</li>
                                                <li>{post.views_count} بازدید</li>
                                            </ul>
                                        </div>
                                        <p className="fix-innerhtml-font" dangerouslySetInnerHTML={{ __html: post.content }} />
                                        <blockquote className="fix-innerhtml-font" dangerouslySetInnerHTML={{ __html: post.author_comment }} />
                                        <p className="fix-innerhtml-font" dangerouslySetInnerHTML={{ __html: post.conclusion }} />
                                        <div className="ms_blog_tag foo_sharing">
                                            <ul>
                                                    <ShareLink
                                                        url={`${window.location.origin}/blog/post/${post.id}/${post.title}/`}
                                                        title={post.title}
                                                        text={post.title}
                                                        className="ms_btn"
                                                        style={{
                                                            gap: '30rem',
                                                        }}
                                                    >
                                                        <li className="d-flex justify-content-center align-content-center" style={{ gap: '10rem', height: "fit-content" }}>
                                                            <i className="fa fa-share d-flex justify-content-center align-content-center flex-column"></i>
                                                            اشتراک
                                                        </li>
                                                    </ShareLink>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog_comments">
                                        <h1>نظرات</h1>
                                        <LazySection>
                                            <Comments postID={post.id} />
                                        </LazySection>
                                    </div>
                                    <CommentInput postID={post.id} />
                                </div>
                            )
                    }

                </div>
                <div className="col-lg-3 col-md-3">
                    {/*--Sidebar Start--*/}
                    <div className="ms_sidebar">
                        {/*Categories*/}
                        <div className="widget widget_categories mt-0">
                            <h2 className="widget-title">دسته بندی</h2>
                            <ul>
                                <li>
                                    <Link to={`/blog/?category=${post?.category.id}`}>
                                        {post?.category.name}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/*Feature Post*/}
                        <LazySection>
                            <SuggestionList postID={post?.id} />
                        </LazySection>
                        {/*-Tags-*/}
                        <div className="widget widget_tag_cloud">
                            <h2 className="widget-title">تگ ها</h2>
                            <ul>
                                {
                                    post && post.tags.length > 0 && (
                                        post.tags.map((tag, index) => (
                                            <li key={index}>
                                                <Link to={`/blog/?tag=${tag.id}`}>
                                                    {tag.name}
                                                </Link>
                                            </li>
                                        ))
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog
