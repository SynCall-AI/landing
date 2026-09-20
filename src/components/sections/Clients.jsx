import "./Clients.css";
import { useLanguage } from '../../context/LanguageContext';
import { clients } from '../../content/clients';
import ClientLogo from '../ui/ClientLogo';

const Clients = () => {
    const { t } = useLanguage();

    return (
        <div className="partners-section">
            <div className="partners-container">
                <p className="partners-label">{t('partnersLabel')}</p>
                <ul className="partners-grid">
                    {clients.map((client) => (
                        <li key={client.id} className="partner-item">
                            <ClientLogo client={client} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Clients;
