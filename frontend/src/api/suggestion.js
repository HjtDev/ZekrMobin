import api from './api.js';


const getSuggestedPosts = async (postID) => {
    if(!postID) {
        return {
            success: false,
            posts: null
        }
    }

    try {
        const res = await api.get(
            'media/posts/post/suggestion/',
            {
                params: {
                    'id': postID
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                posts: res.data.posts
            }
        } else {
            console.error('Failed to get a suggestion list:', res.data);
            return {
                success: false,
                posts: null
            }
        }
    } catch (err) {
        console.error('Failed to get a suggestion list:', err?.response.data || err.message);
        return {
            success: false,
            posts: null
        }
    }
}

export default getSuggestedPosts;
