import "./Clients.css";
import { useLanguage } from '../../context/LanguageContext';

const Clients = () => {
    const { t } = useLanguage();

    const partners = [
        { name: 'Iman', logo: '/partners/iman.svg', width: '150px' },
        { name: 'Poytaxt Parking', logo: '/partners/poytaxt_parking_2.svg', width: '124px', height: '42px', maskSize: '124px auto' },
        { name: 'Unicon', logo: '/partners/unicon_logo.svg', width: '220px' },
        { name: 'Qwatt', logo: '/partners/qwatt_logo.webp', width: '126px' },
        { name: 'Thompson', logo: '/partners/thompson.png', width: '124px' },
    ];

    return (
        <div className="partners-section">
            <div className="partners-container">
                <p className="partners-label">{t('partnersLabel')}</p>
                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <span
                                className="partner-logo"
                                role="img"
                                aria-label={partner.name}
                                style={{
                                    '--partner-logo': `url("${partner.logo}")`,
                                    '--partner-logo-width': partner.width,
                                    '--partner-logo-height': partner.height,
                                    '--partner-logo-mask-size': partner.maskSize,
                                }}
                            />
                        </div>
                    ))}
                    <div className="partner-item partner-more">
                        <span className="partner-name">+10 MORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
