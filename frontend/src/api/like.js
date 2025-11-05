import api from './api.js';


const likePost = async (postID) => {
    if(!postID) {
        return {
            success: false,
            msg: [],
            is_liked: null
        }
    }

    try {
        const res = await api.get(
            'media/posts/post/like/',
            {
                params: {
                    'id': postID
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [res.data.is_liked ? 'به لیست علاقه مندی ها اضافه شد.' : 'از لیست علاقه مندی ها حذف شد.'],
                is_liked: res.data.is_liked
            }
        } else {
            console.error('Failed to add/remove like from post:', res.data);
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
                is_liked: null
            }
        }
    } catch (err) {
        console.error('Failed to add/remove like from post:', err?.response.data || err.message);
        return {
            success: false,
            msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
            is_liked: null
        }
    }
}

export default likePost;
