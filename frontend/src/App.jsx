import './App.css'
import './components/Sidebar.jsx'
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Player from './components/Player.jsx'
import MainPage from './Pages/MainPage.jsx'
import PlayerModals from './components/PlayerModals.jsx'
import LanguagePopup from './components/LanguagePopup.jsx';
import RegisterPopups from './components/RegisterPopups.jsx';
import Loading from './components/Loading.jsx'
import NotFound from './Pages/NotFound.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
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
