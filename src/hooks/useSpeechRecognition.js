import { useEffect, useRef, useState } from 'react'

export default function useSpeechRecognition() {
  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
  const supported = !!SR
  const recRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)

  const start = () => {
    if (!supported) return
    try {
      recRef.current?.abort()
    } catch { /* ignore */ }
    const rec = new SR()
    rec.lang = 'id-ID'
    rec.continuous = false
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => (r[0] ? r[0].transcript : ''))
        .join(' ')
        .trim()
      setTranscript((t) => (t ? t + ' ' + text : text))
    }
    rec.onerror = (e) => {
      setError(e.error)
      setListening(false)
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    setTranscript('')
    setError(null)
    setListening(true)
    try {
      rec.start()
    } catch {
      setListening(false)
    }
  }

  const stop = () => {
    recRef.current?.stop()
    setListening(false)
  }

  const resetTranscript = () => setTranscript('')

  useEffect(() => () => recRef.current?.abort(), [])

  return { supported, listening, transcript, error, start, stop, resetTranscript }
}
