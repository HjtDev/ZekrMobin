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
import {useEffect} from "react";

const MainPage = () => {
    useEffect(() => {
        if(window.musicInit) {
            window.musicInit();
        }
    }, []);
    return (
        <>
            <Banner />
            <RecentPosts/>
            <WeeklyTop/>
            <TopArtists/>
            <Advertisements/>
            <NewReleases/>
            <TopPosts/>
            <TopCategories/>
            <Advertisements/>
            <LiveSuggestions/>
        </>
    )
}
export default MainPage
