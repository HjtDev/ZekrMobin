import React, {useState} from 'react'
import Banner from '../components/Banner.jsx'
import RecentPosts from '../components/RecentPosts.jsx'
import Advertisements from '../components/Advertisements.jsx'
import LiveSuggestions from '../components/LiveSuggestion.jsx'
import NewReleases from '../components/NewReleases.jsx'
import TopPosts from '../components/TopPosts.jsx'
import TopArtists from '../components/TopArtists.jsx'
import TopCategories from '../components/TopCategories.jsx'
import WeeklyTop from '../components/WeeklyTop.jsx'
import LazySection from '../components/LazyLoader/LazySection.jsx';
import MediaPortal from '../components/MediaPlayer/MediaPortal.jsx';
import { useEffect } from 'react';
import "../assets/css/HeadingFix.css"
import TopBlogPosts from "../components/TopBlogPosts.jsx";
import Video from "../components/Video.jsx";


const MainPage = () => {
    const [sharedPost, setSharedPost] = useState({ open: false, id: -1 });
    useEffect(() => {
        if(window.musicInit) {
            window.musicInit();
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const postID = params.get('play');

        if(postID && /^\d+$/.test(postID)) {
            setSharedPost(() => ({ open: true, id: postID }));
        }
    }, [location.search]);

    return (
        <>
            <MediaPortal
                isOpen={sharedPost['open']}
                onClose={() => { setSharedPost((prev) => ({...prev, open: false })) } }
                postID={sharedPost['id']}
            />
            <Banner/>
            <LazySection>
                <Video />
            </LazySection>
            <LazySection>
                <RecentPosts/>
            </LazySection>
            <LazySection>
                <WeeklyTop/>
            </LazySection>
            <LazySection>
                <TopArtists/>
            </LazySection>
            <LazySection>
                <Advertisements adID={1} />
            </LazySection>
            <LazySection>
                <NewReleases/>
            </LazySection>
            <LazySection>
                <TopPosts/>
            </LazySection>
            <LazySection>
                <TopCategories/>
            </LazySection>
            <LazySection>
                <Advertisements adID={2} />
            </LazySection>
            <LazySection>
                <LiveSuggestions/>
            </LazySection>
            <LazySection>
                <TopBlogPosts />
            </LazySection>
        </>
    )
}
export default MainPage
