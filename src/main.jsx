import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './portfolio.jsx'
import DinoGame from './project/dinogame.jsx'
import WeatherAnalyzer from './project/weather_analyzer.jsx'
import BeBadmintonUI from './project/be_ui.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/dinogame" element={<DinoGame />} />
        <Route path="/project/weather_analyzer" element={<WeatherAnalyzer />} />
        <Route path="/project/be_badminton_ui" element={<BeBadmintonUI />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
