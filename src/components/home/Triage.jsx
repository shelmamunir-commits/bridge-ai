import { Link } from 'react-router-dom'
import { Siren, BookOpen, HeartHandshake } from 'lucide-react'

const ITEMS = [
  { to: '/safety', icon: Siren, t: 'Aku Butuh Bantuan', d: 'Butuh bantuan segera? Buka halaman darurat.', color: '#f1487c', bg: '#feedf2' },
  { to: '/articles', icon: BookOpen, t: 'Cari Tahu', d: 'Baca materi psikoedukasi tentang apa yang kamu rasakan.', color: '#3899fe', bg: '#ebf3ff' },
  { to: '/bantu-teman', icon: HeartHandshake, t: 'Peduli Teman', d: 'Cara mendampingi orang yang kamu sayangi.', color: '#40ae87', bg: '#e1fbfa' },
]

export default function Triage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {ITEMS.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          className="group rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-brand dark:hover:border-brand transition"
        >
          <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: it.bg }}>
            <it.icon size={22} style={{ color: it.color }} />
          </div>
          <div className="mt-3 font-bold text-slate-900 dark:text-white">{it.t}</div>
          <div className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">{it.d}</div>
        </Link>
      ))}
    </div>
  )
}
