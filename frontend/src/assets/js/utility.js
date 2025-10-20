const truncateText = (text, characters) => {
    if(!text) return '';
    return /Mobi|Androind/.test(navigator.userAgent) ? text.length > characters ? text.slice(0, characters - 4) + '...' : text : text
}

export default truncateText;
