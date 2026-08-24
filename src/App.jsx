import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ResultInput from './pages/ResultInput.jsx'
import Understand from './pages/Understand.jsx'
import Personalize from './pages/Personalize.jsx'
import Pathway from './pages/Pathway.jsx'
import Actions from './pages/Actions.jsx'
import Breathing from './pages/Breathing.jsx'
import Help from './pages/Help.jsx'
import Safety from './pages/Safety.jsx'
import Wellbeing from './pages/Wellbeing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Screening from './pages/Screening.jsx'
import Quiz from './pages/Quiz.jsx'
import Articles from './pages/Articles.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import HelpFriend from './pages/HelpFriend.jsx'
import Community from './pages/Community.jsx'
import Settings from './pages/Settings.jsx'
import Chat from './pages/Chat.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/result" element={<ResultInput />} />
        <Route path="/understand" element={<Understand />} />
        <Route path="/personalize" element={<Personalize />} />
        <Route path="/pathway" element={<Pathway />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/jurnal" element={<Wellbeing />} />
        <Route path="/journal" element={<Navigate to="/jurnal" replace />} />
        <Route path="/mood" element={<Navigate to="/jurnal?tab=tren" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/bantu-teman" element={<HelpFriend />} />
        <Route path="/komunitas" element={<Community />} />
        <Route path="/pengaturan" element={<Settings />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
