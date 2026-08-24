import { MEDITATIONS } from '../data/meditations'

const PROBLEM_MAP = {
  academic: ['focus', 'bodyscan'],
  social: ['selfcompassion', 'grounding'],
  anxiety: ['calm', 'grounding'],
  sleep: ['sleep', 'calm'],
  mood: ['selfcompassion', 'bodyscan'],
}

const NEED_MAP = {
  understand: ['bodyscan'],
  cope: ['calm', 'grounding'],
  solve: ['focus'],
  talk: ['selfcompassion'],
}

export function recommendMeditations(result, problem, need) {
  const ids = []

  if (result) {
    if (result.phq4) {
      if (result.phq4.anxietyPositive) ids.push('calm', 'grounding')
      if (result.phq4.depressionPositive) ids.push('selfcompassion', 'bodyscan')
      if (result.phq4.tier === 'severe') ids.push('calm')
      else if (result.phq4.tier === 'moderate') ids.push('bodyscan')
    } else if (result.category) {
      if (result.category === 'high') ids.push('calm', 'grounding')
      else if (result.category === 'mid') ids.push('bodyscan', 'calm')
      else ids.push('focus', 'bodyscan')
    }
  }

  if (problem) ids.push(...(PROBLEM_MAP[problem] || []))
  if (need) ids.push(...(NEED_MAP[need] || []))

  const unique = [...new Set(ids)]
  const fallback = ['calm', 'bodyscan', 'focus', 'sleep']
  for (const f of fallback) {
    if (unique.length >= 4) break
    if (!unique.includes(f)) unique.push(f)
  }

  return unique
    .slice(0, 4)
    .map((id) => MEDITATIONS.find((m) => m.id === id))
    .filter(Boolean)
}

export function getMeditation(id) {
  return MEDITATIONS.find((m) => m.id === id) || null
}
