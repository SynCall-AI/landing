import './How.css';
import { useLanguage } from '../../context/LanguageContext';
export default function How() {
    const { t, localePath } = useLanguage();
    return (
        <section id="how" className="launch-section" aria-labelledby="how-heading">
            <div className="launch-container">
                <h2 id="how-heading">{t('howTitle')}</h2>
                <ol className="launch-steps">
                    {[1, 2, 3].map((step) => (
                        <li key={step}>
                            <span className="launch-number" aria-hidden="true">0{step}</span>
                            <h3>{t(`howStep${step}Title`)}</h3>
                            <p>{t(`howStep${step}Text`)}</p>
                        </li>
                    ))}
                </ol>
                <div className="launch-action"><a className="btn-primary" href={`${localePath('/')}?intent=trial#contact`}>{t('howCta')}</a><p>{t('howNote')}</p></div>
            </div>
        </section>
    );
}
