import api from './api.js';


const getUserPosts = async (listOf) => {
    if(!["liked", "history"].includes(listOf)) {
        console.error("getUserPosts should only get liked or history as input: ", listOf);
        return {
            success: false,
            msg: [],
            posts: null
        }
    }

    try {
        const res = await api.get(
        'media/user_posts/',
            {
                params: {
                    section: listOf
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                posts: res.data.posts
            }
        }
    } catch (err) {
        if(err?.response.status === 403) {
            return {
                success: false,
                msg: ['لطفا ابتدا به حساب کاربری خود وارد شوید.'],
                posts: null
            }
        } else if(err?.response.status === 404) {
            return {
                success: false,
                msg: [listOf === "history" ? "اخیرا هیچ پستی مشاهده نکرده اید." : "هیچ پستی را لایک نکرده اید."],
                posts: null
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.']
            }
        }
    }
}

const clearHistory = async () => {
    try {
        const res = await api.post('media/clear_history/');
        if(res.status === 204) {
            return {
                success: true,
                msg: ['تاریخچه پاک شد.']
            }
        }
    } catch (err) {
        console.error("Failed to clear history: ", err?.response?.data || err.message);
        return {
            success: false,
            msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.']
        }
    }
}

export { getUserPosts, clearHistory };
