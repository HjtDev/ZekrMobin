import api from './api.js';


const getComments = async (post_id) => {
    if(!post_id) {
        return {
            success: false,
            msg: [],
            comments: null
        }
    }

    try {
        const res = await api.get(
            'media/posts/post/comments/',
            {
                params: {
                    'id': post_id
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
            return {
                success: true,
                msg: [],
                comments: null
            }
        }
    } catch (err) {
        console.error('Failed to retrieve comments:', err?.response.data || err.message);
        return {
            success: false,
            msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.'],
            comments: null
        }
    }
}

const createComments = async (post_id, content) => {
    if(!post_id) {
        return {
            success: false,
            msg: []
        }
    }
    if(!content.trim()) {
        return {
            success: false,
            msg: []
        }
    }

    try {
        const res = await api.post(
            'media/posts/post/comments/',
            {
                'id': post_id,
                'content': content
            }
        );
        if(res.status === 201) {
            return {
                success: true,
                msg: ['نظر شما با موفقیت ذخیره شد و پس از تایید به نمایش در خواهد آمد.']
            }
        }
    } catch (err) {
        console.error('Failed to create a comment:', err?.response.data || err.message);
        if(err?.response.status === 409) {
            return {
                success: false,
                msg: ['شما قبلا برای این پست نظر خود را ثبت کرده اید.']
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.']
            }
        }
    }
}

export { getComments, createComments };
