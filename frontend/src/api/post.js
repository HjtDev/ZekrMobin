import api from './api.js';


const getPost = async (postID, quickLoad = true) => {
    if(!postID) {
        return {
            success: false,
            post: null
        }
    }

    try {
        const res = await api.get(
            'media/posts/post/',
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
                post: res.data.post
            }
        } else {
            console.error("Failed to fetch the post: ", res.data);
            return {
                success: false,
                post: null
            }
        }
    } catch (err) {
        console.error("Failed to fetch the post: ", err?.response.data || err.message);
        return {
            success: false,
            post: null
        }
    }
}

export default getPost;
