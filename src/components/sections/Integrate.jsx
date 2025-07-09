import React, {useEffect, useMemo, useState} from 'react';
import "./Integrate.css"

const Integrate = () => {
    // Create array of divs for the circle
    const divs = useMemo(() => Array.from({ length: 20 }, (_, i) => i), []);

    function shuffle(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const [randomIndexes, setRandomIndexes] = useState([]);

    useEffect(() => {
        const shuffled = shuffle(Array.from({ length: 14 }, (_, i) => i + 1));
        setRandomIndexes(shuffled);
    }, []);


    return (
        <div className="inter-main">
            <div className="circle-container">
                {divs.map((_, index) => {
                    const iconNumber = (index % 13) + 1;
                    return (
                        <img
                            loading="lazy"
                            src={`${iconNumber}.png`}
                            alt="oops..."
                            key={index}
                            className="rotating-div"
                            style={{
                                transform: `rotate(${index * 18 + 6}deg) translateY(-650px)`,
                                borderRadius: "16px",
                            }}
                        />
                    );
                })}

            </div>

            <div className="center-content">
                <h2>Integrate with <br/> any type of telephony</h2>
                <button className="center-button">Contact sales</button>
            </div>
            <div className="fade"></div>
        </div>
    );
};

export default Integrate;