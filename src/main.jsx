/* eslint-disable react-refresh/only-export-components -- entry file, not hot-reloaded */
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './portfolio.jsx'

// Project pages are split into their own chunks so the home page doesn't download them
const PassKruNgep = lazy(() => import('./project/passkru_ngep.jsx'))
const PassKruStartup = lazy(() => import('./project/passkru_startup.jsx'))
const FindMoy = lazy(() => import('./project/findmoy.jsx'))
const ProjectDetail = lazy(() => import('./project/project_detail.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/passkru_ngep" element={<PassKruNgep />} />
          <Route path="/project/passkru_startup" element={<PassKruStartup />} />
          <Route path="/project/findmoy" element={<FindMoy />} />
          {/* every other project; named routes above win over this one */}
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
