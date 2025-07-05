
import "./Calllog.css"
import { motion } from "framer-motion";
import { useWindowScroll } from "@uidotdev/usehooks";
import {useEffect, useState} from "react";


const Calllog = () => {
    const [{ x, y }, scrollTo] = useWindowScroll();
    const [p, setp] = useState(0)
    let startScroll, endScroll

    useEffect(()=>{
        const section = document.querySelector('.call-main');
        startScroll = section.offsetTop - window.innerHeight; // when it enters the viewport
        endScroll = section.offsetTop + section.offsetHeight;
        setp( Math.min(Math.max((y - startScroll) / (endScroll - startScroll), 0), 1))

    }, [y])

    return (
        <div className="call-main">
            <motion.div className="call-bg" whileInView={{ backgroundPositionY: `${80-p*70 }%`}} transition={{ duration: 0 }}>
                <div className="call-player">
                    <div className="player-cover">
                        <img src="/al-cover.svg" alt=""/>
                    </div>
                    <div className="player-controls">
                        
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Calllog;