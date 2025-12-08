import api from './api.js';


const fetchHadith = async () => {
    try {
        const res = await api.get('main/daily_hadith/');
        if(res.status === 200) {
            return {
                success: true,
                hadith: res.data.hadith
            }
        } else {
            console.error('Failed to fetch hadith: ', res.data);
            return {
                success: false,
                hadith: null
            }
        }
    } catch (err) {
        console.error('Failed to fetch hadith: ', err?.response.data || err?.message);
        return {
            success: false,
            hadith: null
        }
    }
}

export default fetchHadith;
