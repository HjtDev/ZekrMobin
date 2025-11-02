import api from './api.js';


const getBlogPost = async (postID, quickLoad = false) => {
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
                    'quick': quickLoad
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


const getBlogPostComments = async (postID) => {
    postID = Number(postID);
    if(!postID || !Number.isInteger(postID) || postID <= 0) {
        console.error("(in getBlogPostComment) postID should a positive integer bigger than zero", postID);
        return {
            success: false,
            msg: [],
            comments: null
        }
    }

    try {
        const res = await api.get(
            'blog/posts/post/comments/',
            {
                params: {
                    id: postID
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                comments: res.data.comments
            }
        } else {
            console.error("Failed to fetch blog post comment: ", res.data);
            return {
                success: false,
                msg: res.status === 204 ? [] : ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.'],
                comments: null
            }
        }
    } catch (err) {
        console.error("Failed to fetch blog post comment: ", err?.response.data || err.message);
        return {
            success: false,
            msg: err?.response.status === 404 ? ['پستی با این مشخصات یافت نشد.'] : ['مشکلی در دریافت نظرات پیش آمده است لطفا مجددا تلاش کنید.'],
            comments: null
        }
    }
}

const createBlogPostComment = async (postID, content) => {
    postID = Number(postID);
    if(!postID || !Number.isInteger(postID) || postID <= 0) {
        console.error("(in createBlogPostComment) postID should a positive integer bigger than zero", postID);
        return {
            success: false,
            msg: [],
        }
    }

    if(typeof content !== "string") {
        console.error("(in createBlogPostComment) content should be a valid string less than 320 character");
        return {
            success: false,
            msg: [],
        }
    }

    if(!content.trim()) {
        return {
            success: false,
            msg: ['شما نمی توانید یک متن خالی ارسال کنید.']
        }
    }

    if(content.length > 320) {
        return {
            success: false,
            msg: ['متن نظر شما نباید بیشتر از ۳۲۰ کاراکتر باشد.']
        }
    }

    try {
        const res = await api.post(
            'blog/posts/post/comments/',
            {
                id: postID,
                content: content.trim()
            }
        );
        if(res.status === 201) {
            return {
                success: true,
                msg: ['نظر شما ثبت شد و پس از تایید به نمایش در خواهد آمد.']
            }
        } else {
            console.error("Failed to create comment for blog post: ", res.data);
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا مجددا تلاش کنید.']
            }
        }
    } catch (err) {
        console.error("Failed to create comment for blog post: ", err?.response.data || err.message);
        if(err?.response.status === 409) {
            return {
                success: false,
                msg: err?.response?.data?.is_verified ? ['شما قبلا یک نظر ثبت کرده اید.'] : ['شما یک نظر در انتظار تایید دارید.']
            }
        } else {
            return {
                success: false,
                msg: err?.response.status === 404 ? ['این پست امکان ارسال نظر ندارد.'] : ['مشکلی پیش آمده است لطفا دوباره تلاش کنید.']
            }
        }
    }
}

const getBlogPostSuggestion = async (postID, basedOn, limit) => {
    postID = Number(postID);
    if(!postID || !Number.isInteger(postID) || postID <= 0) {
        console.error("(in getBlogPostSuggestion) postID should a positive integer bigger than zero", postID);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    if(!["category", "tag"].includes(basedOn)) {
        console.error("(in getBlogPostSuggestion) basedOn should be category or tag: ", basedOn);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    limit = Number(limit);
    if(!Number.isInteger(limit) || limit <= 0) {
        console.error("(in getBlogPostSuggestion) limit should be a number greater than zero: ", limit);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    try {
        const res = await api.get(
            'blog/posts/post/suggest/',
            {
                params: {
                    id: postID,
                    based_on: basedOn,
                    limit: limit
                }
            }
        );

        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                posts: res.data.posts
            }
        } else {
            console.error("Failed to get suggested posts: ", res.data);
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
                posts: null
            }
        }

    } catch (err) {
        console.error("Failed to get post suggestion: ", err?.response.data || err.message);
        return {
            success: false,
            msg: err?.response.status === 500 ? ['مشکلی پیش آمد', 'محتوای پیشنهادی از دسترس خارج شد.'] : [],
            posts: null
        }
    }
}

export { getBlogPost, getFilteredBlogPosts, getCategoryList, getTagsList, getBlogPostComments, createBlogPostComment, getBlogPostSuggestion };
