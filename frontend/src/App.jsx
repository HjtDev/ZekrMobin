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
import Profile from './Pages/Profile.jsx';
import History from './Pages/History.jsx';
import { ToastContainer, Bounce } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LikedPosts from "./Pages/LikedPosts.jsx";
import PostList from "./Pages/PostList.jsx";
import ScrollToTopOnRouteChange from './assets/js/scrollToTopOnRouteChange.jsx';


function App() {
    return (
        <Router>
            <ScrollToTopOnRouteChange />
           <Loading />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                rtl
                draggable={false}
                theme="dark"
                transition={Bounce}
            />
            <div className="ms_main_wrapper">
                <Sidebar/>
                <div className="ms_content_wrapper padder_top80">
                    <Header />
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/history/' element={<History />} />
                        <Route path='/profile/liked/' element={<LikedPosts />} />
                        <Route path='/posts/' element={<PostList />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
                {/*<Player />*/}
            </div>
            {/*<PlayerModals />*/}
            <LanguagePopup />
            <RegisterPopups />
        </Router>
    )
}

export default App
