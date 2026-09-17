/* eslint-disable react-refresh/only-export-components -- entry file, not hot-reloaded */
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './portfolio.jsx'

// Project pages are split into their own chunks so the home page doesn't download them
const DinoGame = lazy(() => import('./project/dinogame.jsx'))
const WeatherAnalyzer = lazy(() => import('./project/weather_analyzer.jsx'))
const BeBadmintonUI = lazy(() => import('./project/be_ui.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/dinogame" element={<DinoGame />} />
          <Route path="/project/weather_analyzer" element={<WeatherAnalyzer />} />
          <Route path="/project/be_badminton_ui" element={<BeBadmintonUI />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
