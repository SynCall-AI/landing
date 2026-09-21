import { Database, Headphones, Languages, MessageCircle, Network, Server, ShieldCheck, UserRound, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { productPageContent } from '../content/productPageContent';
import { ProductIntro, ProductSwitcher, ProductHeading, ProductFeatures, ProductReveal, ProductDeployment, ProductCta } from '../components/products/ProductLayout';
import { ChatbotConversation } from '../components/products/ProductVisuals';

const features = [
    { icon: Server, titleKey: 'cbCap1Title', descKey: 'cbCap1Desc' },
    { icon: ShieldCheck, titleKey: 'cbCap2Title', descKey: 'cbCap2Desc' },
    { icon: Network, titleKey: 'cbCap3Title', descKey: 'cbCap3Desc' },
    { icon: Database, titleKey: 'cbCap4Title', descKey: 'cbCap4Desc' },
    { icon: Languages, titleKey: 'cbCap5Title', descKey: 'cbCap5Desc' },
    { icon: UserRound, titleKey: 'cbCap6Title', descKey: 'cbCap6Desc' },
];
const useIcons = [Headphones, MessageCircle, Users];

export default function Chatbots() {
    const { t, language, localePath } = useLanguage();
    const copy = productPageContent[language] || productPageContent.ru;
    const contactHref = `${localePath('/')}?intent=trial&product=chatbots#contact`;
    return <main id="main-content" tabIndex="-1" className="lp pp pp-chatbots">
        <ProductIntro product="chatbots" copy={copy} title={copy.chatTitle} intro={copy.chatIntro} cta={copy.chatCta} href={contactHref} secondary={copy.chatPreview} secondaryHref="#chatbot-capabilities"><ChatbotConversation copy={copy} /></ProductIntro>
        <ProductSwitcher product="chatbots" copy={copy} />
        <section className="pp-section" id="chatbot-capabilities" aria-labelledby="chatbot-capabilities-title">
            <ProductHeading eyebrow={t('cbCapsLabel')} title={copy.chatCapabilities} intro={copy.chatFoot} id="chatbot-capabilities-title" />
            <ProductFeatures features={features} t={t} />
        </section>
        <section className="pp-use-section" aria-labelledby="pp-use-title"><div className="pp-section">
            <ProductHeading eyebrow={t('cbUseLabel')} title={t('cbUseTitle')} id="pp-use-title" />
            <div className="pp-use-grid">{useIcons.map((Icon, index) => <ProductReveal className="pp-use-card" key={index}><div className={`pp-use-art pp-use-art-${index}`} aria-hidden="true"><span /><span /><span /><Icon size={34} strokeWidth={1.3} /></div><span className="lp-eyebrow">0{index + 1}</span><h3>{t(`cbUse${index + 1}Title`)}</h3><p>{t(`cbUse${index + 1}Desc`)}</p></ProductReveal>)}</div>
        </div></section>
        <ProductDeployment copy={copy} intro={copy.chatDeploymentText}>{[
            [t('cbDeployCloud1'), t('cbDeployCloud2'), t('cbDeployCloud3')],
            [t('cbDeployOnprem1'), t('cbDeployOnprem2'), t('cbDeployOnprem3')],
        ]}</ProductDeployment>
        <ProductCta copy={copy} title={copy.chatEndTitle} intro={copy.chatEndText} cta={copy.chatCta} href={contactHref} />
    </main>;
}
