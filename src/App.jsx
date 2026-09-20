import { createElement, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/widgets/Navbar.jsx';
import Footer from './components/sections/Footer.jsx';
import ScrollToTop from './components/widgets/ScrollToTop.jsx';
import SiteSeo from './components/seo/SiteSeo.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { localizePath, SUPPORTED_LOCALES } from './lib/i18n.js';

const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Chatbots = lazy(() => import('./pages/Chatbots.jsx'));
const Stt = lazy(() => import('./pages/Stt.jsx'));
const Tts = lazy(() => import('./pages/Tts.jsx'));
const MarketingPage = lazy(() => import('./pages/MarketingPage.jsx'));
const Cabinet = lazy(() => import('./pages/Cabinet.jsx'));

const productRoutes = [
    ['/', Home],
    ['/voice-agents', Home],
    ['/analytics', Analytics],
    ['/chatbots', Chatbots],
    ['/stt', Stt],
    ['/tts', Tts],
];

const marketingPaths = [
    '/features',
    '/use-cases',
    '/use-cases/banking',
    '/use-cases/debt-collection',
    '/use-cases/appointment-reminders',
    '/use-cases/surveys',
    '/use-cases/lead-qualification',
    '/integrations',
    '/pricing',
    '/about',
    '/case-studies',
];

function useAppHeight() {
    useEffect(() => {
        const setAppHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
        };
        setAppHeight();
        window.addEventListener('resize', setAppHeight);
        return () => window.removeEventListener('resize', setAppHeight);
    }, []);
}

const AppShell = () => {
    const { t, basePath } = useLanguage();
    const isCabinet = basePath === '/cabinet' || basePath.startsWith('/cabinet/');

    return (
        <>
            <a className="skip-link" href="#main-content">{t('skipToContent')}</a>
            <SiteSeo />
            <ScrollToTop />
            {!isCabinet && <Navbar />}
            <Suspense fallback={<div className="route-loading" role="status">{t('loading')}</div>}>
                <Routes>
                    {SUPPORTED_LOCALES.flatMap((locale) => productRoutes.map(([basePath, Component]) => (
                        <Route
                            key={`${locale}:${basePath}`}
                            path={localizePath(basePath, locale)}
                            element={createElement(Component)}
                        />
                    )))}

                    {SUPPORTED_LOCALES.flatMap((locale) => marketingPaths.map((basePath) => (
                        <Route
                            key={`${locale}:${basePath}`}
                            path={localizePath(basePath, locale)}
                            element={(
                                <MarketingPage
                                    path={basePath}
                                    locale={locale}
                                    demoHref={`${localizePath('/', locale)}?intent=demo#contact`}
                                    trialHref={`${localizePath('/', locale)}?intent=trial#contact`}
                                />
                            )}
                        />
                    )))}

                    {SUPPORTED_LOCALES.map((locale) => (
                        <Route
                            key={`${locale}:/cabinet`}
                            path={`${localizePath('/cabinet', locale)}/*`}
                            element={<Cabinet />}
                        />
                    ))}

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            {!isCabinet && <Footer />}
        </>
    );
};

function App() {
    useAppHeight();

    return (
        <LanguageProvider>
            <AppShell />
        </LanguageProvider>
    );
}

export default App;
