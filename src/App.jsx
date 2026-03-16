
import './App.css'
import Navbar from "./components/widgets/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import TalkBot from "./components/sections/TalkBot.jsx";
import Clients from "./components/sections/Clients.jsx";
import Calllog from "./components/sections/Calllog.jsx";
import Features from "./components/sections/Features.jsx";
import Numbers from "./components/sections/Numbers.jsx";
import How from "./components/sections/How.jsx";
import Faq from "./components/sections/Faq.jsx";
import Footer from "./components/sections/Footer.jsx";
import { useEffect } from 'react';
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
            <Navbar />
            <Hero />
            <TalkBot />
            <Clients />
            <Calllog />
            <Features />
            <Numbers />
            <How />
            <Faq />
            <Footer />
        </LanguageProvider>
    )
}

export default App
