const reloadInPostList = () => {
    const timer = setTimeout(() => {if(window.location.pathname.startsWith("/posts")) window.location.reload()}, 100);
    return () => clearTimeout(timer);
}

export default reloadInPostList;
