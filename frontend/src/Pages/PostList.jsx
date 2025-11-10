import React, {useCallback, useEffect, useState} from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getFilteredPostList, getFilters } from "../api/post-list.js";
import CustomSkeleton from '../components/CustomSkeleton.jsx';
import MediaPortal from '../components/MediaPlayer/MediaPortal.jsx';
import "../assets/css/PostList.css"

const PostList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState({ page: 1 });

    const [allCategories, setAllCategories] = useState([]);
    const [categoryStack, setCategoryStack] = useState([]); // keeps track of levels
    const [categoryOptions, setCategoryOptions] = useState([]); // current level options
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const [selectedSection, setSelectedSection] = useState('all');

    const [selectedOption, setSelectedOption] = useState(null);
    const mostOptions = [
        {
            label: "بیشترین بازدید",
            value: "view"
        },
        {
            label: "بیشترین لایک",
            value: "like"
        },
        {
            label: "بیشترین دانلود",
            value: "download"
        },
        {
            label: "محبوب ترین",
            value: "popular"
        },
        {
            label: "هیچ کدام",
            value: ""
        }
    ];

    const [selectedDate, setSelectedDate] = useState(null);
    const dateOptions = [
        {
            label: "جدیدترین پست ها",
            value: "newest"
        },
        {
            label: "قدیمی ترین پست ها",
            value: "oldest"
        },
        {
            label: "پست های پیشنهادی سایت",
            value: "suggested"
        },
        {
            label: "هیچ کدام",
            value: "none"
        }
    ];

    const [activeSearchQuery, setActiveSearchQuery] = useState(null);
    const [activeSearchParams, setActiveSearchParams] = useState(null);
    const resetSearch = async () => {
        const url = new URL(window.location);
        url.search = '';
        window.history.replaceState(null, '', url.toString());
        setActiveSearchQuery(null);
        setActiveSearchParams(null);
        await fetchPosts(selectedSection, filters, 12, pagination.page);
    }

    const [isOpen, setIsOpen] = useState({});

    const handleMediaClick = (postId) => {
        setIsOpen((prev) => ({ ...prev, [postId]: true }));
    };

    const fetchPosts = async (section, filters, perPage = 6, page = 1) => {
        setIsLoading(true);
        const params = new URLSearchParams(location.search);
        if(params.size > 0) {
            setActiveSearchParams(params);
        }
        const updatedSection = params.get('section');
        const artists = params.get('artists');
        const categories = params.get('categories');
        const searchQuery = params.get('search');
        if(updatedSection) {
            section = updatedSection;
            setSelectedSection(updatedSection);
        }
        if(artists && /^\d+(,\d+)*$/.test(artists)) {
            filters.artists = artists.split(',');
        } else {
            filters.artists = null;
        }
        if(categories && /^\d+(,\d+)*$/.test(categories)) {
            filters.categories = categories.split(',');
        } else {
            if(!filters.categories) filters.categories = null;
        }
        if(searchQuery) {
            filters.search = searchQuery;
            setActiveSearchQuery(searchQuery);
        } else {
            filters.search = null;
            setActiveSearchQuery(null);
        }
        const { success, msg, posts, updatedPagination } = await getFilteredPostList(section, filters, perPage, page);
        setPosts(posts);
        if (updatedPagination) setPagination(updatedPagination);
        const messenger = success ? toast.success : toast.error;
        msg.forEach((message) => messenger(message));
        setIsLoading(false);
    };

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
            width: "170px",
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

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFiltersRow = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFilterOpen(prev => !prev);
    }, []);

    const filtersRowStyle = {
        maxHeight: isFilterOpen ? '500rem' : '0',
        opacity: isFilterOpen ? 1 : 0,
        columnGap: "65rem",
        rowGap: "15rem",
    };

    useEffect(() => {
        const fetchFilters = async () => {
            const { success, msg, categories, tags } = await getFilters();
            setAllCategories(categories || []);
            setCategoryOptions(categories.map((cat) => ({ label: cat.name, value: cat.id })));
            setTags(tags.map((tag) => ({ label: tag.name, value: tag.id })));
            const messenger = success ? toast.success : toast.error;
            msg.forEach((message) => messenger(message));
        };
        fetchFilters();
        fetchPosts(selectedSection, filters, 12, pagination.page);
    }, []);

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);

        const findCategory = (cats, id) => {
            for (const cat of cats) {
                if (cat.id === id) return cat;
                if (cat.children?.length) {
                    const found = findCategory(cat.children, id);
                    if (found) return found;
                }
            }
            return null;
        };

        const currentCat = findCategory(allCategories, selectedOption.value);

        const newFilters = { ...filters, categories: [selectedOption.value] };
        setFilters(newFilters);
        fetchPosts(selectedSection, newFilters, 12, pagination.page);

        if (currentCat?.children?.length > 0) {
            setCategoryStack((prev) => [...prev, categoryOptions]);
            setCategoryOptions(
                currentCat.children.map((c) => ({ label: c.name, value: c.id }))
            );
            setSelectedCategory(null);
        }
    };

    const handleBack = () => {
        if (categoryStack.length > 0) {
            setCategoryStack([]); // clear all levels
            setCategoryOptions(allCategories.map((cat) => ({
                label: cat.name,
                value: cat.id
            })));
            setSelectedCategory(null);

            const newFilters = { ...filters, categories: [] };
            setFilters(newFilters);
            fetchPosts(selectedSection, newFilters, 12, pagination.page);
        }
    };

    return (
        <div className="ms_top_artist">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ms_heading">
                            <div className="row align-items-center flex-wrap text-right flex-lg-wrap">
                                <div className="col-12  order-0 order-lg-0" style={{marginBottom: "10rem"}}>
                                    {
                                        activeSearchParams ?
                                            activeSearchQuery ?
                                                (
                                                    <div className="d-flex justify-content-start align-items-start"
                                                         style={{gap: "5rem"}}>
                                                        <h1 className="m-0">{`نمایش نتایج جست و جو: ${activeSearchQuery}`}</h1>
                                                        <a href="#" onClick={() => resetSearch()}
                                                           className="fa fa-close ms_color prevent-default"></a>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-start align-items-start"
                                                         style={{gap: "5rem"}}>
                                                        <h1 className="m-0">حذف فیلتر ها</h1>
                                                        <a href="#" onClick={() => resetSearch()}
                                                           className="fa fa-close ms_color prevent-default"></a>
                                                    </div>
                                                ) : (
                                                <h1 className="m-0">پست ها</h1>
                                            )
                                    }
                                </div>
                                <a
                                    className="ms_btn d-inline-flex align-items-center justify-content-center text-dark order-1"
                                    onClick={handleFiltersRow}
                                    style={{ gap: "15rem", padding: "10rem", marginBottom: "10rem", marginRight: "15rem", width: "fit-content" }}
                                >
                                    <i className="fa fa-filter"></i>
                                    فیلتر ها
                                </a>

                                <div className="row col-12 order-1 filters-wrapper" style={filtersRowStyle}>
                                    <div className="col-12 col-sm-6 col-lg-2 order-2 order-lg-2">
                                        <Select
                                            value={selectedTag}
                                            onChange={(selectedOptions) => {
                                                setSelectedTag(selectedOptions);
                                                const ids = selectedOptions ? selectedOptions.map((item) => item.value) : [];
                                                const newFilters = {...filters, tags: ids};
                                                setFilters(newFilters);
                                                fetchPosts(selectedSection, newFilters, 12, pagination.page);
                                            }}
                                            isMulti
                                            isSearchable
                                            isRtl
                                            placeholder="تگ ها"
                                            options={tags}
                                            noOptionsMessage={() => "یافت نشد"}
                                            autoComplete="off"
                                            styles={SelectStyle}
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-2 order-4 order-lg-4">
                                        <div className="d-flex align-items-center gap-2">
                                            {categoryStack.length > 0 && (
                                                <button
                                                    onClick={handleBack}
                                                    className="btn btn-sm btn-outline-info flex-shrink-0"
                                                    style={{
                                                        fontSize: "15rem",
                                                        borderRadius: "4rem",
                                                        height: "100%",
                                                        padding: "8rem",
                                                        marginLeft: "10rem"
                                                    }}
                                                >
                                                    بازگشت
                                                </button>
                                            )}
                                            <div className="flex-grow-1">
                                                <Select
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    isSearchable
                                                    isRtl
                                                    placeholder="دسته بندی"
                                                    options={categoryOptions}
                                                    noOptionsMessage={() => "یافت نشد"}
                                                    autoComplete="none"
                                                    aria-autocomplete="none"
                                                    styles={SelectStyle}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-2 order-2 order-lg-2">
                                        <Select
                                            value={selectedOption}
                                            onChange={(selectedOptions) => {
                                                setSelectedOption(selectedOptions);
                                                const newFilters = {...filters, most: selectedOptions.value};
                                                setFilters(newFilters);
                                                fetchPosts(selectedSection, newFilters, 12, pagination.page);
                                            }}
                                            isSearchable={false}
                                            isRtl
                                            placeholder="بر اساس"
                                            options={mostOptions}
                                            noOptionsMessage={() => "یافت نشد"}
                                            autoComplete="off"
                                            backspaceRemovesValue
                                            aria-autocomplete="none"
                                            styles={SelectStyle}
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-2 order-3 order-lg-3">
                                        <Select
                                            value={selectedDate}
                                            onChange={(selectedOptions) => {
                                                setSelectedDate(selectedOptions);
                                                const newDates = {
                                                    "newest": false,
                                                    "oldest": false,
                                                    "suggested": false
                                                };
                                                if (selectedOptions.value !== "none") {
                                                    newDates[selectedOptions.value] = true;
                                                }
                                                const newFilters = {...filters, ...newDates};
                                                setFilters(newFilters);
                                                fetchPosts(selectedSection, newFilters, 12, pagination.page);
                                            }}
                                            isSearchable={false}
                                            isRtl
                                            placeholder="تاریخ"
                                            options={dateOptions}
                                            noOptionsMessage={() => "یافت نشد"}
                                            autoComplete="off"
                                            backspaceRemovesValue
                                            aria-autocomplete="none"
                                            styles={SelectStyle}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* POSTS */}
                    {!isLoading && posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div className="col-lg-2 col-md-6" key={index}>
                                <div className="ms_rcnt_box marger_bottom30">
                                    <div className="ms_rcnt_box_img">
                                        <img src={post.thumbnail} alt={post.title} className="img-fluid" />
                                        <div className="ms_main_overlay">
                                            <div className="ms_box_overlay" />
                                            <div
                                                className="ms_play_icon"
                                                onClick={() => handleMediaClick(post.id)}
                                            >
                                                <img src="/images/svg/play.svg" alt="" />
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
                                    onClose={() => setIsOpen((prev) => ({ ...prev, [post.id]: false }))}
                                    postID={post.id}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="ms_rcnt_box marger_bottom30 text-right">
                                <CustomSkeleton width={310} height={310} />
                                <div className="ms_rcnt_box_text">
                                    <CustomSkeleton width={150} height={30} />
                                    <CustomSkeleton width={250} height={30} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* PAGINATION */}
                {pagination.total_pages > 1 && (
                    <div className="row justify-content-center mt-4">
                        <div className="col-auto">
                            <Select
                                value={{
                                    label: `صفحه ${pagination.page} از ${pagination.total_pages}`,
                                    value: pagination.page
                                }}
                                onChange={(selectedOption) => {
                                    const newPage = selectedOption.value;
                                    setPagination((prev) => ({ ...prev, page: newPage }));
                                    fetchPosts(selectedSection, filters, 12, newPage);
                                }}
                                options={Array.from({ length: pagination.total_pages }, (_, i) => ({
                                    label: `صفحه ${i + 1}`,
                                    value: i + 1
                                }))}
                                onMenuClose={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                isSearchable={false}
                                styles={SelectStyle}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostList;
