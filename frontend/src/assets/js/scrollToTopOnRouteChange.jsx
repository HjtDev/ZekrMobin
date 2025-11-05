import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import toggleSidebar from "./toggleSidebar.js";

const ScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        toggleSidebar(false, false);
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 100);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
export default ScrollToTopOnRouteChange
