import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { SeriesPage } from './pages/SeriesPage'
import { WatchPage } from './pages/WatchPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="series/:titleId" element={<SeriesPage />} />
        <Route path="watch/:titleId" element={<WatchPage />} />
        <Route path="watch/:titleId/:episodeId" element={<WatchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
