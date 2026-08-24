import { Link } from 'react-router-dom'
import Logo from '../ui/Logo.jsx'

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 2xl:px-16 py-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <Logo className="w-8 h-8" />
              <span className="font-extrabold text-white">BRIDGE-AI</span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-slate-400">
              Menjembatani hasil skrining kesehatan (CKG) menjadi langkah nyata: psikoedukasi personal, aktivitas 5
              menit, dan arah bantuan yang tepat untuk remaja.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 flex-1">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">Fitur</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/result" className="hover:text-white">Cek hasil skrining</Link></li>
                <li><Link to="/screening" className="hover:text-white">Skrining mandiri</Link></li>
                <li><Link to="/articles" className="hover:text-white">Ruang Baca</Link></li>
                <li><Link to="/mood" className="hover:text-white">Mood tracker</Link></li>
                <li><Link to="/journal" className="hover:text-white">Jurnal harian</Link></li>
                <li><Link to="/breathing" className="hover:text-white">Latihan napas</Link></li>
                <li><Link to="/meditasi" className="hover:text-white">Meditasi terpandu</Link></li>
                <li><Link to="/chat" className="hover:text-white">Asisten AI</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">Bantuan</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white">Cari bantuan</Link></li>
                <li><Link to="/safety" className="hover:text-rose-300">Bantuan darurat</Link></li>
                <li><Link to="/bantu-teman" className="hover:text-white">Bantu teman</Link></li>
                <li><Link to="/komunitas" className="hover:text-white">Ruang cerita</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard sekolah</Link></li>
                <li><Link to="/pengaturan" className="hover:text-white">Pengaturan</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700/60 text-[11px] leading-relaxed text-slate-500">
          <b>BRIDGE-AI</b> adalah prototipe konsep untuk presentasi. Seluruh konten dan "AI" disimulasikan lewat rule
          engine di browser — <b>bukan</b> model terlatih, <b>bukan</b> alat diagnosis, dan <b>bukan</b> pengganti
          psikolog atau tenaga kesehatan. Kalau kamu atau temanmu dalam kondisi darurat, segera hubungi bantuan profesional.
        </div>
      </div>
    </footer>
  )
}
