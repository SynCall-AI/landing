/**
 * Adapted from ElevenLabs UI Audio Player
 * https://ui.elevenlabs.io/docs/components/audio-player
 * Ported to plain React + CSS (no Tailwind/shadcn)
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { PauseIcon, PlayIcon } from "lucide-react"
import "./AudioPlayer.css"

// --- Constants ---
const ReadyState = { HAVE_NOTHING: 0, HAVE_METADATA: 1, HAVE_CURRENT_DATA: 2, HAVE_FUTURE_DATA: 3, HAVE_ENOUGH_DATA: 4 }
const NetworkState = { NETWORK_EMPTY: 0, NETWORK_IDLE: 1, NETWORK_LOADING: 2, NETWORK_NO_SOURCE: 3 }

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    const formattedMins = mins < 10 ? `0${mins}` : mins
    const formattedSecs = secs < 10 ? `0${secs}` : secs
    return hrs > 0
        ? `${hrs}:${formattedMins}:${formattedSecs}`
        : `${mins}:${formattedSecs}`
}

// --- Animation Frame Hook ---
function useAnimationFrame(callback) {
    const requestRef = useRef(null)
    const previousTimeRef = useRef(null)
    const callbackRef = useRef(callback)

    useEffect(() => { callbackRef.current = callback }, [callback])

    useEffect(() => {
        const animate = (time) => {
            if (previousTimeRef.current !== null) {
                const delta = time - previousTimeRef.current
                callbackRef.current(delta)
            }
            previousTimeRef.current = time
            requestRef.current = requestAnimationFrame(animate)
        }
        requestRef.current = requestAnimationFrame(animate)
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
            previousTimeRef.current = null
        }
    }, [])
}

// --- Context ---
const AudioPlayerContext = createContext(null)
const AudioPlayerTimeContext = createContext(null)

export function useAudioPlayer() {
    const api = useContext(AudioPlayerContext)
    if (!api) throw new Error("useAudioPlayer must be inside AudioPlayerProvider")
    return api
}

export function useAudioPlayerTime() {
    const time = useContext(AudioPlayerTimeContext)
    if (time === null) throw new Error("useAudioPlayerTime must be inside AudioPlayerProvider")
    return time
}

// --- Provider ---
export function AudioPlayerProvider({ children }) {
    const audioRef = useRef(null)
    const itemRef = useRef(null)
    const playPromiseRef = useRef(null)
    const [readyState, setReadyState] = useState(0)
    const [networkState, setNetworkState] = useState(0)
    const [time, setTime] = useState(0)
    const [duration, setDuration] = useState(undefined)
    const [error, setError] = useState(null)
    const [activeItem, _setActiveItem] = useState(null)
    const [paused, setPaused] = useState(true)
    const [playbackRate, setPlaybackRateState] = useState(1)

    const setActiveItem = useCallback(async (item) => {
        if (!audioRef.current) return
        if (item?.id === itemRef.current?.id) return
        itemRef.current = item
        const currentRate = audioRef.current.playbackRate
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        if (item === null) {
            audioRef.current.removeAttribute("src")
        } else {
            audioRef.current.src = item.src
        }
        audioRef.current.load()
        audioRef.current.playbackRate = currentRate
    }, [])

    const play = useCallback(async (item) => {
        if (!audioRef.current) return
        if (playPromiseRef.current) {
            try { await playPromiseRef.current } catch (e) { console.error(e) }
        }
        if (item === undefined) {
            const p = audioRef.current.play()
            playPromiseRef.current = p
            return p
        }
        if (item?.id === activeItem?.id) {
            const p = audioRef.current.play()
            playPromiseRef.current = p
            return p
        }
        itemRef.current = item
        const currentRate = audioRef.current.playbackRate
        if (!audioRef.current.paused) audioRef.current.pause()
        audioRef.current.currentTime = 0
        if (item === null) {
            audioRef.current.removeAttribute("src")
        } else {
            audioRef.current.src = item.src
        }
        audioRef.current.load()
        audioRef.current.playbackRate = currentRate
        const p = audioRef.current.play()
        playPromiseRef.current = p
        return p
    }, [activeItem])

    const pause = useCallback(async () => {
        if (!audioRef.current) return
        if (playPromiseRef.current) {
            try { await playPromiseRef.current } catch (e) { console.error(e) }
        }
        audioRef.current.pause()
        playPromiseRef.current = null
    }, [])

    const seek = useCallback((time) => {
        if (!audioRef.current) return
        audioRef.current.currentTime = time
    }, [])

    const setPlaybackRate = useCallback((rate) => {
        if (!audioRef.current) return
        audioRef.current.playbackRate = rate
        setPlaybackRateState(rate)
    }, [])

    const isItemActive = useCallback((id) => activeItem?.id === id, [activeItem])

    useAnimationFrame(() => {
        if (audioRef.current) {
            _setActiveItem(itemRef.current)
            setReadyState(audioRef.current.readyState)
            setNetworkState(audioRef.current.networkState)
            setTime(audioRef.current.currentTime)
            setDuration(audioRef.current.duration)
            setPaused(audioRef.current.paused)
            setError(audioRef.current.error)
            setPlaybackRateState(audioRef.current.playbackRate)
        }
    })

    const isPlaying = !paused
    const isBuffering = readyState < ReadyState.HAVE_FUTURE_DATA && networkState === NetworkState.NETWORK_LOADING

    const api = useMemo(() => ({
        ref: audioRef, duration, error, isPlaying, isBuffering, activeItem,
        playbackRate, isItemActive, setActiveItem, play, pause, seek, setPlaybackRate,
    }), [duration, error, isPlaying, isBuffering, activeItem, playbackRate, isItemActive, setActiveItem, play, pause, seek, setPlaybackRate])

    return (
        <AudioPlayerContext.Provider value={api}>
            <AudioPlayerTimeContext.Provider value={time}>
                <audio ref={audioRef} style={{ display: 'none' }} />
                {children}
            </AudioPlayerTimeContext.Provider>
        </AudioPlayerContext.Provider>
    )
}

// --- Progress Slider ---
export const AudioPlayerProgress = (props) => {
    const player = useAudioPlayer()
    const time = useAudioPlayerTime()
    const wasPlayingRef = useRef(false)

    const isDisabled = player.duration === undefined || !Number.isFinite(player.duration) || Number.isNaN(player.duration)

    return (
        <SliderPrimitive.Root
            className={`el-player-slider ${props.className || ''}`}
            value={[time]}
            onValueChange={(vals) => player.seek(vals[0])}
            min={0}
            max={player.duration ?? 0}
            step={0.25}
            onPointerDown={() => {
                wasPlayingRef.current = player.isPlaying
                player.pause()
            }}
            onPointerUp={() => {
                if (wasPlayingRef.current) player.play()
            }}
            onKeyDown={(e) => {
                if (e.key === " ") {
                    e.preventDefault()
                    player.isPlaying ? player.pause() : player.play()
                }
            }}
            disabled={isDisabled}
        >
            <SliderPrimitive.Track className="el-player-track">
                <SliderPrimitive.Range className="el-player-range" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="el-player-thumb" />
        </SliderPrimitive.Root>
    )
}

// --- Waveform Scrubber ---
// Renders the audio as a clickable/draggable waveform. Real peaks are decoded
// from the file (cached per src); a deterministic synthetic shape shows instantly
// while decoding so the bar is never empty.
const WAVEFORM_BARS = 56
const waveformCache = new Map() // src -> Float32Array(WAVEFORM_BARS)

function synthPeaks(src) {
    let h = 2166136261
    for (let i = 0; i < src.length; i++) h = (Math.imul(h ^ src.charCodeAt(i), 16777619)) >>> 0
    const peaks = new Float32Array(WAVEFORM_BARS)
    for (let i = 0; i < WAVEFORM_BARS; i++) {
        h = (Math.imul(h, 1103515245) + 12345) >>> 0
        const r = h / 0xffffffff
        // Speech-like envelope: a gentle wave modulated by deterministic noise.
        peaks[i] = Math.min(1, 0.28 + 0.6 * Math.abs(Math.sin(i * 0.55) * 0.5 + r * 0.7))
    }
    return peaks
}

async function decodePeaks(src) {
    const res = await fetch(src)
    const buf = await res.arrayBuffer()
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioCtx()
    let audioBuf
    try {
        audioBuf = await ctx.decodeAudioData(buf)
    } finally {
        ctx.close()
    }
    const data = audioBuf.getChannelData(0)
    const block = Math.max(1, Math.floor(data.length / WAVEFORM_BARS))
    const peaks = new Float32Array(WAVEFORM_BARS)
    let max = 0
    for (let i = 0; i < WAVEFORM_BARS; i++) {
        let sum = 0
        const start = i * block
        for (let j = 0; j < block; j++) {
            const v = data[start + j] || 0
            sum += v * v
        }
        const rms = Math.sqrt(sum / block)
        peaks[i] = rms
        if (rms > max) max = rms
    }
    for (let i = 0; i < WAVEFORM_BARS; i++) {
        peaks[i] = max > 0 ? Math.min(1, peaks[i] / max) : 0.2
    }
    return peaks
}

function useWaveform(src) {
    const [peaks, setPeaks] = useState(() => (src ? waveformCache.get(src) || synthPeaks(src) : null))

    useEffect(() => {
        if (!src) { setPeaks(null); return }
        const cached = waveformCache.get(src)
        if (cached) { setPeaks(cached); return }
        setPeaks(synthPeaks(src)) // instant fallback
        let cancelled = false
        decodePeaks(src)
            .then((p) => { waveformCache.set(src, p); if (!cancelled) setPeaks(p) })
            .catch(() => { /* keep synthetic shape on failure */ })
        return () => { cancelled = true }
    }, [src])

    return peaks
}

