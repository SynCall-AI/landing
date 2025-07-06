
import './App.css'
import Navbar from "./components/widgets/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Strenghts from "./components/sections/Strenghts.jsx";
import Calllog from "./components/sections/Calllog.jsx";
import How from "./components/sections/How.jsx";
import Integrate from "./components/sections/Integrate.jsx";

function App() {

  return (
    <>
        <Navbar/>
        <Hero/>
        <About/>
        <Strenghts/>
        <Calllog/>
        <How/>
        <Integrate/>
    </>
  )
}

export default App
