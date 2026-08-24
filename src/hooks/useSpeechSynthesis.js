import { useEffect, useRef, useState } from 'react'

export default function useSpeechSynthesis() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [speaking, setSpeaking] = useState(false)
  const [voices, setVoices] = useState([])
  const voicesRef = useRef([])

  useEffect(() => {
    if (!supported) return
    const load = () => {
      const list = window.speechSynthesis.getVoices()
      voicesRef.current = list
      setVoices(list)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [supported])

  const pickVoice = () => {
    const list = voicesRef.current.length ? voicesRef.current : voices
    if (!list.length) return null
    return (
      list.find((v) => v.lang && v.lang.toLowerCase().startsWith('id')) ||
      list.find((v) => v.lang && v.lang.toLowerCase().startsWith('en')) ||
      list[0]
    )
  }

  const speak = (text, { rate = 0.95, onEnd } = {}) => {
    if (!supported || !text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice()
    if (v) u.voice = v
    u.lang = v?.lang || 'id-ID'
    u.rate = rate
    u.onstart = () => setSpeaking(true)
    u.onend = () => {
      setSpeaking(false)
      onEnd && onEnd()
    }
    u.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  const cancel = () => {
    if (supported) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }

  return { supported, speaking, speak, cancel, voices }
}
