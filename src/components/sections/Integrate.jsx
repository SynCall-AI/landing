import React from 'react';
import "./Integrate.css"

const Integrate = () => {
    // Create array of divs for the circle
    const divs = Array.from({ length: 20 }, (_, i) => i);


    return (
        <div className="inter-main">
            <div className="circle-container">
                {divs.map((index) => (
                    <img
                        src="/al-cover.svg"
                        key={index}
                        className="rotating-div"
                        style={{
                            transform: `rotate(${index * 18}deg) translateY(-650px) rotate(6deg)`
                        }}
                    />
                ))}
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