export const LIKERT = ['Tidak pernah', 'Kadang-kadang', 'Sering', 'Hampir setiap hari']

export const PHQ4_OPTIONS = ['Tidak pernah', 'Beberapa hari', 'Lebih dari separuh waktu', 'Hampir setiap hari']

export const PHQ4_LEVELS = {
  normal: {
    label: 'Normal',
    range: '0–2',
    desc: 'Kamu tidak menunjukkan tanda-tanda tekanan psikologis yang signifikan. Gejala kecemasan atau kesedihan yang kamu rasakan berada dalam batas wajar dan belum mengganggu fungsi sosial dalam kehidupan sehari-hari.',
  },
  mild: {
    label: 'Ringan',
    range: '3–5',
    desc: 'Muncul sedikit tekanan psikologis, namun masih dalam tahap awal atau ringan. Kamu mungkin sesekali merasa gugup, khawatir, atau murung. Gejala ini biasanya belum terlalu mengganggu, tetapi sudah mulai terasa tidak nyaman.',
  },
  moderate: {
    label: 'Sedang',
    range: '6–8',
    desc: 'Tekanan psikologis berada pada tingkat sedang dan cukup bisa teramati oleh orang lain. Kamu mulai sering merasa cemas atau sedih. Biasanya kamu jadi sulit konsentrasi, serta pola tidur dan interaksi sosial terganggu.',
  },
  severe: {
    label: 'Berat',
    range: '9–12',
    desc: 'Tekanan psikologis tingkat tinggi yang membutuhkan perhatian serius. Gejala kecemasan dan depresi terjadi hampir setiap hari dan sangat menguras energi. Kondisi ini umumnya sangat mengganggu kemampuan kamu untuk belajar atau menjalani aktivitas harian.',
  },
}

export const PHQ4 = {
  id: 'phq4',
  type: 'phq4',
  title: 'PHQ-4 · Skrining Tekanan Psikologis',
  icon: '🩺',
  domain: 'anxiety',
  desc: 'Instrumen tervalidasi untuk mengukur tekanan psikologis (kecemasan & depresi) dalam 2 minggu terakhir.',
  source: 'PHQ-4 (Kroenke et al., 2009)',
  reference: 'https://saripediatri.org/index.php/sari-pediatri/article/view/3182',
  options: PHQ4_OPTIONS,
  questions: [
    { text: 'Merasa gugup, cemas, atau gelisah.', subscale: 'anxiety' },
    { text: 'Tidak bisa menghentikan atau mengendalikan rasa khawatir.', subscale: 'anxiety' },
    { text: 'Sedikit minat atau kesenangan dalam melakukan sesuatu.', subscale: 'depression' },
    { text: 'Merasa murung, tertekan, atau putus asa.', subscale: 'depression' },
  ],
}

export const QUIZZES = [
  PHQ4,
  {
    id: 'anxiety',
    title: 'Skrining Kecemasan',
    icon: '💭',
    domain: 'anxiety',
    desc: 'Mengukur seberapa sering kamu merasa cemas atau khawatir dalam 2 minggu terakhir.',
    questions: [
      { text: 'Aku merasa gugup, cemas, atau tegang tanpa sebab yang jelas.' },
      { text: 'Aku sulit menghentikan atau mengendalikan rasa khawatirku.' },
      { text: 'Pikiranku berputar terus dan susah tenang.' },
      { text: 'Aku mudah gelisah atau sulit duduk diam.' },
      { text: 'Aku merasa takut sesuatu yang buruk akan terjadi.' },
      { text: 'Aku menghindari situasi karena merasa cemas.' },
    ],
  },
  {
    id: 'mood',
    title: 'Skrining Suasana Hati',
    icon: '🌧️',
    domain: 'mood',
    desc: 'Mengukur perasaan sedih atau kehilangan minat dalam 2 minggu terakhir.',
    questions: [
      { text: 'Aku kehilangan minat pada hal yang biasanya kusukai.' },
      { text: 'Aku merasa sedih, hampa, atau putus asa.' },
      { text: 'Aku sulit tidur, atau malah tidur berlebihan.' },
      { text: 'Aku merasa lelah dan tidak berenergi.' },
      { text: 'Aku merasa tidak berharga atau bersalah.' },
      { text: 'Aku sulit berkonsentrasi saat belajar.' },
    ],
  },
  {
    id: 'stress',
    title: 'Skrining Stres',
    icon: '🌊',
    domain: 'stress',
    desc: 'Mengukur tingkat tekanan yang kamu rasakan belakangan ini.',
    questions: [
      { text: 'Aku merasa tidak mampu mengendalikan hal-hal penting dalam hidupku.' },
      { text: 'Aku merasa gugup atau tertekan oleh tuntutan tugas.' },
      { text: 'Aku merasa sulit mengatasi semua hal yang harus dilakukan.' },
      { text: 'Aku merasa mudah tersinggung atau marah.' },
      { text: 'Aku merasa masalah menumpuk tanpa bisa kulakukan apa-apa.' },
      { text: 'Aku merasa tidak punya waktu untuk beristirahat.' },
    ],
  },
  {
    id: 'sleep',
    title: 'Skrining Pola Tidur',
    icon: '🌙',
    domain: 'sleep',
    desc: 'Mengukur kualitas tidurmu dalam sebulan terakhir.',
    questions: [
      { text: 'Aku butuh waktu lama untuk bisa tertidur.' },
      { text: 'Aku terbangun di tengah malam dan sulit tidur lagi.' },
      { text: 'Aku bangun terlalu pagi dan tidak bisa tidur lagi.' },
      { text: 'Aku merasa tidak segar saat bangun pagi.' },
      { text: 'Aku mengantuk atau lelah di siang hari.' },
    ],
  },
  {
    id: 'academic',
    title: 'Skrining Beban Belajar',
    icon: '📚',
    domain: 'stress',
    desc: 'Mengukur tekanan akademik yang kamu rasakan.',
    questions: [
      { text: 'Aku merasa kewalahan dengan jumlah tugas dan ujian.' },
      { text: 'Aku takut gagal atau mengecewakan orang tua.' },
      { text: 'Aku sering menunda tugas karena merasa tertekan.' },
      { text: 'Aku merasa tidak cukup pintar dibanding teman-teman.' },
      { text: 'Belajar terasa melelahkan dan tidak menyenangkan lagi.' },
    ],
  },
]
