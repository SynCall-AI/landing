import { useState } from 'react';
import { PhoneOutgoing, Wallet, PhoneIncoming, Database, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Features.css';

const ICONS = [PhoneOutgoing, Wallet, PhoneIncoming];
export default function Features() {
    const { t } = useLanguage();
    const [selected, setSelected] = useState(1);
    const Icon = ICONS[selected - 1];
    return (
        <section className="examples-section" id="capabilities" aria-labelledby="capabilities-heading">
            <div className="examples-container">
                <header className="examples-heading"><h2 id="capabilities-heading">{t('featuresTitle')}</h2><p>{t('examplesIntro')}</p></header>
                <div className="examples-layout">
                    <div className="example-choices" role="group" aria-label={t('featuresTitle')}>
                        {[1, 2, 3].map((number) => (
                            <button key={number} type="button" className={`example-choice ${number === selected ? 'is-selected' : ''}`} aria-pressed={number === selected} aria-controls="conversation-example" onClick={() => setSelected(number)}>
                                <span className="example-number">0{number}</span>
                                <span><strong>{t(`example${number}Title`)}</strong><span className="example-description">{t(`example${number}Body`)}</span></span>
                            </button>
                        ))}
                    </div>
                    <div className="example-conversation" id="conversation-example" aria-live="polite" aria-atomic="true">
                        <div className="example-conversation-head"><span><Icon size={18} aria-hidden="true" />{t(`example${selected}Title`)}</span><small>{t('exampleLabel')}</small></div>
                        <div className="example-messages">
                            <p className="example-context">{t(`example${selected}Context`)}</p>
                            <div className="example-message customer"><span>{t('exampleCustomer')}</span><p>{t(`example${selected}Question`)}</p></div>
                            <div className="example-lookup">
                                <Database size={16} aria-hidden="true" />
                                <div><strong>{t('exampleLookupLabel')}</strong><p>{t(`example${selected}Lookup`)}</p></div>
                            </div>
                            <div className="example-message assistant"><span>Syncall</span><p>{t(`example${selected}Answer`)}</p></div>
                            <div className="example-message customer"><span>{t('exampleCustomer')}</span><p>{t(`example${selected}Reply`)}</p></div>
                        </div>
                        <p className="example-result"><Check size={16} aria-hidden="true" />{t(`example${selected}Result`)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
