import "./Calllog.css"
import { motion } from "framer-motion";
import { useWindowScroll } from "@uidotdev/usehooks";
import {useEffect, useState, useRef, use} from "react";
import {FaCirclePause, FaCirclePlay} from "react-icons/fa6";


const Calllog = () => {
    const [{ x, y }, scrollTo] = useWindowScroll();
    const [p, setp] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)

    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    let startScroll, endScroll;

    useEffect(() => {
        const section = document.querySelector('.call-main');
        startScroll = section.offsetTop - window.innerHeight;
        endScroll = section.offsetTop + section.offsetHeight/2;
        setp(Math.min(Math.max((y - startScroll) / (endScroll - startScroll), 0), 1));
    }, [y]);

    // Initialize audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            if (!isDragging) {
                setCurrentTime(audio.currentTime);
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const audio = audioRef.current;
        const progressBar = progressBarRef.current;
        if (!audio || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const newProgress = (clickX / rect.width) * 100;
        const newTime = (clickX / rect.width) * duration;

        setProgress(newProgress);
        setCurrentTime(newTime);
        audio.currentTime = newTime;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add global mouse event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, duration]);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="call-main">
            <motion.div
                className="call-bg"
                whileInView={ width < 500 ? {backgroundPositionY: `${p * 120}%`} : {backgroundPositionY: `${10 + p * 60}%`}}
                transition={{duration: 0}}
            >
                {width < 500 && <div className="l-t">Take a listen to <br/> one of thousands of our calls</div>}
                {width > 500 && <div className="call-player">
                    <div className="player-cover">
                        <img src="/al-cover.svg" alt=""/>
                    </div>
                    <div className="player-controls">
                        <div className="l-t">Take a listen to one of thousands of our calls</div>
                        <div className="p-c-d">
                            <div
                                className="progress-bar"
                                ref={progressBarRef}
                            >
                                <div
                                    className="progress-fill"
                                    style={{width: `${progress}%`}}
                                ></div>
                                <div
                                    className="progress-handle"
                                    style={{left: `${progress}%`}}
                                    onMouseDown={handleMouseDown}
                                ></div>
                            </div>
                            <div className="time-elapsed">
                                {formatTime(currentTime)}
                            </div>
                            <div
                                className={`play-button ${isPlaying ? 'playing' : ''}`}
                                onClick={togglePlay}
                            >
                                {isPlaying ? <FaCirclePause className="ico"/>
                                    : <FaCirclePlay className="ico"/>}
                            </div>
                        </div>
                    </div>
                </div>}

                {/* Audio element - replace with your actual audio file path */}
                <audio
                    ref={audioRef}
                    src="/Gap%20Senda%20Music.mp3"
                    preload="metadata"
                />
            </motion.div>
            {width < 500 && <div className="call-player">
            <div className="player-cover">
                    <img src="/al-cover.svg" alt=""/>
                </div>
                <div className="player-controls">
                    <div className="p-c-d">
                        <div
                            className="progress-bar"
                            ref={progressBarRef}
                        >
                            <div
                                className="progress-fill"
                                style={{width: `${progress}%`}}
                            ></div>
                            <div
                                className="progress-handle"
                                style={{left: `${progress}%`}}
                                onMouseDown={handleMouseDown}
                            ></div>
                        </div>
                        <div className="time-elapsed">
                            {formatTime(currentTime)}
                        </div>
                        <div
                            className={`play-button ${isPlaying ? 'playing' : ''}`}
                            onClick={togglePlay}
                        >
                            {isPlaying ? <FaCirclePause className="ico"/>
                                : <FaCirclePlay className="ico"/>}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Calllog;