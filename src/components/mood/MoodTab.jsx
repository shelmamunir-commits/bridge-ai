import { useState } from 'react'
import Card from '../ui/Card.jsx'
import SectionLabel from '../ui/SectionLabel.jsx'
import MoodPicker from './MoodPicker.jsx'
import MoodCalendar, { dateKey } from './MoodCalendar.jsx'
import MoodTrendChart from '../charts/MoodTrendChart.jsx'
import { useMood } from '../../context/MoodContext.jsx'
import { MOODS, MOOD_LABELS } from '../../lib/constants.js'
import { weeklySummary } from '../../engine/insights.js'

export default function MoodTab() {
  const { entries, setMood } = useMood()
  const now = new Date()
  const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate())
  const [selected, setSelected] = useState(todayKey)

  const selectedMood = entries[selected]
  const summary = weeklySummary(entries)

  const trend = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = dateKey(d.getFullYear(), d.getMonth(), d.getDate())
    if (entries[key] !== undefined && entries[key] !== null) {
      trend.push({
        label: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        mood: entries[key],
      })
    }
  }

  const selLabel = selected === todayKey ? 'Hari ini' : selected

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <SectionLabel>Kalender</SectionLabel>
          <MoodCalendar entries={entries} selected={selected} onSelect={setSelected} />
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionLabel>{selLabel}</SectionLabel>
            <MoodPicker value={selectedMood ?? null} onChange={(m) => setMood(selected, m)} />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {selectedMood !== undefined && selectedMood !== null
                ? `Kamu merasa ${MOOD_LABELS[selectedMood].toLowerCase()} hari ini.`
                : 'Pilih emoji untuk mencatat mood hari ini.'}
            </p>
          </Card>

          <Card>
            <SectionLabel>Tren 14 hari terakhir</SectionLabel>
            <MoodTrendChart data={trend} />
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <SectionLabel>Ringkasan mingguan ini</SectionLabel>
        <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-200">{summary.insight}</p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {summary.days.map((d, i) => (
            <div key={i} className="text-center">
              <div className="text-[11px] font-semibold text-slate-400">{d.label}</div>
              <div className="mt-1 text-lg">
                {d.mood !== undefined && d.mood !== null ? MOODS[d.mood] : <span className="text-slate-300 dark:text-slate-600">·</span>}
              </div>
            </div>
          ))}
        </div>
        {summary.avg !== null && (
          <p className="mt-3 text-[12.5px] text-slate-500 dark:text-slate-400">
            Rata-rata mood 7 hari terakhir: <b>{summary.avg.toFixed(1)}/4</b>
          </p>
        )}
      </Card>
    </div>
  )
}
