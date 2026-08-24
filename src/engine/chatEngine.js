import { MODULES } from '../data/modules'

// Kata kunci yang menandakan krisis → harus langsung ke bantuan manusia.
const CRISIS_KEYWORDS = [
  'bunuh diri', 'akhiri hidup', 'menyakiti diri', 'self harm', 'self-harm', 'harakiri',
  'mau mati', 'ingin mati', 'mati aja', 'nggak ada gunanya hidup', 'tidak berharga hidup',
  'melukai diri', 'sayat', 'overdosis',
]

function matchAny(text, keywords) {
  const t = text.toLowerCase()
  return keywords.some((k) => t.includes(k))
}

export function detectCrisis(text) {
  return matchAny(text, CRISIS_KEYWORDS)
}

export function chatReply(userText, context = {}) {
  const t = (userText || '').toLowerCase()

  if (detectCrisis(t)) {
    return {
      crisis: true,
      text: 'Ini terdengar serius, dan aku nggak bisa — serta nggak seharusnya — menangani ini sendirian. Yang paling penting sekarang adalah kamu bicara dengan manusia yang bisa menolongmu secara langsung. Kamu nggak sendirian.',
      actions: [
        { label: 'Buka bantuan darurat', to: '/safety' },
        { label: 'Hubungi 119 ext. 8', to: '/help' },
      ],
    }
  }

  if (matchAny(t, ['halo', 'hai', 'hi', 'hey', 'assalamu', 'test'])) {
    return {
      text: 'Halo! Aku BRIDGE-AI, asisten virtualmu. Aku bisa bantu menjelaskan hasil skrining, menyarankan latihan menenangkan diri, atau mengarahkanmu ke bantuan. Ada yang bisa kubantu?',
      actions: [
        { label: 'Apa arti hasil skriningku?', reply: 'hasil' },
        { label: 'Aku lagi cemas', reply: 'cemas' },
        { label: 'Aku susah tidur', reply: 'tidur' },
      ],
    }
  }

  if (matchAny(t, ['hasil', 'skor', 'skrining', 'artinya apa', 'kode'])) {
    if (context.category) {
      const label = { low: 'rendah', mid: 'sedang', high: 'tinggi' }[context.category]
      return {
        text: `Hasil skriningmu masuk kategori ${label}. Ini bukan diagnosis — cuma gambaran awal sinyal yang perlu diperhatikan. Aku bisa bantu menyusun langkah lanjutan kalau kamu mau.`,
        actions: [
          { label: 'Lihat hasil lengkap', to: '/understand' },
          { label: 'Susun jalurku', to: '/personalize' },
        ],
      }
    }
    return {
      text: 'Kamu belum memasukkan kode hasil skrining. Masukkan kode CKG-mu (mis. MH-S2) atau coba skrining mandiri dulu, ya.',
      actions: [
        { label: 'Masukkan kode hasil', to: '/result' },
        { label: 'Coba skrining mandiri', to: '/screening' },
      ],
    }
  }

  if (matchAny(t, ['cemas', 'khawatir', 'anxiety', 'panik', 'gelisah', 'deg']))
    return {
      text: 'Rasa cemas itu alarm tubuh yang kadang menyala berlebihan. Coba tarik napas pelan, lalu teknik grounding 5-4-3-2-1: sebut 5 hal yang kamu lihat, 4 yang kamu sentuh, 3 yang kamu dengar, 2 yang kamu cium, 1 yang kamu kecap.',
      actions: [
        { label: 'Latihan napas sekarang', to: '/breathing' },
        { label: 'Baca: Mengatasi kecemasan', to: '/articles/mengenal-kecemasan' },
      ],
    }

  if (matchAny(t, ['sedih', 'hampa', 'depresi', 'mood', 'kosong', 'down', 'males']))
    return {
      text: 'Aku turut sedih kamu merasa begitu. Perasaan ini valid, dan kamu nggak salah karenanya. Satu langkah kecil yang bisa dicoba: lakukan satu aktivitas yang dulu kamu suka, walau cuma 5 menit.',
      actions: [
        { label: 'Baca: Memahami mood', to: '/articles/memahami-mood' },
        { label: 'Catat mood harian', to: '/mood' },
      ],
    }

  if (matchAny(t, ['tidur', 'susah tidur', 'insomnia', 'begadang', 'ngantuk']))
    return {
      text: 'Tidur itu fondasi kesehatan mental. Coba jaga jam tidur yang sama tiap malam dan jauhkan HP 30–60 menit sebelum tidur. Ada latihan napas yang bisa membantu sebelum tidur.',
      actions: [
        { label: 'Baca: Tidur yang baik', to: '/articles/tidur-yang-baik' },
        { label: 'Latihan napas', to: '/breathing' },
      ],
    }

  if (matchAny(t, ['stres', 'tekanan', 'stress', 'capek', 'kewalahan', 'tugas numpuk']))
    return {
      text: 'Stres yang menumpuk biasanya karena semuanya terasa jadi satu. Coba tulis semua tugas, pilih 3 yang paling penting, dan pecah jadi langkah 20–30 menit. Mulai dari yang paling kecil dulu.',
      actions: [
        { label: 'Baca: Mengenal stres', to: '/articles/mengenal-stres' },
        { label: 'Skrining stres', to: '/quiz/stress' },
      ],
    }

  if (matchAny(t, ['meditasi', 'relaks', 'rileks', 'tenang', 'relaksasi', 'pandu']))
    return {
      text: 'Ada sesi Meditasi Terpandu yang bisa membantumu — lengkap dengan pemandu suara, panduan napas, dan suara latar. Kamu juga bisa ngobrol denganku lewat suara.',
      actions: [
        { label: 'Buka Meditasi Terpandu', to: '/meditasi' },
        { label: 'Latihan napas cepat', to: '/breathing' },
      ],
    }

  if (matchAny(t, ['napas', 'breathing']))
    return {
      text: 'Latihan napas 4-7-8 itu cara cepat menenangkan tubuh: tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik. Mau kucoba pandu?',
      actions: [
        { label: 'Mulai latihan napas', to: '/breathing' },
        { label: 'Meditasi terpandu', to: '/meditasi' },
      ],
    }

  if (matchAny(t, ['bantuan', 'psikolog', 'konselor', 'konseling', 'guru bk', 'dokter', 'terapi']))
    return {
      text: 'Minta bantuan itu langkah paling berani. Kamu bisa mulai dari guru BK di sekolah, puskesmas terdekat, atau layanan konseling nasional 119 ext. 8.',
      actions: [
        { label: 'Lihat jalur bantuan', to: '/help' },
        { label: 'Hubungi konselor via WA', href: 'https://wa.me/6285100000000' },
      ],
    }

  if (matchAny(t, ['teman', 'sahabat', 'khawatir sama teman', 'nemenin'])) {
    return {
      text: 'Mau bantu teman? Yang terpenting: dengarkan tanpa menghakimi, dan jangan coba menangani sendiri kalau dia dalam bahaya — arahkan ke bantuan profesional.',
      actions: [{ label: 'Panduan bantu teman', to: '/bantu-teman' }],
    }
  }

  return {
    text: 'Aku ngerti kamu mungkin butuh sesuatu yang spesifik. Aku bisa bantu soal hasil skrining, kecemasan, tidur, stres, atau mencari bantuan. Atau ceritakan apa yang kamu rasakan sekarang.',
    actions: [
      { label: 'Apa arti hasilku?', reply: 'hasil' },
      { label: 'Aku lagi cemas', reply: 'cemas' },
      { label: 'Cari bantuan', reply: 'bantuan' },
    ],
  }
}
