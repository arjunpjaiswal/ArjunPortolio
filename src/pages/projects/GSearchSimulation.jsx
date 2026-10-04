import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'
import simulationHtml from '../../demos/gsearch-simulation.html?raw'

export default function GSearchSimulation(){
  usePageTitle('GSearch Simulation')
  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'GSearch', to:'/#projects' },
          { label:'Backend Simulation' },
        ]} />
        <div className="page-kicker">GSearch</div>
        <h1 className="page-title">Backend Simulation</h1>
        <p className="page-lede">A step-by-step walk through the crawl → index → rank → summarize pipeline, the way the real backend processes a query — no server required to watch it happen.</p>
        <div className="page-links">
          <Link className="btn" to="/projects/gsearch/architecture">← System Architecture</Link>
          <a className="btn" href="https://gsearch-19c9.onrender.com" target="_blank" rel="noopener">Live Search Engine ↗</a>
          <a className="btn" href="https://github.com/arjunpjaiswal/GSearch" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="demo-frame">
          <div className="editor-titlebar">
            <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
            <span>simulation — watch a query move through the pipeline</span>
          </div>
          <iframe srcDoc={simulationHtml} title="GSearch backend pipeline simulation" loading="lazy" />
        </div>
        <div className="demo-note" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>This is a simulation of the pipeline's logic, not a live connection to the deployed database — for that, use the live link above.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); const w = window.open(); w.document.write(simulationHtml); w.document.close(); }} style={{ color: 'var(--amber)' }}>Open full screen ↗</a>
        </div>

        <div className="nav-cards" style={{ marginTop:48 }}>
          <Link className="nav-card" to="/projects/gsearch/architecture">
            <div className="k">BACK</div>
            <div className="t">← System Architecture</div>
            <div className="d">Query path, crawl path, core tables, and what V2 would add.</div>
          </Link>
          <a className="nav-card" href="https://gsearch-19c9.onrender.com" target="_blank" rel="noopener">
            <div className="k">LIVE</div>
            <div className="t">Try the real deployment ↗</div>
            <div className="d">First load can take 30–60s on Render's free tier. Try "java" or "algorithm".</div>
          </a>
        </div>
      </section>
    </main>
  )
}
