import React from 'react'
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
import { useEffect } from 'react';

const MainPage = () => {
    useEffect(() => {
        if(window.musicInit) {
            window.musicInit();
        }
    }, []);
    return (
        <>
            <Banner/>
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
                <Advertisements/>
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
                <Advertisements/>
            </LazySection>
            <LazySection>
                <LiveSuggestions/>
            </LazySection>
        </>
    )
}
export default MainPage
