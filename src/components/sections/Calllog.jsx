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
const RU_FLAG = '\u{1F1F7}\u{1F1FA}';

const demoTracks = [
    { id: 'iman-uz', name: 'Iman', langCode: 'UZ', langLabel: "O'zbekcha", flag: UZ_FLAG, src: '/iman_prod_uz.wav' },
    { id: 'unicon-uz', name: 'UNICON.UZ', langCode: 'UZ', langLabel: "O'zbekcha", flag: UZ_FLAG, src: '/unicon_prod_uz.wav' },
    { id: 'poytaxt-uz', name: 'Poytaxt Parking', langCode: 'UZ', langLabel: "O'zbekcha", flag: UZ_FLAG, src: '/1_poytaxt_uz_incoming.wav', direction: 'incoming' },
    { id: 'thompson-uz', name: 'Thompson School', langCode: 'UZ', langLabel: "O'zbekcha", flag: UZ_FLAG, src: '/demo_uz.wav' },
    { id: 'poytaxt-ru', name: 'Poytaxt Parking', langCode: 'RU', langLabel: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: RU_FLAG, src: '/3_poytaxt_ru_incoming.wav', direction: 'incoming' },
    { id: 'thompson-ru', name: 'Thompson School', langCode: 'RU', langLabel: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: RU_FLAG, src: '/demo_ru.wav' },
];

const trackGroups = [
    { code: 'UZ', label: "O'zbekcha", flag: UZ_FLAG, tracks: demoTracks.filter(t => t.langCode === 'UZ') },
    { code: 'RU', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: RU_FLAG, tracks: demoTracks.filter(t => t.langCode === 'RU') },
];

function DemoPlayerInner() {
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
                            {selectedTrack.name}
                            {selectedTrack.direction === 'incoming' && (
                                <span className="demo-incoming-badge demo-incoming-badge-lg" aria-label="Incoming call">
                                    <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                                        <path d="M2 2 L7 7 M7 7 L7 3 M7 7 L3 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Incoming
                                </span>
                            )}
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
                {trackGroups.map((group) => (
                    <div key={group.code} className="demo-track-group">
                        <div className="demo-track-group-header">
                            <span className="demo-track-group-flag">{group.flag}</span>
                            <span className="demo-track-group-label">{group.label}</span>
                            <span className="demo-track-group-count">{group.tracks.length}</span>
                        </div>
                        <ul className="demo-track-group-list" role="list">
                            {group.tracks.map((track) => {
                                const isActive = selectedTrack.id === track.id;
                                const isPlaying = isActive && player.isPlaying;
                                return (
                                    <li key={track.id}>
                                        <button
                                            type="button"
                                            className={`demo-track-item ${isActive ? 'active' : ''}`}
                                            onClick={() => handleTrackChange(track)}
                                            aria-label={`${isPlaying ? 'Pause' : 'Play'} ${track.name} ${track.langCode}`}
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
                                            <span className="demo-track-item-name">{track.name}</span>
                                            {track.direction === 'incoming' && (
                                                <span className="demo-incoming-badge" aria-label="Incoming call">
                                                    <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                                                        <path d="M2 2 L7 7 M7 7 L7 3 M7 7 L3 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    Incoming
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
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
