import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "./components/widgets/Navbar.jsx";
import Footer from "./components/sections/Footer.jsx";
import ScrollToTop from "./components/widgets/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Analytics from "./pages/Analytics.jsx";
import Stt from "./pages/Stt.jsx";
import Tts from "./pages/Tts.jsx";
import { LanguageProvider } from './context/LanguageContext.jsx';

function useAppHeight() {
    useEffect(() => {
        const setAppHeight = () => {
            const height = window.innerHeight + 100;
            document.documentElement.style.setProperty('--app-height', `${height}px`);
        };

        setAppHeight();
        window.addEventListener('resize', setAppHeight);
        return () => window.removeEventListener('resize', setAppHeight);
    }, []);
}

function App() {
    useAppHeight();

    return (
        <LanguageProvider>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/voice-agents" element={<Home />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/stt" element={<Stt />} />
                <Route path="/tts" element={<Tts />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </LanguageProvider>
    )
}

export default App
