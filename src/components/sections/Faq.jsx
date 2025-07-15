// AgentsSection.jsx
import React, { useState } from 'react';
import './Faq.css';

const data = [
    { title: "Bot training",
      content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.`
    },
    { title: "Real-time issue analytics", content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.` },
    { title: "Run call simulations",content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.` },
    { title: "Draft call flows, ensure compliance", content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.` },
    { title: "Run call simulations, validate edge cases",content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.` },
    { title: "Multilingual support and accent adaptation",content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto consequatur,
          dignissimos ducimus, et eum id laborum nobis nostrum provident quae reiciendis saepe sed sint suscipit. Eum
          fuga odio voluptatibus.` }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="agents-section">
            <div className="agents-left">
                <h1>Everything About<br />Our Agents</h1>
            </div>
            <div className="agents-right">
                {data.map((item, idx) => (
                    <div key={idx} className="accordion-item">
                        <div className="accordion-header" onClick={() => toggleIndex(idx)}>
                            {item.title}
                            <span className={`arrow ${openIndex === idx ? 'open' : ''}`}>▾</span>
                        </div>
                            <div className={`${openIndex === idx && item.content ? 'accordion-content open' : 'accordion-content' } `}>{item.content}</div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;
