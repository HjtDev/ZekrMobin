const truncateText = (text) => {
    if(!text) return '';
    return /Mobi|Androind/.test(navigator.userAgent) ? text.length > 5 ? text.slice(0, 4) + '...' : text : text
}

export default truncateText;
