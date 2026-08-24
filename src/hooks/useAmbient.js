import { useEffect, useRef } from 'react'

export default function useAmbient() {
  const ctxRef = useRef(null)
  const nodesRef = useRef([])
  const gainRef = useRef(null)

  const ensureCtx = () => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!ctxRef.current) {
      ctxRef.current = new AC()
      gainRef.current = ctxRef.current.createGain()
      gainRef.current.gain.value = 0.4
      gainRef.current.connect(ctxRef.current.destination)
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
  }

  const stop = () => {
    nodesRef.current.forEach((n) => {
      try {
        n.stop && n.stop()
        n.disconnect && n.disconnect()
      } catch { /* ignore */ }
    })
    nodesRef.current = []
  }

  const buildNoise = (ctx) => {
    const size = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < size; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    return src
  }

  const start = (type, volume = 0.4) => {
    if (!type || type === 'none') return
    stop()
    ensureCtx()
    const ctx = ctxRef.current
    if (gainRef.current) gainRef.current.gain.value = volume

    if (type === 'tone') {
      const freqs = [220, 277.18, 329.63]
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f
        const g = ctx.createGain()
        g.gain.value = i === 0 ? 0.2 : 0.08
        o.connect(g)
        g.connect(gainRef.current)
        o.start()
        nodesRef.current.push(o, g)
      })
    } else {
      const src = buildNoise(ctx)
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = type === 'ocean' ? 400 : 1400
      src.connect(filter)
      filter.connect(gainRef.current)
      src.start()
      nodesRef.current.push(src, filter)
    }
  }

  const setVolume = (v) => {
    if (gainRef.current) gainRef.current.gain.value = v
  }

  useEffect(
    () => () => {
      stop()
      ctxRef.current && ctxRef.current.close().catch(() => {})
    },
    [],
  )

  return { start, stop, setVolume }
}
