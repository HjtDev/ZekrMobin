import React, { useEffect, useState } from 'react'
import { getCategoryList, getFilteredBlogPosts, getTagsList } from '../api/blog.js';
import { toast } from "react-toastify";
import CustomSkeleton from '../components/CustomSkeleton.jsx';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Select from 'react-select';

const BlogList = () => {
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);
    const [params] = useSearchParams();

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [tags, setTags] = useState()

    const [pagination, setPagination] = useState({ page: 1 });
    const [paginationOptions, setPaginationOptions] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState(false);

    const getDefaultOptions = (params) => {
        const category = params.get("category");
        const tag = params.get("tag");
        const query = params.get("search");

        let defaultOptions = {
            selector: "all",
            filters: { date: "trends" },
            limit: 6,
        };

        if (category && Number.isInteger(Number(category))) {
            defaultOptions.filters.category = [category];
        }

        if (tag && Number.isInteger(Number(tag))) {
            defaultOptions.filters.tags = [tag];
        }

        if (query) {
            defaultOptions.selector = `search:${query}`;
        }

        return defaultOptions;
    };

    const [options, setOptions] = useState({
        selector: "all",
        filters: { date: "trends" },
        limit: 6,
    });

    const SelectStyle = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#1C213A",
            borderColor: state.isFocused ? "#3BC8E7" : "#3BC8E7",
            boxShadow: state.isFocused ? "0 0 0 1px #3BC8E7" : "none",
            "&:hover": { borderColor: "#3BC8E7" },
            color: "#fff",
            minHeight: "42px",
            borderRadius: "10px",
            transition: "all 0.2s ease-in-out",
            width: "200px",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#1C213A",
            color: "#fff",
            zIndex: 9999,
            border: "1px solid #3BC8E7",
            borderRadius: "10px",
            overflow: "hidden",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "#3BC8E7"
                : state.isFocused
                    ? "#2A3152"
                    : "#1C213A",
            color: state.isSelected ? "#15192B" : "#fff",
            cursor: "pointer",
            paddingLeft: state.data.level
                ? `${state.data.level * 15}px`
                : "12px", // indent child categories visually
            fontWeight: state.data.level === 0 ? "600" : "400",
            borderLeft:
                state.data.level && state.data.level > 0
                    ? "2px solid #3BC8E7"
                    : "none",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#aaa",
            fontStyle: "italic",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#fff",
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#3BC8E7",
            color: "#15192B",
            borderRadius: "12px",
            padding: "2px 6px",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#15192B",
            fontWeight: "600",
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "#15192B",
            borderRadius: "8px",
            ":hover": {
                backgroundColor: "#2A3152",
                color: "#3BC8E7",
            },
        }),
        input: (base) => ({
            ...base,
            color: "#fff",
        }),
        groupHeading: (base) => ({
            ...base,
            color: "#3BC8E7",
            backgroundColor: "#15192B",
            padding: "6px 12px",
            fontWeight: "700",
            fontSize: "0.9rem",
            borderBottom: "1px solid #3BC8E7",
        }),
    };

    const fetchPosts = async (page = null) => {
        let fPage = page;
        if(fPage) {
            setPagination(prev => ({...prev, page: fPage}));
        } else {
            fPage = pagination.page;
        }
        window.scrollTo({ top: 0, behavior: "smooth"});
        setIsLoading(true);
        const { success, msg, posts, updatedPagination} = await getFilteredBlogPosts(options, fPage);
        setPosts(posts);
        if(updatedPagination) {
            setPagination(updatedPagination);
        }
        const messanger = success ? toast.success : toast.error;
        msg.forEach(message => messanger(message));
        setIsLoading(false);
    }

    const resetOptions = () => {
        navigate(window.location.pathname, { replace: true });

        setActiveFilter(false);
        setSearchQuery('');
        setPagination({ page: 1 });

        setOptions({
            selector: "all",
            filters: {date: "trends"},
            limit: 6,
        });
    }

    const addSearchQuery = () => {
        setOptions(prev => ({
            ...prev,
            selector: `search:${searchQuery}`,
            filters: {}
        }));
        setActiveFilter(true);
    }

    const addCategory = (categoryID) => {
        setOptions(prev => ({
            ...prev,
            filters: { ...prev.filters, category: [categoryID] }
        }));
        setActiveFilter(true);
    }

    const addTag = (tagID) => {
        setOptions(prev => ({
            ...prev,
            filters: { ...prev.filters, tags: [tagID]}
        }));
        setActiveFilter(true);
    }

    useEffect(() => {
        const loadCategories = async () => {
            const { success, msg, categories } = await getCategoryList(0);
            setCategories(categories);
            const messanger = success ? toast.success : toast.error;
            msg.forEach(message => messanger(message));
        }
        const loadTags = async () => {
            const { success, msg, tags } = await getTagsList(0);
            setTags(tags);
            const messanger = success ? toast.success : toast.error;
            msg.forEach(message => messanger(message));
        }
        loadCategories();
        loadTags();
    }, []);

    useEffect(() => {
        const hasParams = params.get("category") || params.get("tag") || params.get("search");
        if (hasParams) {
            const newOptions = getDefaultOptions(params);
            if(params.get("search")) {
                setOptions(() => ({ ...newOptions, filters: null }))
            } else {
                setOptions(newOptions);
            }
            setActiveFilter(true);
            if (params.get("search")) {
                setSearchQuery(params.get("search"));
            }
        }
        setInitialized(true);
    }, [params]);

    useEffect(() => {
        if(!initialized) return;
        fetchPosts();
    }, [options, initialized]);

    useEffect(() => {
        if(pagination?.total_pages) {
            setPaginationOptions(Array.from({length: pagination.total_pages}, (_, i) => ({
                label: `صفحه ${i + 1}`,
                value: i + 1
            })));
        }
    }, [pagination]);
    return (
        <div className="ms_blog_single_wrapper">
            <div className="row">
                <div className="col-lg-9 col-md-9" style={{ overflow: "visible" }}>
                    {
                        isLoading || !posts ?
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
                                    </div>
                                </div>
                            ) : posts.map((post, index) => (
                                <div className="ms_blog_single" key={index}>
                                    <Link to={`/blog/post/${post.id}/${post.title}`}>
                                        <div className="blog_single_img">
                                            <img src={post.thumbnail} alt={post.title} className="img-fluid"/>
                                        </div>
                                    </Link>
                                        <div className="blog_single_content">
                                            <Link to={`/blog/post/${post.id}/${post.title}`}>
                                                <h3 className="ms_blog_title">{post.title}</h3>
                                            </Link>
                                            <div className="ms_post_meta">
                                                <ul>
                                                    <li>{post.time_since}</li>
                                                    <li>&nbsp;/&nbsp;</li>
                                                    <li> {post.comments_count} دیدگاه</li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                            ))
                    }

                    {pagination?.total_pages > 1 && (
                        <div className="row justify-content-center mt-4">
                            <div className="col-auto">
                                <Select
                                    value={{
                                        label: `صفحه ${pagination.page} از ${pagination.total_pages}`,
                                        value: pagination.page
                                    }}
                                    onChange={(selectedOption) => {
                                        const newPage = selectedOption.value;
                                        if(newPage !== pagination.page) {
                                            fetchPosts(selectedOption.value);
                                        }
                                    }}
                                    options={paginationOptions}
                                    onMenuOpen={() => {}}
                                    onMenuClose={() => {}}
                                    isSearchable={false}
                                    styles={SelectStyle}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-lg-3 col-md-3">
                    {
                        activeFilter && (
                            <div className="d-flex justify-content-start align-items-start"
                                 style={{ gap: "5rem", marginBottom: "15rem", marginTop: "10rem" }}>
                                <h1 className="m-0" style={{ fontSize: "15rem" }}>حذف فیلتر ها</h1>
                                <a
                                    href="#"
                                    onClick={() => resetOptions()}
                                    className="fa fa-close ms_color prevent-default"
                                ></a>
                            </div>
                        )
                    }
                    {/*--Sidebar Start--*/}
                    <div className="ms_sidebar">
                        <div className="widget widget_search">
                            <input
                                type="text"
                                autoComplete="none"
                                aria-autocomplete="none"
                                className="form-control"
                                placeholder="جستجو ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        addSearchQuery();
                                    }
                                }}
                                style={{
                                    paddingLeft: "50rem"
                                }}
                            />
                            <button className="search_btn search_icon" onClick={addSearchQuery}>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </button>
                        </div>
                        {/*Categories*/}
                        <div className="widget widget_categories">
                            <h2 className="widget-title">دسته بندی</h2>
                            <ul>
                                {
                                    categories ?
                                        categories.map((category, index) => (
                                            <li key={index}>
                                                <a href={`?category=${category.id}`} onClick={() => addCategory(category.id)} className="prevent-default">{category.name}</a>
                                            </li>
                                        )) : (
                                            <div>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                            </div>
                                        )
                                }
                            </ul>
                        </div>
                        {/*-Tags-*/}
                        <div className="widget widget_tag_cloud">
                            <h2 className="widget-title">تگ ها</h2>
                            <ul>
                                {
                                    tags ?
                                        tags.map((tag, index) => (
                                            <li key={index}>
                                                <a href={`?tag=${tag.id}`} onClick={() => addTag(tag.id)} className="prevent-default">{tag.name}</a>
                                            </li>
                                        )) : (
                                            <div>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                                <a href="#"><CustomSkeleton width={150} /></a>
                                            </div>
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
export default BlogList
