import "./Calllog.css"
import { useState } from "react";
import { useLanguage } from '../../context/LanguageContext';
import {
    AudioPlayerProvider,
    AudioPlayerButton,
    AudioPlayerProgress,
    AudioPlayerTime,
    AudioPlayerDuration,
    useAudioPlayer,
} from "../ui/AudioPlayer";

const UZ_FLAG = '\u{1F1FA}\u{1F1FF}';

// Two production demo calls, both in Uzbek: one incoming, one outgoing.
const demoTracks = [
    { id: 'incoming-uz', labelKey: 'callIncoming', flag: UZ_FLAG, langLabel: "O'zbekcha", src: '/poytaxt_incoming_uz.wav', direction: 'incoming' },
    { id: 'outgoing-uz', labelKey: 'callOutgoing', flag: UZ_FLAG, langLabel: "O'zbekcha", src: '/outgoing_uz.wav', direction: 'outgoing' },
];

// Incoming arrow points into the corner; outgoing arrow points out of it.
function DirectionIcon({ direction }) {
    return (
        <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
            {direction === 'incoming' ? (
                <path d="M2 2 L7 7 M7 7 L7 3 M7 7 L3 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
                <path d="M10 2 L5 7 M5 7 L5 3 M5 7 L9 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
        </svg>
    );
}

function DemoPlayerInner() {
    const { t } = useLanguage();
    const [selectedTrack, setSelectedTrack] = useState(demoTracks[0]);
    const player = useAudioPlayer();

    const handleTrackChange = (track) => {
        if (track.id === selectedTrack.id) {
            player.isPlaying ? player.pause() : player.play(track);
            return;
        }
        setSelectedTrack(track);
        player.play(track);
    };

    return (
        <div className="demo-player-card">
            <div className="demo-player">
                <div className="demo-cover">
                    <img src="/al-cover.svg" alt="Syncall AI" />
                    <div className="demo-cover-glow"></div>
                </div>

                <div className="demo-controls">
                    <div className="demo-track-info">
                        <span className="demo-track-name">
                            <span className={`demo-incoming-badge demo-incoming-badge-lg ${selectedTrack.direction}`} aria-hidden="true">
                                <DirectionIcon direction={selectedTrack.direction} />
                            </span>
                            {t(selectedTrack.labelKey)}
                        </span>
                        <span className="demo-track-lang">{selectedTrack.flag} {selectedTrack.langLabel}</span>
                    </div>

                    <div className="demo-progress-row">
                        <AudioPlayerTime />
                        <AudioPlayerProgress />
                        <AudioPlayerDuration />
                    </div>

                    <div className="demo-play-row">
                        <AudioPlayerButton item={selectedTrack} />
                    </div>
                </div>
            </div>

            <div className="demo-tracklist">
                <ul className="demo-track-group-list" role="list">
                    {demoTracks.map((track) => {
                        const isActive = selectedTrack.id === track.id;
                        const isPlaying = isActive && player.isPlaying;
                        return (
                            <li key={track.id}>
                                <button
                                    type="button"
                                    className={`demo-track-item ${isActive ? 'active' : ''}`}
                                    onClick={() => handleTrackChange(track)}
                                    aria-label={`${isPlaying ? 'Pause' : 'Play'} ${t(track.labelKey)}`}
                                >
                                    <span className={`demo-track-icon ${isPlaying ? 'playing' : ''}`}>
                                        {isPlaying ? (
                                            <span className="demo-track-bars" aria-hidden="true">
                                                <span /><span /><span />
                                            </span>
                                        ) : (
                                            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                                                <path d="M3 2 L10 6 L3 10 Z" fill="currentColor" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="demo-track-item-name">{t(track.labelKey)}</span>
                                    <span className={`demo-incoming-badge ${track.direction}`}>
                                        <DirectionIcon direction={track.direction} />
                                        {track.flag}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

const Calllog = () => {
    const { t } = useLanguage();

    return (
        <div id="demo" className="demo-section">
            <div className="demo-container">
                <div className="demo-header">
                    <h2 className="demo-title">{t('calllogTitle')}</h2>
                    <p className="demo-subtitle">{t('calllogSubtitle')}</p>
                </div>

                <AudioPlayerProvider>
                    <DemoPlayerInner />
                </AudioPlayerProvider>
            </div>
        </div>
    );
};

export default Calllog;
