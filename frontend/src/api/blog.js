import api from './api.js';


const getBlogPost = async (postID, quick_load = false) => {
    if(!postID) {
        console.error("postID must exist with a valid value");
        return {
            success: false,
            msg: [],
            post: null
        }
    }
    postID = Number(postID);
    if(!Number.isInteger(postID) || postID <= 0) {
        console.error("postID must be number greater than 0");
        return {
            success: false,
            msg: [],
            post: null
        }
    }

    try {
        const res = await api.get(
            'blog/posts/post/',
            {
                params: {
                    'id': postID,
                    'quick': quick_load
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                post: res.data.post
            }
        } else {
            console.error("Unknown successful response: ", res.data);
            return {
                success: false,
                msg: ['مشکلی از طرف سرور پیش آمد لطفا مجددا تلاش کنید.'],
                post: null
            }
        }
    } catch (err) {
        console.error("Failed to fetch blog post: ", err?.response.data || err.message);
        if(err?.response.status === 404) {
            return {
                success: false,
                msg: ['پستی با این مشخصات در دسترس نیست.'],
                post: null
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.'],
                post: null
            }
        }
    }
}


const validateSelector = (selector) => {
    if(typeof selector !== "string") {
        console.error("selector must be a string: ", selector);
        return false
    }
    if(!selector.trim()) {
        console.error("You need a selector to use this endpoint: ", selector);
        return false
    }

    return selector === "all" || selector.startsWith("search:") || /^\d+(,\d+)*$/.test(selector);

}

const FILTER_REGEX = new RegExp(
    '^' +
    '(?:' +
    '[a-zA-Z0-9_]+:' +
    '[\\w\\u0600-\\u06FF\\s\\-.,!?:\'"()]+' +
    '(?:,[\\w\\u0600-\\u06FF\\s\\-.,!?:\'"()]+)*' +
    ')' +
    '(?:;' +
    '[a-zA-Z0-9_]+:' +
    '[\\w\\u0600-\\u06FF\\s\\-.,!?:\'"()]+' +
    '(?:,[\\w\\u0600-\\u06FF\\s\\-.,!?:\'"()]+)*' +
    ')*' +
    '$',
    'u'
);

const buildBlogFilters = (filters) => {
    const filterParts = [];

    if (filters?.category) {
        if (!Array.isArray(filters.category)) {
            throw new Error("options.filters.category must be a list");
        }
        filterParts.push(`category:${filters.category.join(',')}`);
    }

    if (filters?.tags) {
        if (!Array.isArray(filters.tags)) {
            throw new Error("options.filters.tags must be a list");
        }
        filterParts.push(`tags:${filters.tags.join(',')}`);
    }

    if (filters?.date) {
        if (typeof filters.date !== "string") {
            throw new Error("options.filters.date must be a string");
        }
        if (["newest", "oldest", "trends"].includes(filters.date)) {
            filterParts.push(`date:${filters.date}`);
        }
    }

    return filterParts.join(';');
};


const getFilteredBlogPosts = async (options, page = 1) => {
    let selector = '';
    let filters = '';
    let limit = 6;

    if(!options?.selector || !validateSelector(options?.selector)) {
        console.error("options.selector should have valid value(all | id1,id2,... | search:QUERY): ", options?.selector);
        return {
            success: false,
            msg: [],
            posts: null,
            updatedPagination: null
        }
    } else {
        selector = options.selector;
    }

    if(options?.filters) {
        filters = buildBlogFilters(options.filters);
    }

    if(options?.limit && options.limit > 0 && options.limit < 50) {
        limit  = options.limit;
    }

    try {
        // console.log({selector});
        // console.log({filters});
        // console.log({limit});
        // console.log({page});
        const res = await api.get(
            'blog/posts/filtered/',
            {
                params: {
                    selector: selector,
                    filters: filters,
                    limit: limit,
                    page: page
                }
            }
        );

        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                posts: res.data.posts,
                updatedPagination: res.data.pagination
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا مجددا تلاش کنید.'],
                posts: null,
                updatedPagination: null
            }
        }
    } catch (err) {
        console.error("Failed to fetch the filtered list of blog posts: ", err?.response.data || err.message);
        if(err?.response.status === 404) {
            return {
                success: false,
                msg: ['پستی یافت نشد.'],
                posts: null,
                updatedPagination: null
            }
        } else if(err?.response.status === 500) {
            return {
                success: false,
                msg: ['مشکلی از طرف سرور پیش آمد. لطفا بعدا تلاش کنید.'],
                posts: null,
                updatedPagination: null
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا مجددا تلاش کنید.'],
                posts: null,
                updatedPagination: null
            }
        }
    }
}

const getCategoryList = async (limit) => {
    if(!Number.isInteger(limit) || limit < 0) {
        console.error("(in getCategoryList) limit should be an integer bigger or equal to 1");
        return {
            success: false,
            msg: [],
            categories: null
        }
    }

    try {
        const res = await api.get(
            'blog/posts/categories/',
            {
                params: {
                    limit: limit
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                categories: res.data.categories
            }
        } else {
            console.error("Failed to fetch blog categories: ", res.data);
        }
    } catch (err) {
        console.error("Failed to fetch blog categories: ", err?.response.data || err.message);
        return {
            success: false,
            msg: err?.response.status === 404 ? ['هیچ دسته بندی در سایت وجود ندارد.'] : ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
            categories: null
        }
    }
}

const getTagsList = async (limit) => {
    if(!Number.isInteger(limit) || limit < 0) {
        console.error("(in getTagsList) limit should be an integer bigger or equal to 1");
        return {
            success: false,
            msg: [],
            tags: null
        }
    }

    try {
        const res = await api.get(
            'blog/posts/tags/',
            {
                params: {
                    limit: limit
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                tags: res.data.tags
            }
        } else {
            console.error("Failed to fetch blog tags: ", res.data);
        }
    } catch (err) {
        console.error("Failed to fetch blog tags: ", err?.response.data || err.message);
        return {
            success: false,
            msg: err?.response.status === 404 ? ['هیچ تگی در سایت وجود ندارد.'] : ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
            tags: null
        }
    }
}

export { getBlogPost, getFilteredBlogPosts, getCategoryList, getTagsList };
