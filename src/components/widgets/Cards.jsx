import React from 'react';
import "./Cards.css"

const Cards = ({title, days, text, className}) => {
    return (
        <div className={`cards-main ${className}`}>
            <div className="cards-title">{title}</div>
            <div className="cards-text">{text}</div>
            <div className="cards-days">({days[0]}-{days[1]} days)</div>
        </div>
    );
};

export default Cards;