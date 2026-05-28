// Lightweight Web Audio tone generator — no audio files needed.
// Each animal id maps to a note in a pentatonic scale so any sequence
// sounds pleasant. Tones are synthesized on the fly.

let ctx

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (AudioCtx) ctx = new AudioCtx()
  }
  // Browsers suspend the context until a user gesture; nudge it awake.
  if (ctx && ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Pentatonic scale (C D E G A) keyed by animal id 1–5.
const NOTES = {
  1: 261.63,
  2: 293.66,
  3: 329.63,
  4: 392.0,
  5: 440.0,
}

export function playNote(id, duration = 0.32) {
  const audio = getCtx()
  if (!audio) return
  const freq = NOTES[id] || 330
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq

  const now = audio.currentTime
  // Quick attack, smooth decay — avoids clicks.
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  osc.connect(gain).connect(audio.destination)
  osc.start(now)
  osc.stop(now + duration)
}

export function playBuzzer() {
  const audio = getCtx()
  if (!audio) return
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'sawtooth'
  osc.frequency.value = 110

  const now = audio.currentTime
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)

  osc.connect(gain).connect(audio.destination)
  osc.start(now)
  osc.stop(now + 0.5)
}
