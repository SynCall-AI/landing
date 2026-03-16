import React from 'react';
import "./Cards.css"

const Cards = ({title, text, className}) => {
    return (
        <div className={`cards-main ${className}`}>
            <div className="cards-title">{title}</div>
            <div className="cards-text">{text}</div>
        </div>
    );
};

export default Cards;