import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Hub from './pages/Hub.jsx'
import Airline from './pages/Airline.jsx'
import Fashion from './pages/Fashion.jsx'
import Automobile from './pages/Automobile.jsx'
import Tourism from './pages/Tourism.jsx'
import RealEstate from './pages/RealEstate.jsx'
import Restaurant from './pages/Restaurant.jsx'
import Fitness from './pages/Fitness.jsx'
import TechSaas from './pages/TechSaas.jsx'
import Music from './pages/Music.jsx'
import Jewelry from './pages/Jewelry.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/airline" element={<Airline />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/automobile" element={<Automobile />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/realestate" element={<RealEstate />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/tech" element={<TechSaas />} />
        <Route path="/music" element={<Music />} />
        <Route path="/jewelry" element={<Jewelry />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
