import { createElement, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, AudioLines, BarChart3, Check, Cloud, Languages, MessageCircle, Server, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Ambient } from '../landing/LandingVisuals';
import '../landing/LandingPage.css';
import './ProductPages.css';

export function ProductReveal({ children, className = '' }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const element = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { element.removeAttribute('data-waiting'); observer.disconnect(); }
        }, { threshold: .06 });
        element.setAttribute('data-waiting', '');
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={`pp-reveal ${className}`}>{children}</div>;
}

export function ProductIntro({ product, copy, title, intro, cta, href, secondary, secondaryHref, children }) {
    return <header className="pp-hero">
        <Ambient />
        <div className="pp-hero-inner">
            <div className="pp-hero-copy">
                <span className="pp-eyebrow">SYNCALL · {copy.products[product === 'analytics' ? 1 : 2]}</span>
                <h1>{title}</h1><p>{intro}</p>
                <div className="pp-actions"><a href={href} className="lp-button lp-hero-primary">{cta}<ArrowUpRight size={18} /></a><a href={secondaryHref} className="pp-hero-link">{secondary}<ArrowRight size={16} /></a></div>
                <div className="pp-hero-notes"><span><Languages size={15} />{copy.languages}</span><span><Users size={15} />{copy.teamSetup}</span></div>
            </div>
            <div className="pp-hero-visual">{children}</div>
        </div>
    </header>;
}

export function ProductSwitcher({ product, copy }) {
    const { localePath } = useLanguage();
    const icons = [AudioLines, BarChart3, MessageCircle];
    return <nav className="pp-switcher" aria-label={copy.ecosystem}>
        <span>{copy.ecosystem}</span>
        <div>{['/', '/analytics', '/chatbots'].map((path, index) => {
            const Icon = icons[index];
            return <Link key={path} to={localePath(path)} aria-current={path === `/${product}` ? 'page' : undefined}><Icon size={19} /><span>{copy.products[index]}</span><ArrowUpRight size={15} /></Link>;
        })}</div>
    </nav>;
}

export function ProductHeading({ eyebrow, title, intro, id }) {
    return <ProductReveal className="pp-heading"><div><span className="lp-eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2></div>{intro && <p>{intro}</p>}</ProductReveal>;
}

export function ProductFeatures({ features, t }) {
    return <div className="pp-features">{features.map(({ icon: Icon, titleKey, descKey }, index) => <ProductReveal key={titleKey} className="pp-feature">
        <span className="pp-feature-top">{createElement(Icon, { size: 25, strokeWidth: 1.4 })}<span>0{index + 1}</span></span>
        <h3>{t(titleKey)}</h3><p>{t(descKey)}</p>
    </ProductReveal>)}</div>;
}

export function ProductDeployment({ copy, intro, children }) {
    return <section className="pp-section pp-deployment" aria-labelledby="pp-deployment-title">
        <ProductHeading eyebrow="CLOUD / ON-PREMISE" title={copy.deploymentTitle} intro={intro || copy.deploymentText} id="pp-deployment-title" />
        <div className="pp-deployment-grid">
            {[{ Icon: Cloud, name: copy.cloud, body: copy.cloudText }, { Icon: Server, name: copy.onprem, body: copy.onpremText }].map(({ Icon, name, body }, index) => <ProductReveal className={`pp-deployment-card pp-deployment-${index}`} key={name}>
                <div className="pp-server-art" aria-hidden="true">{index === 0 ? <><Cloud /><span /><span /><span /></> : <><i /><i /><i /></>}</div>
                {createElement(Icon, { size: 23, strokeWidth: 1.4 })}<h3>{name}</h3><p>{body}</p>
                {children?.[index] && <ul>{children[index].map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>}
            </ProductReveal>)}
        </div>
    </section>;
}

export function ProductCta({ copy, title, intro, cta, href }) {
    return <section className="pp-cta" aria-labelledby="pp-cta-title"><Ambient /><div><span className="pp-eyebrow">SYNCALL AI</span><h2 id="pp-cta-title">{title}</h2></div><div><p>{intro}</p><a className="lp-button lp-hero-primary" href={href}>{cta}<ArrowUpRight size={18} /></a><span className="pp-cta-note"><Users size={15} />{copy.teamSetup}</span></div></section>;
}
