import api from './api.js';


const getArtists = async () => {
    try {
        const res = await api.get('media/artists/');
        if(res.status === 200) {
            return {
                success: true,
                msg: [],
                artists: res.data.artists
            }
        } else {
            console.error("Failed to retrieve artists: ", res.data);
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
                artists: null
            }
        }
    } catch (err) {
        console.error("Failed to fetch artists: ", err?.response.data || err.message);
        if(err?.response.status === 404) {
            return {
                success: false,
                msg: ['هیچ هنرمندی در سایت ثبت نشده است.'],
                artists: null
            }
        } else {
            return {
                success: false,
                msg: ['مشکلی پیش آمد لطفا بعدا تلاش کنید.'],
                artists: null
            }
        }
    }
}

export default getArtists;
