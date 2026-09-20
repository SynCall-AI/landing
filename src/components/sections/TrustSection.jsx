import { useLanguage } from '../../context/LanguageContext';
import { getCustomerStories } from '../../content/customerStories';
import './TrustSection.css';

export default function TrustSection({ product }) {
    const { language, t } = useLanguage();
    const stories = getCustomerStories(language).filter((story) => !product || story.productId === product);
    if (!stories.length) return null;
    return (
        <section className="customer-stories" aria-labelledby="customer-stories-heading">
            <div className="customer-stories-inner">
                <span className="section-label">{t('customerStoriesLabel')}</span>
                <h2 id="customer-stories-heading">{t('customerStoriesTitle')}</h2>
                <div className="customer-story-grid">
                    {stories.map((story) => (
                        <article className="customer-story" key={story.id}>
                            <header><h3>{story.company}</h3><span>{story.product}</span></header>
                            <dl><dt>{t('customerBefore')}</dt><dd>{story.before}</dd><dt>{t('customerAfter')}</dt><dd>{story.after}</dd></dl>
                            {story.result && <div className="customer-result"><strong>{story.result.text}</strong><p>{story.result.period} · {story.result.sample}</p><small>{story.result.source}</small></div>}
                            <figure><blockquote><p>“{story.quote}”</p></blockquote><figcaption>{story.name} · {story.role}, {story.company}</figcaption></figure>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