export const AudioPlayerWaveform = ({ className }) => {
    const player = useAudioPlayer()
    const time = useAudioPlayerTime()
    const wasPlayingRef = useRef(false)
    const containerRef = useRef(null)
    const src = player.activeItem?.src
    const peaks = useWaveform(src)

    const duration = (player.duration && Number.isFinite(player.duration)) ? player.duration : 0
    const progress = duration > 0 ? time / duration : 0
    const isDisabled = !src || duration === 0

    const seekToClientX = (clientX) => {
        const el = containerRef.current
        if (!el || duration === 0) return
        const rect = el.getBoundingClientRect()
        const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        player.seek(frac * duration)
    }

    const handlePointerDown = (e) => {
        if (isDisabled) return
        try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* ignore */ }
        wasPlayingRef.current = player.isPlaying
        player.pause()
        seekToClientX(e.clientX)
    }
    const handlePointerMove = (e) => {
        if (isDisabled || e.buttons === 0) return
        seekToClientX(e.clientX)
    }
    const handlePointerUp = () => {
        if (isDisabled) return
        if (wasPlayingRef.current) player.play()
    }
    const handleKeyDown = (e) => {
        if (isDisabled) return
        if (e.key === "ArrowRight") { e.preventDefault(); player.seek(Math.min(duration, time + 5)) }
        else if (e.key === "ArrowLeft") { e.preventDefault(); player.seek(Math.max(0, time - 5)) }
        else if (e.key === " ") { e.preventDefault(); player.isPlaying ? player.pause() : player.play() }
    }

    const bars = peaks || new Float32Array(WAVEFORM_BARS).fill(0.2)

    return (
        <div
            ref={containerRef}
            className={`el-waveform ${isDisabled ? "disabled" : ""} ${className || ""}`}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time)}
            tabIndex={isDisabled ? -1 : 0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
        >
            {Array.from(bars).map((v, i) => {
                const played = (i + 0.5) / bars.length <= progress
                return (
                    <span
                        key={i}
                        className={`el-wave-bar ${played ? "played" : ""}`}
                        style={{ height: `${Math.max(12, v * 100)}%` }}
                    />
                )
            })}
        </div>
    )
}

