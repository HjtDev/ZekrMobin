import jalaali from 'jalaali-js';

const toJalaliDate = (isoString) => {
    const date = new Date(isoString);

    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1; // JS months start from 0
    const gDay = date.getDate();

    const jDate = jalaali.toJalaali(gYear, gMonth, gDay);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // return `${jDate.jy}/${jDate.jm}/${jDate.jd} - ${hours}:${minutes}`;
    return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
};

export default toJalaliDate;
