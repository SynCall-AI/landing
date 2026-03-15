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
