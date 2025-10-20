const truncateText = (text, mobileCharacters = -1, desktopCharacters = -1) => {
    if(!text) return '';
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const limit = isMobile ? mobileCharacters : desktopCharacters;

    if(limit !== -1 && text.length > limit) {
        return text.slice(0, limit - 4) + '...';
    }
    return text
}

export default truncateText;
