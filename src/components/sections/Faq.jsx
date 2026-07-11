import { useState } from 'react';
import './Faq.css';
import { useLanguage } from '../../context/LanguageContext';

const Faq = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(0);

    const data = [
        { questionKey: "faqQ1", answerKey: "faqA1" },
        { questionKey: "faqQ2", answerKey: "faqA2" },
        { questionKey: "faqQ3", answerKey: "faqA3" },
        { questionKey: "faqQ4", answerKey: "faqA4" },
        { questionKey: "faqQ5", answerKey: "faqA5" },
        { questionKey: "faqQ6", answerKey: "faqA6" }
    ];

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="faq-left">
                <h2 id="faq-heading">{t('faqTitle')}</h2>
            </div>
            <div className="faq-right">
                {data.map((item, idx) => (
                    <div key={item.questionKey} className="faq-item">
                        <button
                            type="button"
                            className="faq-header"
                            onClick={() => toggleIndex(idx)}
                            aria-expanded={openIndex === idx}
                            aria-controls={`faq-answer-${idx}`}
                        >
                            {t(item.questionKey)}
                            <span aria-hidden="true" className={`faq-arrow ${openIndex === idx ? 'open' : ''}`}>&#x25BE;</span>
                        </button>
                        <div
                            id={`faq-answer-${idx}`}
                            className={`faq-answer ${openIndex === idx ? 'open' : ''}`}
                            hidden={openIndex !== idx}
                        >
                            {t(item.answerKey)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;
