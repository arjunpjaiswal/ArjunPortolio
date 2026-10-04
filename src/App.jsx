import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TabBar from './components/TabBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import QueryBuilderArchitecture from './pages/projects/QueryBuilderArchitecture.jsx'
import QueryBuilderMethodology from './pages/projects/QueryBuilderMethodology.jsx'
import GSearchArchitecture from './pages/projects/GSearchArchitecture.jsx'
import GSearchSimulation from './pages/projects/GSearchSimulation.jsx'
import SmartEdTech from './pages/achievements/SmartEdTech.jsx'
import Patent from './pages/achievements/Patent.jsx'

function ScrollManager(){
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App(){
  return (
    <BrowserRouter>
      <ScrollManager />
      <TabBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/querybuilder/architecture" element={<QueryBuilderArchitecture />} />
        <Route path="/projects/querybuilder/methodology" element={<QueryBuilderMethodology />} />
        <Route path="/projects/gsearch/architecture" element={<GSearchArchitecture />} />
        <Route path="/projects/gsearch/simulation" element={<GSearchSimulation />} />
        <Route path="/achievements/smartedtech" element={<SmartEdTech />} />
        <Route path="/achievements/patent" element={<Patent />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
