import React, { useEffect, useState } from 'react';
import "./Info.css";
import NumberFlow from '@number-flow/react'


const Info = () => {
    const [minutes, setMinutes] = useState(200508);
    const [calls, setCalls] = useState(2500678);

    useEffect(() => {
        // Calls: +1 every 2 seconds
        const callsInterval = setInterval(() => {
            setCalls(prev => prev + 1);
        }, 2000);

        // Minutes: +1 to +3 every 4–6 seconds
        const updateMinutes = () => {
            const delay = Math.random() * 2000 + 4000; // 4000 to 6000 ms
            setTimeout(() => {
                const increment = Math.floor(Math.random() * 3) + 1;
                setMinutes(prev => prev + increment);
                updateMinutes(); // re-call for next timeout
            }, delay);
        };
        updateMinutes();

        return () => {
            clearInterval(callsInterval);
        };
    }, []);

    return (
        <div className="info-main">
            <div className="info-wr a">
                <p className="fir">Clients</p>
                <p className="sec">15</p>
            </div>
            <div className="info-wr b">
                <p className="fir">Minutes</p>
                <NumberFlow className="sec" value={minutes} />
            </div>
            <div className="info-wr c">
                <p className="fir">Calls</p>
                <NumberFlow className="sec" value={calls} />
            </div>
        </div>
    );
};

export default Info;
