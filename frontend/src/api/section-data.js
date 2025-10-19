import api from './api.js';


const getSectionData = async (section_id) => {
    if(!Number.isInteger(section_id)) {
        return {
            success: false,
            data: null
        }
    }
    try {
        const res = await api.get(
            'main/main_page/',
            {
                params: { section_id }
            }
        );
        return {
            success: true,
            data: res.data
        }
    } catch (err) {
        console.error('Failed to fetch section data:', section_id, err?.response.data || err.message);
        return {
            success: false,
            data: null
        }
    }
}

const contentMap = {
    'recent-posts': 'media/posts/filtered/',
    'weekly-posts': 'media/posts/filtered/',
    'new-posts': 'media/posts/filtered/',
    'live-suggestions': 'media/posts/filtered/',
    'top-artists': 'media/top_artists/',
    'top-album': 'media/top_categories/',
    'top-user-album': 'media/top_categories/',

}
const getMainPageData = async (content_section, filters = '', limit = 0) => {
    if(!content_section) {
        return {
            success: false,
            content: null
        }
    }
    try {
        const res = await api.get(
            `${contentMap[content_section]}`,
            {
                params: {
                    selector: `section:${content_section}`,
                    filters,
                    limit,
                    user_rated: content_section === 'top-user-album'
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                content: res?.data.posts || res?.data.artists || res?.data.categories
            }
        } else {
            console.error('Failed to retrieve section content:', content_section, res.data);
            return {
                success: false,
                content: null
            }
        }
    } catch (err) {
        console.error('Failed to retrieve section content:', content_section, err?.response.data || err.message);
        return {
            success: false,
            content: null
        }
    }
}

export { getSectionData, getMainPageData };
