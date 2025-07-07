import React from 'react';
import "./Info.css"

const Info = () => {
    return (
        <div className="info-main">
            <div className="info-wr">
                <p className="fir">Clients</p>
                <p className="sec">15</p>
            </div>
            <div className="info-wr">
                <p className="fir">Minutes</p>
                <p className="sec">200,508</p>
            </div>
            <div className="info-wr">
                <p className="fir">Calls</p>
                <p className="sec">2,500,678</p>
            </div>
        </div>
    );
};

export default Info;