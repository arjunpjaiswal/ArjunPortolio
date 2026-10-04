import { useState } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../assets/profile.png'
import CopyButton from '../components/CopyButton.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function About() {
  usePageTitle('About — Arjun Pankaj Jaiswal')

  const [termCmd, setTermCmd] = useState('')
  const [termOutput, setTermOutput] = useState(null)

  const handleCommand = (e) => {
    e.preventDefault()
    const cmd = termCmd.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') { setTermOutput(null); setTermCmd(''); return }
    if (cmd === 'help') {
      setTermOutput([
        'Available commands:',
        '  whoami       — profile summary',
        '  resume       — opens resume.pdf',
        '  skills       — core tech stack',
        '  projects     — technical projects overview',
        '  patent       — patent & achievements',
        '  contact      — direct communication channels',
        '  clear        — reset console'
      ])
    } else if (cmd === 'whoami') {
      setTermOutput([
        'Arjun Pankaj Jaiswal',
        'Role: Backend Systems Engineer',
        'Education: B.Tech IT @ RCOEM, Nagpur (CGPA 8.34)',
        'Focus: Java, Spring Boot, JDBC, Database Internals, RAG Systems'
      ])
    } else if (cmd === 'resume') {
      window.open('/resume.pdf', '_blank')
      setTermOutput(['Opening /resume.pdf in a new tab...'])
    } else if (cmd === 'skills') {
      setTermOutput([
        'Core Stack:',
        '  • Java 17, Spring Boot 3, Spring Data JPA, JDBC, REST APIs',
        '  • MySQL, MongoDB, Inverted Indexing, TF-IDF',
        '  • Multithreading (ExecutorService), OOP, SOLID, Builder/DAO/Singleton'
      ])
    } else if (cmd === 'projects') {
      setTermOutput([
        '1. SQL QueryBuilder — Fluent SQL builder library on JitPack (43 JUnit tests, ACID transactions)',
        '2. GSearch — Custom search engine without ES/Lucene (10-thread crawler, MySQL TF-IDF, Groq RAG)'
      ])
    } else if (cmd === 'patent' || cmd === 'achievements') {
      setTermOutput([
        '• Registered Design Patent (Govt of India) — Smart Water Bottle',
        '• 3rd Place, Tech Sprint 2026 (GDG RBU) — SmartEdTech',
        '• 300+ Problems Solved on LeetCode'
      ])
    } else if (cmd === 'contact') {
      setTermOutput([
        'Email: arjunphj@gmail.com',
        'Phone: +91 93561 01760',
        'LinkedIn: linkedin.com/in/arjun-pankaj-jaiswal-b297752a2',
        'GitHub: github.com/arjunpjaiswal'
      ])
    } else {
      setTermOutput([`Command not found: ${cmd}`, 'Type "help" to see available commands.'])
    }
    setTermCmd('')
  }

  const runQuickCmd = (cmd) => {
    setTermCmd(cmd)
    setTimeout(() => {
      const event = new Event('submit', { cancelable: true, bubbles: true })
      document.getElementById('about-term-form')?.dispatchEvent(event)
    }, 10)
  }

  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[{ label: '~', to: '/' }, { label: 'about.md' }]} />
        <p className="page-kicker">01 · Who I Am</p>
        <h1 className="page-title">About Me</h1>
        <p className="page-lede">
          Final-year IT student at RCOEM, Nagpur, who likes understanding how things work underneath. I take apart existing projects and rebuild them, because that's the fastest way I know to get strong at the basics. I care about getting details right. I believe talent is built through hard work, perseverance and knowledge. This site doesn't just describe my projects; you can run them.
        </p>
        <div className="page-links">
          <a className="btn primary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">📄 Resume (PDF)</a>
          <a className="btn mint" href="https://github.com/arjunpjaiswal" target="_blank" rel="noopener">GitHub ↗</a>
          <a className="btn" href="https://www.linkedin.com/in/arjun-pankaj-jaiswal-b297752a2" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a className="btn" href="mailto:arjunphj@gmail.com">arjunphj@gmail.com</a>
          <CopyButton text="arjunphj@gmail.com" label="Copy Email" />
        </div>
      </div>

      {/* Photo + quick facts */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '48px', paddingBottom: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>
          <div className="editor-frame">
            <div className="editor-titlebar">
              <span className="dot r" /><span className="dot y" /><span className="dot g" />
              <span>profile.png</span>
            </div>
            <img className="editor-photo" src={profilePic} alt="Arjun Pankaj Jaiswal" />
            <div className="editor-caption">Nagpur, India · Final-Year IT</div>
          </div>

          <div>
            <div className="stat-pills" style={{ marginBottom: '20px' }}>
              <span className="stat-pill">CGPA 8.34</span>
              <span className="stat-pill">B.Tech IT · RCOEM</span>
              <span className="stat-pill">2023 – 2027</span>
              <span className="stat-pill mint">370+ LeetCode</span>
              <span className="stat-pill">Design Patent Granted</span>
            </div>

            <div className="block" style={{ marginBottom: '28px' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>Background</h3>
              <p>
                I'm a final-year Information Technology undergraduate who gravitates toward the invisible
                parts of software — query execution pipelines, thread-safe data structures, and the gap
                between "it works" and "it scales." My work lives closer to databases and runtimes than
                it does to UI frameworks.
              </p>
              <p style={{ marginTop: '10px' }}>
                My two major projects (<Link to="/projects/querybuilder/architecture" style={{ color: 'var(--amber)' }}>SQL QueryBuilder</Link> and{' '}
                <Link to="/projects/gsearch/architecture" style={{ color: 'var(--amber)' }}>GSearch</Link>) were built from scratch: QueryBuilder runs on plain JDBC,
                and GSearch has its own crawler, inverted index and TF-IDF ranking instead of Elasticsearch.
                Both are tested and you can run them on this site.
              </p>
            </div>

            <div className="block" style={{ marginBottom: '0' }}>
              <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>What Drives Me</h3>
              <p>
                I build to understand. When I use a tool like Spring or JDBC, I like to know what it does
                underneath, so I build a small version of it first. That's how I ended up writing a query
                builder and a search engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CLI */}
      <section>
        <div className="section-head">
          <span className="section-tag">CLI</span>
          <h2>Interactive Terminal</h2>
        </div>
        <div className="term-interactive">
          <form id="about-term-form" onSubmit={handleCommand} className="term-input-row">
            <span style={{ color: 'var(--mint)' }}>$</span>
            <input
              type="text"
              value={termCmd}
              onChange={(e) => setTermCmd(e.target.value)}
              placeholder="whoami (press enter or try 'help')"
              className="term-input"
              aria-label="Interactive terminal command line"
            />
            <button type="submit" className="btn small" style={{ padding: '2px 8px', fontSize: '11px' }}>Run</button>
          </form>
          <div className="term-hint">
            Try:{' '}
            <code style={{ cursor: 'pointer' }} onClick={() => runQuickCmd('help')}>help</code> ·{' '}
            <code style={{ cursor: 'pointer' }} onClick={() => runQuickCmd('whoami')}>whoami</code> ·{' '}
            <code style={{ cursor: 'pointer' }} onClick={() => runQuickCmd('skills')}>skills</code> ·{' '}
            <code style={{ cursor: 'pointer' }} onClick={() => runQuickCmd('contact')}>contact</code>
          </div>
          {termOutput && (
            <div className="term-output-box">
              {termOutput.map((line, idx) => (
                <div key={idx} className="term-out-line">{line}</div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience & Education */}
      <section>
        <div className="section-head">
          <span className="section-tag">XP</span>
          <h2>Experience &amp; Education</h2>
        </div>

        <div className="xp-item">
          <div className="xp-when">Aug 2024 — Present</div>
          <div>
            <p className="xp-role">Training &amp; Placement Coordinator</p>
            <p className="xp-org">IT Dept, Training &amp; Placement Cell — RCOEM</p>
            <ul>
              <li>Bridged communication between students and CDPC for placements, training sessions, and recruitment drives</li>
              <li>Guided students on recruitment prep, technical skill expectations, and the campus placement process</li>
              <li>Collected feedback on syllabus and aptitude prep to improve training programs</li>
              <li>Maintained student records and streamlined placement coordination workflows</li>
            </ul>
          </div>
        </div>

        <div className="xp-item">
          <div className="xp-when">2023 — 2027</div>
          <div>
            <p className="xp-role">B.Tech, Information Technology</p>
            <p className="xp-org">RCOEM, Nagpur — CGPA 8.34</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '13.5px', marginTop: '4px' }}>
              Focus on Operating Systems, Database Management Systems, Multithreading, Computer Networks,
              and Object-Oriented Software Architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <div className="section-head">
          <span className="section-tag">CTX</span>
          <h2>Get in Touch</h2>
        </div>
        <p>
          Open to backend engineering roles, internships, and conversations on systems design.
          If a project raised a question the demo didn't answer, reach out directly.
        </p>
        <div className="contact-links" style={{ alignItems: 'center' }}>
          <a className="btn primary" href="mailto:arjunphj@gmail.com">arjunphj@gmail.com</a>
          <a className="btn resume-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            📄 Resume
          </a>
          <a href="https://github.com/arjunpjaiswal" target="_blank" rel="noopener" style={{ color: 'var(--text-dim)', fontSize: '13px', marginLeft: '12px', textDecoration: 'underline' }}>GitHub</a>
          <a href="https://www.linkedin.com/in/arjun-pankaj-jaiswal-b297752a2" target="_blank" rel="noopener" style={{ color: 'var(--text-dim)', fontSize: '13px', marginLeft: '12px', textDecoration: 'underline' }}>LinkedIn</a>
        </div>
      </section>
    </main>
  )
}