// --- Time Display ---
export const AudioPlayerTime = ({ className }) => {
    const time = useAudioPlayerTime()
    return <span className={`el-player-time ${className || ''}`}>{formatTime(time)}</span>
}

// --- Duration Display ---
export const AudioPlayerDuration = ({ className }) => {
    const player = useAudioPlayer()
    const d = player.duration
    return (
        <span className={`el-player-time ${className || ''}`}>
            {d !== null && d !== undefined && !Number.isNaN(d) ? formatTime(d) : "--:--"}
        </span>
    )
}

// --- Play Button ---
export function AudioPlayerButton({ item, className }) {
    const player = useAudioPlayer()

    const playing = item
        ? player.isItemActive(item.id) && player.isPlaying
        : player.isPlaying

    const loading = item
        ? player.isItemActive(item.id) && player.isBuffering && player.isPlaying
        : player.isBuffering && player.isPlaying

    const handleClick = () => {
        if (playing) {
            player.pause()
        } else {
            player.play(item || undefined)
        }
    }

    return (
        <button
            className={`el-play-btn ${className || ''}`}
            onClick={handleClick}
            aria-label={playing ? "Pause" : "Play"}
            type="button"
        >
            {loading ? (
                <div className="el-play-spinner" />
            ) : playing ? (
                <PauseIcon size={20} />
            ) : (
                <PlayIcon size={20} />
            )}
        </button>
    )
}
