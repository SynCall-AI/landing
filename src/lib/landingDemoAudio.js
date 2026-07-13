// Microphone capture and playback for the landing demo voice call.
// Wire format both ways: headerless signed little-endian PCM16, 16 kHz, mono.

const TARGET_RATE = 16000;

function floatToPcm16(float32) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
        const s = Math.max(-1, Math.min(1, float32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return out;
}

function downsample(input, fromRate, toRate) {
    if (fromRate === toRate) return input;
    const ratio = fromRate / toRate;
    const length = Math.floor(input.length / ratio);
    const out = new Float32Array(length);
    for (let i = 0; i < length; i++) {
        const pos = i * ratio;
        const i0 = Math.floor(pos);
        const i1 = Math.min(i0 + 1, input.length - 1);
        out[i] = input[i0] + (input[i1] - input[i0]) * (pos - i0);
    }
    return out;
}

export class DemoCallAudio {
    constructor() {
        this.ctx = null;
        this.stream = null;
        this.sourceNode = null;
        this.processor = null;
        this.playing = new Set();
        this.cursor = 0;
        this.onFrame = null;
        this.closed = false;
    }

    // Call synchronously from a user gesture so iOS Safari allows the context.
    ensureContext() {
        if (this.ctx || this.closed) return;
        try {
            this.ctx = new AudioContext({ sampleRate: TARGET_RATE });
        } catch {
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    }

    attachMic(stream) {
        if (this.closed) {
            stream.getTracks().forEach((t) => t.stop());
            return;
        }
        this.ensureContext();
        this.stream = stream;
        const ctx = this.ctx;
        this.sourceNode = ctx.createMediaStreamSource(stream);
        this.processor = ctx.createScriptProcessor(2048, 1, 1);
        this.processor.onaudioprocess = (event) => {
            if (!this.onFrame) return;
            const input = event.inputBuffer.getChannelData(0);
            const pcm = floatToPcm16(downsample(input, ctx.sampleRate, TARGET_RATE));
            this.onFrame(pcm.buffer);
        };
        this.sourceNode.connect(this.processor);
        // The processor only runs while connected; its output buffer stays
        // silent, so nothing echoes to the speakers.
        this.processor.connect(ctx.destination);
    }

    // Mic frames flow only after the server reports status "connected".
    startCapture(onFrame) {
        this.onFrame = onFrame;
    }

    // Disabled tracks keep producing frames, but silent ones — the stream stays
    // continuous for the server's VAD instead of stalling mid-call.
    setMuted(muted) {
        this.stream?.getAudioTracks().forEach((t) => {
            t.enabled = !muted;
        });
    }

    playPcm16(arrayBuffer) {
        const ctx = this.ctx;
        if (!ctx || this.closed || arrayBuffer.byteLength < 2) return;
        const samples = new Int16Array(arrayBuffer, 0, Math.floor(arrayBuffer.byteLength / 2));
        const float32 = new Float32Array(samples.length);
        for (let i = 0; i < samples.length; i++) float32[i] = samples[i] / 0x8000;
        const buffer = ctx.createBuffer(1, float32.length, TARGET_RATE);
        buffer.getChannelData(0).set(float32);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => this.playing.delete(source);
        this.playing.add(source);
        const startAt = Math.max(ctx.currentTime + 0.05, this.cursor);
        source.start(startAt);
        this.cursor = startAt + buffer.duration;
    }

    // Barge-in: drop every scheduled bot chunk immediately.
    flush() {
        for (const source of this.playing) {
            try {
                source.stop();
            } catch {
                /* already stopped */
            }
        }
        this.playing.clear();
        this.cursor = 0;
    }

    close() {
        if (this.closed) return;
        this.closed = true;
        this.onFrame = null;
        this.flush();
        if (this.processor) this.processor.onaudioprocess = null;
        try {
            this.processor?.disconnect();
        } catch {
            /* already disconnected */
        }
        try {
            this.sourceNode?.disconnect();
        } catch {
            /* already disconnected */
        }
        this.processor = null;
        this.sourceNode = null;
        this.stream?.getTracks().forEach((t) => t.stop());
        this.stream = null;
        if (this.ctx && this.ctx.state !== 'closed') this.ctx.close().catch(() => {});
        this.ctx = null;
    }
}
