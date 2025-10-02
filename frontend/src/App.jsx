import './App.css'
import './components/Sidebar/Sidebar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Player from './components/Footer/Player.jsx'
import MainPage from './Pages/MainPage.jsx'
import PlayerModals from './components/Footer/PlayerModals.jsx'
import LanguagePopup from './components/Header/LanguagePopup.jsx';
import RegisterPopups from './components/Header/RegisterPopups.jsx';
import Loading from './components/Loading.jsx'
import NotFound from './Pages/NotFound.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect} from "react";
import { refreshCSRF } from './api/api.js'


function App() {
    useEffect(() => {
        refreshCSRF();
    }, []);
    return (
        <Router>
           <Loading />
            <div className="ms_main_wrapper">
                <Sidebar/>
                <div className="ms_content_wrapper padder_top80">
                    <Header />
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
                <Player />
            </div>
            <PlayerModals />
            <LanguagePopup />
            <RegisterPopups />
        </Router>
    )
}

export default App
