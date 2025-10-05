import api from "./api.js";


const addClubUser = async (name, email) => {
    if(!name.trim() || !email.trim()) {
        return {
            success: false,
            msg: ['لطفا نام و ایمیل خود را وارد کنید.'],
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return {
            success: false,
            msg: ['لطفا یک ایمیل معتبر وارد کنید.']
        }
    }
    try{
        const res = await api.post(
            'main/club/',
            {
                name,
                email
            }
        );
        if(res.status === 201) {
            return {
                success: true,
                msg: ['شما با موفقیت عضو خبرنامه شدید.']
            }
        } else {
            console.error('Fetching club was successful but the response is unknown:', res.data || res.data.message)
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.']
            }
        }
    } catch (err) {
        if(err?.response.status === 409) {
            return {
                success: false,
                msg: ['شما قبلا عضو خبرنامه شده اید.']
            }
        } else {
            console.error('Failed to submit club information:', err?.response.data || err.message)
            return {
                success: false,
                msg: ['مشکلی پیش آمده است لطفا بعدا تلاش کنید.']
            }
        }
    }
}

export default addClubUser;