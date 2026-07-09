import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { TitlePage } from './pages/TitlePage'
import { WatchPage } from './pages/WatchPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="title/:titleId" element={<TitlePage />} />
        <Route path="watch/:titleId" element={<WatchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
