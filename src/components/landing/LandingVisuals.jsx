import { ArrowUpRight, AudioLines, Check, Languages, PhoneIncoming, Play, ShieldCheck, Zap } from 'lucide-react';
import { clients } from '../../content/clients';
import ClientLogo from '../ui/ClientLogo';

export function Ambient({ className = '' }) {
    return <div className={`lp-ambient ${className}`} aria-hidden="true"><i /><i /><i /></div>;
}

// Two speech pulses share the same silhouette in every size and surface.
const voiceBars = Array.from({ length: 49 }, (_, index) => {
    const position = index / 48;
    const envelope = Math.exp(-(((position - .32) / .14) ** 2)) + .8 * Math.exp(-(((position - .7) / .12) ** 2));
    return {
        '--bar-height': `${8 + envelope * (35 + 52 * Math.abs(Math.sin(index * .82)))}%`,
        '--delay': `${index * -.095}s`,
    };
});

export function VoiceWave({ className = '' }) {
    return <div className={`lp-waves ${className}`} aria-hidden="true">{voiceBars.map((style, index) => <i key={index} style={style} />)}</div>;
}

export function VoiceOrb({ className = '' }) {
    return <div className={`lp-voice-orb ${className}`} aria-hidden="true"><span className="lp-orb-shimmer" /><i className="lp-orb-gloss" /></div>;
}

export function ClientMarquee({ copy }) {
    return <div className="lp-logos">
        <div className="lp-logos-heading"><p>{copy.trusted}</p></div>
        <div className="lp-logo-viewport"><div className="lp-logo-track">
            <ul className="lp-logo-set">{clients.map((client) => <li key={client.id}><ClientLogo client={client} /></li>)}</ul>
            <ul className="lp-logo-set lp-logo-duplicates" aria-hidden="true">{clients.map((client) => <li key={client.id}><span className={`client-logo${client.darkBackground ? ' client-logo--on-dark' : ''}`} style={{ '--client-logo-width': `${client.width}px`, '--client-logo-height': `${client.height}px` }}><img src={client.logo} alt="" width={client.width} height={client.height} loading="lazy" /></span></li>)}</ul>
        </div></div>
    </div>;
}

export function StoryVisual({ type, copy }) {
    return <div className={`lp-story-visual lp-story-visual-${type}`} aria-hidden="true">
        <span className="lp-story-visual-label">{type === 'parking' ? 'POYTAXT PARKING' : 'Q.WATT'}</span>
        {type === 'parking' ? <div className="lp-parking-scene"><div className="lp-parking-sign">P</div><div className="lp-parking-spaces">{Array.from({ length: 6 }, (_, index) => <div key={index}><i /></div>)}</div></div> : <div className="lp-powerbank-scene"><div className="lp-powerbank"><Zap size={54} strokeWidth={1.4} /><span /><span /><span /><i /></div><div className="lp-powerbank-shadow" /></div>}
        <div className="lp-story-call"><span className="lp-story-call-icon">{type === 'parking' ? <PhoneIncoming size={20} /> : <Zap size={20} />}</span><div><span>{type === 'parking' ? copy.visualConversation : copy.visualReturned}</span><div className="lp-story-call-bars">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${5 + Math.abs(Math.sin(index * .7)) * 15}px` }} />)}</div></div><Check size={18} /></div>
        <span className="lp-visual-caption">{copy.previewNote}</span>
    </div>;
}

export function HumanSection({ copy }) {
    const icons = [Languages, AudioLines, ShieldCheck];
    return <section className="lp-section lp-human" aria-labelledby="lp-human-title">
        <div className="lp-human-intro"><span className="lp-eyebrow">{copy.humanEyebrow}</span><h2 id="lp-human-title">{copy.humanTitle}</h2><p>{copy.humanIntro}</p><a className="lp-text-link" href="#live-demo">{copy.tryAgent}<ArrowUpRight size={18} /></a></div>
        <div className="lp-human-photo"><img src="/images/syncall-conversation.jpg" alt={copy.humanAlt} width="1536" height="1024" loading="lazy" decoding="async" /><span><Languages size={16} />{copy.languages}</span></div>
        <div className="lp-human-features">{copy.humanFeatures.map(([title, body], index) => { const Icon = icons[index]; return <div key={title}><h3>{title}</h3><p>{body}</p><span><Icon size={24} strokeWidth={1.4} /></span></div>; })}</div>
    </section>;
}

export function ProductVisual({ index, copy }) {
    return <div className={`lp-product-visual lp-product-visual-${index}`} aria-hidden="true">
        {index === 0 ? <div className="lp-analytics-art"><div><span>{copy.tabs[4].panel}</span><i /><i /><i /></div><div className="lp-analytics-bars">{[30, 48, 39, 65, 50, 76, 64, 85, 72, 94].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="lp-analytics-legend">{copy.tabs[4].items.map(item => <span key={item}>{item}</span>)}</div></div> : index === 1 ? <div className="lp-chat-art"><div><span className="lp-mini-orb" />Syncall AI</div><span>{copy.scenarios[0].prompt}</span><span>{copy.visualTranscript}<i /></span></div> : <div className="lp-speech-art"><div>{index === 2 ? <AudioLines size={30} /> : <span>{copy.visualTranscript}</span>}</div><div className="lp-speech-wave">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ height: `${8 + Math.abs(Math.cos(i * .63) * Math.sin(i * .19)) * 45}px` }} />)}</div><div>{index === 2 ? <span>{copy.visualTranscript}</span> : <Play size={20} />}</div></div>}
    </div>;
}
