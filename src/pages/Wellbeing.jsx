import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { PenLine, TrendingUp } from 'lucide-react'
import JournalTab from '../components/journal/JournalTab.jsx'
import MoodTab from '../components/mood/MoodTab.jsx'
import { cn } from '../lib/cn.js'

const TABS = [
  { id: 'tulis', label: 'Jurnal', icon: PenLine },
  { id: 'tren', label: 'Mood Tracker', icon: TrendingUp },
]

export default function Wellbeing() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'tren' ? 'tren' : 'tulis'

  const setTab = (id) => setParams(id === 'tulis' ? {} : { tab: id }, { replace: true })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h1 className="text-2xl sm:text-3xl font-display text-slate-800 dark:text-slate-100">Jurnal Harian</h1>
      <p className="mt-2 text-[14.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
        Catat mood, tulis jurnal, dan lihat trennya — semua di satu tempat.
      </p>

      <div className="mt-5 inline-flex rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition',
              tab === t.id ? 'bg-brand text-white' : 'text-slate-500 dark:text-slate-400',
            )}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'tulis' ? <JournalTab /> : <MoodTab />}
    </motion.div>
  )
}
