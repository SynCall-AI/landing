import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Pilot.css';
export default function Pilot() {
    const { t, localePath } = useLanguage();
    return (
        <section className="pilot-section" aria-labelledby="pilot-heading">
            <div className="pilot-inner">
                <div><span className="section-label">{t('pilotLabel')}</span><h2 id="pilot-heading">{t('pilotTitle')}</h2><p>{t('pilotBody')}</p></div>
                <div className="pilot-actions"><a className="btn-primary" href={`${localePath('/')}?intent=trial#contact`}>{t('ctaTrial')}</a><Link to={localePath('/pricing')}>{t('pilotPricing')}</Link></div>
                <p className="pilot-note">{t('pilotNote')}</p>
            </div>
        </section>
    );
}
