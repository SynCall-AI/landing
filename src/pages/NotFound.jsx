import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import './MarketingPage.css';

const copy = {
    en: { title: 'Page not found', text: 'The address may have changed or the page may no longer exist.', link: 'Return to the Syncall home page' },
    ru: { title: 'Страница не найдена', text: 'Адрес мог измениться или страница больше не существует.', link: 'Вернуться на главную Syncall' },
    uz: { title: 'Sahifa topilmadi', text: "Manzil o'zgargan yoki sahifa endi mavjud bo'lmasligi mumkin.", link: 'Syncall bosh sahifasiga qaytish' },
};

const NotFound = () => {
    const { language, localePath } = useLanguage();
    const content = copy[language];

    return (
        <main id="main-content" tabIndex="-1" className="marketing-page not-found-page">
            <section className="marketing-hero">
                <p className="section-label">404</p>
                <h1>{content.title}</h1>
                <p>{content.text}</p>
                <Link className="btn-primary" to={localePath('/')}>{content.link}</Link>
            </section>
        </main>
    );
};

export default NotFound;
