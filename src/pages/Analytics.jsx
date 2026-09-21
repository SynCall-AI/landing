import { BarChart3, BookOpen, Eye, FileCheck2, MessageSquareWarning, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { productPageContent } from '../content/productPageContent';
import { ProductIntro, ProductSwitcher, ProductHeading, ProductFeatures, ProductReveal, ProductDeployment, ProductCta } from '../components/products/ProductLayout';
import { AnalyticsSignal, AnalyticsReport } from '../components/products/ProductVisuals';
import TrustSection from '../components/sections/TrustSection';

const features = [
    { icon: FileCheck2, titleKey: 'anProb1Title', descKey: 'anProb1Desc' },
    { icon: Eye, titleKey: 'anProb2Title', descKey: 'anProb2Desc' },
    { icon: UserCheck, titleKey: 'anProb3Title', descKey: 'anProb3Desc' },
    { icon: BookOpen, titleKey: 'anProb4Title', descKey: 'anProb4Desc' },
    { icon: MessageSquareWarning, titleKey: 'anProb5Title', descKey: 'anProb5Desc' },
    { icon: BarChart3, titleKey: 'anProb6Title', descKey: 'anProb6Desc' },
];

export default function Analytics() {
    const { t, language, localePath } = useLanguage();
    const copy = productPageContent[language] || productPageContent.ru;
    const contactHref = `${localePath('/')}?intent=trial&product=analytics#contact`;
    return <main id="main-content" tabIndex="-1" className="lp pp pp-analytics">
        <ProductIntro product="analytics" copy={copy} title={copy.analyticsTitle} intro={copy.analyticsIntro} cta={copy.analyticsCta} href={contactHref} secondary={copy.analyticsPreview} secondaryHref="#example-report"><AnalyticsSignal copy={copy} /></ProductIntro>
        <ProductSwitcher product="analytics" copy={copy} />
        <section className="pp-section" id="analytics-capabilities" aria-labelledby="analytics-capabilities-title">
            <ProductHeading eyebrow={t('anProblemLabel')} title={copy.analyticsCapabilities} id="analytics-capabilities-title" />
            <ProductFeatures features={features} t={t} />
        </section>
        <section className="pp-report-section" id="example-report" aria-labelledby="pp-report-title">
            <div className="pp-report-inner"><ProductHeading eyebrow={copy.reportEyebrow} title={copy.reportTitle} intro={copy.reportIntro} id="pp-report-title" /><ProductReveal><AnalyticsReport copy={copy} t={t} /></ProductReveal></div>
        </section>
        <section className="pp-section pp-pipeline-section" aria-labelledby="pp-pipeline-title">
            <ProductHeading eyebrow={t('anPipeLabel')} title={t('anPipeTitle')} intro={t('anPipeSubtitle')} id="pp-pipeline-title" />
            <ol className="pp-pipeline">{[1, 2, 3, 4, 5].map(step => <li key={step}><ProductReveal><span className="pp-step-number">0{step}</span><h3>{t(`anPipe${step}Title`)}</h3><p>{t(`anPipe${step}Desc`)}</p></ProductReveal></li>)}</ol>
        </section>
        <TrustSection product="analytics" />
        <ProductDeployment copy={copy} />
        <ProductCta copy={copy} title={copy.analyticsEndTitle} intro={t('anCtaSubtitle')} cta={copy.analyticsCta} href={contactHref} />
    </main>;
}
