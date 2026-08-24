import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Square, Volume2, VolumeX, CloudRain } from 'lucide-react'
import Button from '../ui/Button.jsx'
import useSpeechSynthesis from '../../hooks/useSpeechSynthesis.js'
import useAmbient from '../../hooks/useAmbient.js'
import { cn } from '../../lib/cn.js'

const PHASE_LABEL = { in: 'Tarik napas', hold: 'Tahan', out: 'Hembuskan' }
const PHASE_SCALE = { in: 1.06, hold: 1.06, out: 0.55 }
const IDLE_SCALE = 0.82

function flatten(session) {
  const segs = []
  const estMs = (t) => Math.max(2500, Math.round(t.length / 13) * 1000 + 1200)
  for (const step of session.steps) {
    if (step.type === 'speak') {
      segs.push({ kind: 'speak', text: step.text, dur: estMs(step.text) })
    } else if (step.type === 'pause') {
      segs.push({ kind: 'pause', dur: (step.dur || 1) * 1000 })
    } else if (step.type === 'breath') {
      const p = session.breath || { in: 4, hold: 4, out: 6 }
      const cycles = step.cycles || 3
      for (let c = 1; c <= cycles; c++) {
        segs.push({ kind: 'breath', phase: 'in', dur: p.in * 1000, cycle: c, cycles })
        segs.push({ kind: 'breath', phase: 'hold', dur: p.hold * 1000, cycle: c, cycles })
        segs.push({ kind: 'breath', phase: 'out', dur: p.out * 1000, cycle: c, cycles })
      }
    }
  }
  return segs
}

export default function MeditationPlayer({ session }) {
  const { supported: ttsSupported, speak, cancel } = useSpeechSynthesis()
  const ambient = useAmbient()

  const [status, setStatus] = useState('idle') // idle | playing | paused
  const [segIdx, setSegIdxState] = useState(0)
  const [voiceOn, setVoiceOn] = useState(true)
  const [ambientOn, setAmbientOn] = useState(true)
  const [volume, setVolume] = useState(0.4)

  const segIdxRef = useRef(0)
  const remainingRef = useRef(0)
  const timerRef = useRef(null)
  const voiceOnRef = useRef(true)
  const ambientOnRef = useRef(true)
  const volumeRef = useRef(0.4)

  useEffect(() => { voiceOnRef.current = voiceOn }, [voiceOn])
  useEffect(() => { ambientOnRef.current = ambientOn }, [ambientOn])
  useEffect(() => { volumeRef.current = volume }, [volume])

  const segments = useMemo(() => flatten(session), [session])
  const seg = segments[segIdx]
  const progress = segments.length ? segIdx / segments.length : 0

  const setSegIdx = (i) => {
    segIdxRef.current = i
    setSegIdxState(i)
  }

  const beginSegment = (idx) => {
    const s = segments[idx]
    if (!s) {
      finish()
      return
    }
    setSegIdx(idx)
    remainingRef.current = s.dur
    if (s.kind === 'speak' && voiceOnRef.current && ttsSupported) speak(s.text)
  }

  const startTick = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      remainingRef.current -= 100
      if (remainingRef.current <= 0) beginSegment(segIdxRef.current + 1)
    }, 100)
  }

  const play = () => {
    cancel()
    if (ambientOnRef.current) ambient.start(session.ambient, volumeRef.current)
    setStatus('playing')
    beginSegment(0)
    startTick()
  }

  const pause = () => {
    clearInterval(timerRef.current)
    cancel()
    ambient.stop()
    setStatus('paused')
  }

  const resume = () => {
    if (ambientOnRef.current) ambient.start(session.ambient, volumeRef.current)
    setStatus('playing')
    startTick()
  }

  const finish = () => {
    clearInterval(timerRef.current)
    cancel()
    ambient.stop()
    setStatus('idle')
    setSegIdx(0)
  }

  useEffect(() => () => {
    clearInterval(timerRef.current)
    cancel()
    ambient.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const circleScale = status === 'playing' && seg?.kind === 'breath' ? PHASE_SCALE[seg.phase] : IDLE_SCALE
  const circleDur = seg?.kind === 'breath' ? seg.dur / 1000 : 1

  return (
    <div>
      {/* pemandu visual */}
      <div className="relative w-48 h-48 mx-auto my-6">
        <motion.div
          className="absolute inset-0 rounded-full bg-brand/15"
          animate={{ scale: circleScale }}
          transition={{ duration: circleDur, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-5 rounded-full bg-brand/25"
          animate={{ scale: circleScale }}
          transition={{ duration: circleDur, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-10 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-center"
          animate={{ scale: circleScale }}
          transition={{ duration: circleDur, ease: 'easeInOut' }}
        >
          <div className="text-white px-3">
            {status === 'idle' && <div className="text-sm font-semibold">Siap mulai</div>}
            {status !== 'idle' && seg?.kind === 'breath' && (
              <div className="text-sm font-semibold">{PHASE_LABEL[seg.phase]}</div>
            )}
            {status !== 'idle' && seg?.kind === 'speak' && <div className="text-xs font-semibold opacity-90">Mendengarkan…</div>}
            {status !== 'idle' && seg?.kind === 'pause' && <div className="text-xs font-semibold opacity-90">Hening…</div>}
          </div>
        </motion.div>
      </div>

      {/* teks pemandu */}
      <div className="min-h-[52px] text-center text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-md mx-auto">
        {status !== 'idle' && seg?.kind === 'speak' ? seg.text : null}
        {status !== 'idle' && seg?.kind === 'breath' ? `Napas ke-${seg.cycle} dari ${seg.cycles}` : null}
      </div>

      {/* progress */}
      <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden max-w-md mx-auto">
        <div className="h-full bg-brand transition-all duration-200" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* kontrol */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {status !== 'playing' ? (
          <Button onClick={status === 'paused' ? resume : play}>
            <Play size={16} /> {status === 'paused' ? 'Lanjut' : 'Mulai'}
          </Button>
        ) : (
          <Button variant="secondary" onClick={pause}>
            <Pause size={16} /> Jeda
          </Button>
        )}
        <Button variant="ghost" onClick={finish}>
          <Square size={16} /> Selesai
        </Button>
        <button
          onClick={() => {
            const next = !voiceOn
            setVoiceOn(next)
            if (!next) cancel()
          }}
          title="Suara pemandu"
          className={cn(
            'w-10 h-10 rounded-full border flex items-center justify-center transition',
            voiceOn
              ? 'border-brand bg-brand/10 text-brand-deep dark:text-brand'
              : 'border-slate-200 dark:border-slate-700 text-slate-400',
          )}
        >
          {voiceOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
        </button>
        <button
          onClick={() => {
            const next = !ambientOn
            setAmbientOn(next)
            if (!next) ambient.stop()
            else if (status === 'playing') ambient.start(session.ambient, volumeRef.current)
          }}
          title="Suara latar"
          className={cn(
            'w-10 h-10 rounded-full border flex items-center justify-center transition',
            ambientOn
              ? 'border-brand bg-brand/10 text-brand-deep dark:text-brand'
              : 'border-slate-200 dark:border-slate-700 text-slate-400',
          )}
        >
          <CloudRain size={17} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 max-w-md mx-auto">
        <VolumeX size={14} className="text-slate-400" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => {
            const v = Number(e.target.value)
            setVolume(v)
            ambient.setVolume(v)
          }}
          className="flex-1 accent-brand"
        />
        <Volume2 size={14} className="text-slate-400" />
      </div>
    </div>
  )
}
