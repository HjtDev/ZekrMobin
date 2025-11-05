import api from './api.js';


const downloadPost = async (postID) => {
    if(!postID) {
        return {
            success: false,
            msg: [],
            links: []
        }
    }

    try {
        const res = await api.get(
            'media/posts/post/download/',
            {
                params: {
                    'id': postID
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: ['دانلود فایل ها به زودی آغاز می شود.'],
                links: res.data.links
            }
        } else {
            return {
                success: false,
                msg: ['امکان دانلود وجود ندارد. لطفا بعدا تلاش کنید'],
                links: []
            }
        }
    } catch (err) {
        return {
            success: false,
            msg: ['امکان دانلود وجود ندارد. لطفا بعدا تلاش کنید'],
            links: []
        }
    }
}

export default downloadPost;
