import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation();

    useEffect(() => {
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
