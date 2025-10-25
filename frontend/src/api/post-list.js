import api from './api.js';


const getFilters = async () => {
    try {
        const res = await api.get('media/filters/');
        if (res.status === 200) {
            return {
                success: true,
                msg: [],
                categories: res.data.categories,
                tags: res.data.tags
            }
        } else {
            console.error("Failed to retrieve filters: ", res.data);
            return {
                success: false,
                msg: [
                    'مشکلی پیش آمده است لطفا بعدا تلاش کنید.'
                ],
                categories: null,
                tags: null
            }
        }
    } catch (err) {
        console.error("Failed to retrieve filters: ", err.message);
        return {
            success: false,
            msg: [
                'مشکلی در دریافت تگ ها به وجود آمده است.',
                'مشکلی در دریافت دسته بندی ها به وجود آمده است.'
            ],
            categories: null,
            tags: null
        }
    }
}

const getFilteredPostList = async (section, filters, perPage, page) => {
    const commaSeparated = /^\d+(,\d+)*$/;
    let selected_section = '';

    let selected_filters = '';
    const addToFilters = (filter) => {
        if (typeof filter !== "string") {
            console.error("filter must be a string: ", filter);
        } else if (!selected_filters) {
            selected_filters = filter;
        } else {
            selected_filters += ';' + filter
        }
    }

    if (!section || section === "all") {
        selected_section = "all";
    } else if (commaSeparated.test(section)) {
        selected_section = `ids:${section}`;
    } else if (['recent-posts', 'weekly-posts', 'new-posts', 'live-suggestions'].includes(section)) {
        selected_section = `section:${section}`;
    } else {
        console.error("Invalid section: ", section);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    if (!filters) {
        console.error("if you don't want filters send {} as filters");
        return {
            success: false,
            msg: [],
            posts: null
        }
    } else if (typeof filters !== "object") {
        console.error("filters must be an object: ", filters);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    if (filters?.categories) {
        if (!Array.isArray(filters.categories)) {
            console.error("filters.categories should be a list")
            return {
                success: false,
                msg: [],
                posts: null
            }
        }
        if(filters.categories.length > 0) {
            addToFilters("category:" + filters.categories.join(","));
        }
    }

    if (filters?.tags) {
        if (!Array.isArray(filters.tags)) {
            console.error("filters.tags should be a list")
            return {
                success: false,
                msg: [],
                posts: null
            }
        }
        if(filters.tags.length > 0) {
            addToFilters("tag:" + filters.tags.join(","));
        }
    }

    if (filters?.artists) {
        if (!Array.isArray(filters.artists)) {
            console.error("filters.artists should be a list")
            return {
                success: false,
                msg: [],
                posts: null
            }
        }
        if(filters.artists.length > 0) {
            addToFilters("artist:" + filters.artists.join(","));
        }
    }

    if (filters?.most && typeof filters.most === "string") {
        if (["view", "like", "download", "popular"].includes(filters.most)) {
            addToFilters(`most:${filters.most}`);
        } else {
            console.error("filters.most must be one of these [view, like, download, popular]: ", filters.most);
            return {
                success: false,
                msg: [],
                posts: null
            }
        }
    }

    if (filters?.newest) {
        addToFilters("newest:true");
    } else if (filters?.oldest) {
        addToFilters("oldest:true");
    } else if (filters?.suggested) {
        addToFilters("suggested:true");
    }

    if (filters?.search && typeof filters.search === "string") {
        addToFilters(`search:${filters.search}`)
    }

    try {
        console.log("items before request:", selected_section, selected_filters, perPage, page);
        const res = await api.get(
            'media/posts/filtered/',
            {
                params: {
                    selector: selected_section,
                    filters: selected_filters,
                    limit: perPage,
                    page: page
                }
            }
        );
        if (res.status === 200) {
            return {
                success: true,
                msg: [],
                posts: res.data.posts,
                updatedPagination: res.data.pagination
            }
        } else {
            console.error("Failed to retrieve posts: ", res.data);
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
                posts: null,
                updatedPagination: null
            }
        }
    } catch (err) {
        if (err?.response.status === 404) {
            return {
                success: false,
                msg: ['هیچ پستی یافت نشد.'],
                posts: null
            }
        } else {
            console.error("Failed to retrieve posts: ", err?.response.data || err.message);
            return {
                success: false,
                msg: ['مشکلی در دریافت پست ها به وجود آمده است لطفا بعدا تلاش کنید.'],
                posts: null
            }
        }
    }
}

export {getFilters, getFilteredPostList}
