import { useId, useState } from 'react';
import { ArrowRight, AudioLines, BarChart3, Check, CheckCheck, FileText, MessageCircle, RotateCcw } from 'lucide-react';
import { VoiceOrb } from '../landing/LandingVisuals';

const qualityScores = [96, 88, 91, 84];

export function AnalyticsSignal({ copy }) {
    return <figure className="pp-signal-scene">
        <div className="pp-signal-input"><span className="pp-signal-icon"><AudioLines size={23} /></span><div><strong>{copy.signalInput}</strong><span>O‘zbekcha · Русский</span></div><i /><i /><i /></div>
        <div className="pp-signal-connector" aria-hidden="true"><span /></div>
        <div className="pp-signal-report"><div className="pp-signal-toolbar"><span><BarChart3 size={18} />Syncall Analytics</span><span className="pp-window-dots" aria-hidden="true"><i /><i /><i /></span></div>
            <div className="pp-signal-score"><div><span>{copy.quality}</span><strong>92<small>/100</small></strong></div><span className="pp-score-ring" aria-hidden="true"><Check size={26} /></span></div>
            <div className="pp-signal-bars" aria-hidden="true">{[32, 52, 42, 68, 58, 80, 69, 94, 82, 98, 86, 92].map((value, index) => <span key={index} style={{ '--height': `${value}%`, '--delay': `${index * .07}s` }} />)}</div>
            <div className="pp-signal-result"><CheckCheck size={17} /><span>{copy.signalOutput}</span><ArrowRight size={16} /></div>
        </div>
        <figcaption>{copy.reportLabel}</figcaption>
    </figure>;
}

export function AnalyticsReport({ copy, t }) {
    const [selected, setSelected] = useState(0);
    const uid = useId();
    return <div className="pp-report">
        <div className="pp-report-toolbar"><span><BarChart3 size={19} />Syncall Analytics</span><span>{copy.reportLabel}</span></div>
        <div className="pp-report-tabs" role="tablist" aria-label={copy.reportLabel}>{copy.reportTabs.map((tab, index) => <button type="button" key={tab} id={`${uid}-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls={`${uid}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % 3;
            if (event.key === 'ArrowLeft') next = (index + 2) % 3;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = 2;
            if (next !== undefined) { event.preventDefault(); setSelected(next); document.getElementById(`${uid}-tab-${next}`)?.focus(); }
        }}>{tab}</button>)}</div>
        <div className="pp-report-panel" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${selected}`} tabIndex="0">
            <div className="pp-report-view" key={selected}>
                {selected === 0 ? <div className="pp-quality-view"><div className="pp-quality-score"><span>{copy.quality}</span><strong>92<span>{copy.scoreUnit}</span></strong><span className="pp-report-badge"><Check size={14} />{t('anScoreTagOk')}</span></div><div className="pp-quality-rows">{qualityScores.map((value, index) => <div key={value}><div><span>{t(`anScoreRow${index + 1}`)}</span><strong>{value}%</strong></div><span className="pp-quality-track"><i style={{ '--score': `${value}%`, '--delay': `${index * .12}s` }} /></span></div>)}</div></div>
                    : selected === 1 ? <div className="pp-topics-view"><div><MessageCircle size={31} strokeWidth={1.4} /><h3>{copy.topicNote}</h3></div><ol>{copy.topics.map((topic, index) => <li key={topic}><span>0{index + 1}</span><strong>{topic}</strong><FileText size={19} /></li>)}</ol></div>
                        : <div className="pp-outcome-view"><div><span className="pp-outcome-check"><Check size={25} /></span><h3>{copy.outcome}</h3><p>{copy.outcomeText}</p></div><ul>{copy.outcomeChecks.map(item => <li key={item}><CheckCheck size={20} />{item}</li>)}</ul></div>}
            </div>
        </div>
    </div>;
}

export function ChatbotConversation({ copy }) {
    const [replay, setReplay] = useState(0);
    return <figure className="pp-chat-scene">
        <div className="pp-chat-window">
            <div className="pp-chat-toolbar"><VoiceOrb /><div><strong>Syncall AI</strong><span>{copy.chatStatus}</span></div><span className="pp-chat-example">{copy.chatExample}</span></div>
            <ol className="pp-chat-messages" key={replay}>{copy.chatMessages.map((message, index) => <li key={message} className={index % 2 === 0 ? 'pp-chat-customer' : 'pp-chat-agent'} style={{ '--delay': `${index * .65}s` }}>{message}{index % 2 === 1 && <CheckCheck size={13} aria-hidden="true" />}</li>)}</ol>
            <div className="pp-chat-footer"><span>{copy.chatExample}</span><button type="button" onClick={() => setReplay(value => value + 1)}><RotateCcw size={14} />{copy.replay}</button></div>
        </div>
        <figcaption>{copy.channels.map(channel => <span key={channel}><span />{channel}</span>)}</figcaption>
    </figure>;
}
