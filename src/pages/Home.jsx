import Hero from "../components/sections/Hero.jsx";
import ProductsNav from "../components/sections/ProductsNav.jsx";
import Clients from "../components/sections/Clients.jsx";
import Calllog from "../components/sections/Calllog.jsx";
import Features from "../components/sections/Features.jsx";
import Numbers from "../components/sections/Numbers.jsx";
import TalkBot from "../components/sections/TalkBot.jsx";
import How from "../components/sections/How.jsx";
import Faq from "../components/sections/Faq.jsx";

// Home = the Voice Agents flagship landing. The products strip sits right under
// the hero so visitors discover Analytics / STT / TTS, while the rest of the
// page stays focused on Voice Agents.
const Home = () => {
    return (
        <>
            <Hero />
            <ProductsNav active="voice" />
            <Clients />
            <Calllog />
            <Features />
            <Numbers />
            <TalkBot />
            <How />
            <Faq />
        </>
    );
};

export default Home;
