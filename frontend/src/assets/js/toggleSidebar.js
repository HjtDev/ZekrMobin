const toggleSidebar = (isOpen, mobileOnly=true) => {

    const sidebar = document.querySelector(".ms_sidemenu_wrapper");
    if (!sidebar) return;

    if (isOpen) {
        sidebar.classList.add("open_menu");
    } else {
        sidebar.classList.remove("open_menu");
    }
};

export default toggleSidebar;
