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

const demoTracks = [
    { id: 'uz', code: 'uz', name: "O'zbekcha", flag: '\u{1F1FA}\u{1F1FF}', src: '/demo_uz.wav' },
    { id: 'ru', code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}', src: '/demo_ru.wav' },
];

function DemoPlayerInner() {
    const [selectedTrack, setSelectedTrack] = useState(demoTracks[0]);
    const player = useAudioPlayer();

    const handleTrackChange = (track) => {
        if (track.id === selectedTrack.id) return;
        setSelectedTrack(track);
        player.play(track);
    };

    return (
        <div className="demo-player-card">
            <div className="demo-lang-selector">
                {demoTracks.map((track) => (
                    <button
                        key={track.id}
                        className={`demo-lang-btn ${selectedTrack.id === track.id ? 'active' : ''}`}
                        onClick={() => handleTrackChange(track)}
                    >
                        <span className="demo-flag">{track.flag}</span>
                        <span className="demo-lang-name">{track.name}</span>
                    </button>
                ))}
            </div>

            <div className="demo-player">
                <div className="demo-cover">
                    <img src="/al-cover.svg" alt="Syncall AI" />
                    <div className="demo-cover-glow"></div>
                </div>

                <div className="demo-controls">
                    <div className="demo-track-info">
                        <span className="demo-track-name">Syncall AI Demo</span>
                        <span className="demo-track-lang">{selectedTrack.flag} {selectedTrack.name}</span>
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
