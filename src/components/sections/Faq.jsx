// AgentsSection.jsx
import React, { useState } from 'react';
import './Faq.css';

const data = [
    {
        title: "Do you support both incoming and outgoing calls?",
        content: `Yes, our AI voice agents are designed to handle both inbound and outbound call scenarios. Whether you need to manage customer inquiries, provide support, or conduct outreach campaigns, our platform seamlessly adapts to your operational requirements.`
    },
    {
        title: "Do you integrate with any type of telephony?",
        content: `Absolutely. Our platform is built to integrate with any telephony system, including VoIP providers, PBX systems, and cloud-based solutions. We ensure smooth compatibility with your existing infrastructure, regardless of the provider or technology stack.`
    },
    {
        title: "What languages do you support?",
        content: `We currently support Uzbek, Russian, and English, with natural accent adaptation for each language. Our AI voice agents are trained to understand regional dialects and nuances, ensuring authentic and culturally appropriate conversations with your customers.`
    },
    {
        title: "How many calls can you make simultaneously?",
        content: `There are no limitations on our end—our AI infrastructure is designed to scale infinitely and handle any call volume. The only constraint would be your telephony provider's capacity. Our bots can process unlimited concurrent calls without performance degradation.`
    },
    {
        title: "Do you provide call analytics?",
        content: `Yes, we offer comprehensive real-time call analytics that give you deep insights into your call center operations. You can analyze conversation topics, sentiment, agent performance, customer pain points, and key metrics to continuously improve service quality and business outcomes.`
    },
    {
        title: "Do you have a test period?",
        content: `Yes, we offer a complimentary trial to demonstrate the transformative impact on your call center. We'll train a custom AI agent tailored to your business needs, and you can test it free of charge for up to 1,000 calls. Experience firsthand how our technology can revolutionize your customer engagement.`
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="agents-section">
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
