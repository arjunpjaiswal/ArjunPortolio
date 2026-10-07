import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../assets/profile.png'
import CopyButton from '../components/CopyButton.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function Home(){
  usePageTitle('Backend Engineer')

  // Trigger staggered hero animations on mount
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const [termCmd, setTermCmd] = useState('')
  const [termOutput, setTermOutput] = useState(null)

  // State for GSearch preview widget
  const [activeSearchTab, setActiveSearchTab] = useState('spring')

  const searchDemos = {
    spring: {
      query: 'spring boot microservices',
      title: 'Spring Boot Reference Guide · tfidf: 5.48',
      summary: 'Spring Boot accelerates microservices with opinionated starters, embedded Tomcat, and production-ready metrics.',
      snippet: 'Automates configuration for standalone production apps with Spring Data, MVC, and Actuator.'
    },
    index: {
      query: 'custom inverted index mysql',
      title: 'Inverted Index Architecture · tfidf: 6.12',
      summary: 'Custom B-Tree mapped index_entries table maps unique terms to document IDs without external Lucene dependencies.',
      snippet: 'Term frequencies pre-calculated at ingestion time to keep read-path query latency sub-5ms.'
    },
    crawler: {
      query: 'multithreaded bfs web crawler',
      title: 'CrawlerService 10-Worker Pool · tfidf: 4.89',
      summary: 'Breadth-first crawling using a 10-thread ExecutorService pool with ConcurrentHashMap URL deduplication.',
      snippet: 'Thread-safe deduplication and polite fetch interval preventing target server rate-limits.'
    }
  }

  const handleCommand = (e) => {
    e.preventDefault()
    const cmd = termCmd.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setTermOutput(null)
      setTermCmd('')
      return
    }

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
        '2. GSearch — Custom search engine without ES/Lucene (10-thread crawler, MySQL TF-IDF, Groq RAG)',
        '3. Quora-Style Q&A API — REST API with JWT auth, BCrypt, JPA, paginated feed, nested comments'
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
      setTermOutput([
        `Command not found: ${cmd}`,
        'Type "help" to see available commands.'
      ])
    }
    setTermCmd('')
  }

  const runQuickCmd = (cmd) => {
    setTermCmd(cmd)
    setTimeout(() => {
      const event = new Event('submit', { cancelable: true, bubbles: true })
      document.getElementById('term-form')?.dispatchEvent(event)
    }, 10)
  }

  return (
    <main className="wrap">

      {/* ---------- Hero Section ---------- */}
      <section className="hero" id="about" style={{ borderTop: 'none' }}>
        <div className={`hero-two-col hero-fade ${heroVisible ? 'is-visible' : ''}`}>

          {/* Left column: all existing content — untouched */}
          <div className="hero-content-col">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Open to SDE roles · 2027 grad</span>
            </div>

            <h1 className="hero-name">Arjun Pankaj Jaiswal</h1>
            <p className="hero-subtitle">Java Backend Engineer · Nagpur, India</p>

            <p className="hero-statement">
              Java backend developer who likes understanding how things work under the hood. I build systems from scratch to go beyond the abstractions—currently exploring backend engineering through projects like my <Link to="/projects/gsearch/architecture">search engine</Link> and <Link to="/projects/querybuilder/architecture">SQL query builder</Link>. Graduating in 2027 and open to SDE roles.
            </p>

            <div className="hero-actions">
              <div className="hero-btns">
                <a className="btn primary" href="#projects">View Projects →</a>
                <a className="btn outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a>
              </div>

              <div className="hero-social-links">
                <a
                  href="https://github.com/arjunpjaiswal"
                  target="_blank"
                  rel="noopener"
                  className="social-link"
                  title="GitHub"
                  aria-label="GitHub profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/arjun-pankaj-jaiswal-b297752a2"
                  target="_blank"
                  rel="noopener"
                  className="social-link"
                  title="LinkedIn"
                  aria-label="LinkedIn profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:arjunphj@gmail.com"
                  className="social-link"
                  title="Email"
                  aria-label="Email Arjun"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column: photo with glow + bottom-fade mask */}
          <div className="hero-photo-wrap">
            <img
              className="hero-photo"
              src={profilePic}
              alt="Arjun Pankaj Jaiswal"
              loading="eager"
            />
          </div>

        </div>
      </section>


      {/* ---------- Projects Section (Dual-Column Bento Layout) ---------- */}
      <section id="projects">
        <div className="section-head">
          <span className="section-tag">02</span>
          <h2>Featured Systems</h2>
        </div>
        <p className="bento-project-desc" style={{ marginBottom:28, maxWidth:'70ch' }}>
          Each project has an architecture breakdown and an interactive demo.
        </p>

        {/* Project 1: SQL QueryBuilder */}
        <article className="bento-project">
          <div className="bento-grid">
            <div className="bento-content">
              <div>
                <div className="stat-pills">
                  <span className="stat-pill">★ 43 JUnit 5 Tests</span>
                  <span className="stat-pill">Zero-DB Mock CI</span>
                  <span className="stat-pill">Published JitPack v1.0.1</span>
                </div>
                <h3 className="bento-project-name">SQL QueryBuilder</h3>
                <p className="bento-project-desc">
                  A standalone Java library that constructs SQL queries through a fluent, chainable API instead of string concatenation. Published on JitPack, backed by a JDBC execution layer, a thread-safe Singleton connection manager, and 43 unit tests.
                </p>
                <div className="tag-row">
                  <span className="tag">Java 17</span><span className="tag">JDBC</span><span className="tag">Builder Pattern</span>
                  <span className="tag">DAO</span><span className="tag">SOLID</span><span className="tag">JitPack</span>
                </div>
              </div>
              <div className="link-row" style={{ alignItems: 'center' }}>
                <Link className="btn primary" to="/projects/querybuilder/architecture">System Architecture →</Link>
                <Link className="btn mint" to="/projects/querybuilder/methodology">Sandbox →</Link>
                <a href="https://github.com/arjunpjaiswal/sql-querybuilder-lib" target="_blank" rel="noopener" style={{ color: 'var(--text-dim)', fontSize: '13px', marginLeft: '12px', textDecoration: 'underline' }}>GitHub</a>
              </div>
            </div>

            {/* Right: Code Preview Pane */}
            <div className="bento-preview">
              <div className="preview-titlebar">
                <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                  <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                  <span style={{ marginLeft:'6px' }}>SelectQueryBuilder.java</span>
                </div>
                <span style={{ color:'var(--mint)' }}>JitPack: v1.0.1</span>
              </div>
              <pre className="code-preview-body">
                <span className="com">{`// Fluent chaining + bound parameters\n`}</span>
                <span className="kw">String</span> sql = <span className="kw">new</span> <span className="fn">SelectQueryBuilder</span>()<br />
                {'    .'}<span className="fn">select</span>(<span className="str">"u.name"</span>, <span className="str">"COUNT(o.id) AS orders"</span>)<br />
                {'    .'}<span className="fn">from</span>(<span className="str">"users u"</span>)<br />
                {'    .'}<span className="fn">innerJoin</span>(<span className="str">"orders o"</span>, <span className="str">"o.user_id = u.id"</span>)<br />
                {'    .'}<span className="fn">where</span>(<span className="str">"u.city = ?"</span>)<br />
                {'    .'}<span className="fn">groupBy</span>(<span className="str">"u.id"</span>, <span className="str">"u.name"</span>)<br />
                {'    .'}<span className="fn">having</span>(<span className="str">"COUNT(o.id) &gt;= ?"</span>)<br />
                {'    .'}<span className="fn">orderBy</span>(<span className="str">"orders"</span>, <span className="str">"DESC"</span>)<br />
                {'    .'}<span className="fn">limit</span>(10)<br />
                {'    .'}<span className="fn">build</span>();<br /><br />
                <span className="com">{`// Guarded execution via PreparedStatement\n`}</span>
                <span className="kw">List</span>&lt;<span className="kw">Map</span>&lt;<span className="kw">String</span>, <span className="kw">Object</span>&gt;&gt; rows =<br />
                {'    '}executor.<span className="fn">executeQuery</span>(sql, <span className="str">"Nagpur"</span>, 5);
              </pre>
            </div>
          </div>
        </article>

        {/* Project 2: GSearch Engine */}
        <article className="bento-project">
          <div className="bento-grid">
            <div className="bento-content">
              <div>
                <div className="stat-pills">
                  <span className="stat-pill mint">★ 10-Worker Thread Pool</span>
                  <span className="stat-pill mint">Custom Inverted Index</span>
                  <span className="stat-pill mint">TF-IDF in MySQL</span>
                  <span className="stat-pill mint">Groq Llama 3.1 RAG</span>
                </div>
                <h3 className="bento-project-name">GSearch</h3>
                <p className="bento-project-desc">
                  A full-text search engine built without Elasticsearch or Lucene. Features a multithreaded BFS web crawler, custom inverted index with TF-IDF relevance ranking inside MySQL B-Trees, and a Groq-powered RAG pipeline that grounds AI summaries strictly in retrieved documents to eliminate hallucination.
                </p>
                <div className="tag-row">
                  <span className="tag">Spring Boot 3</span><span className="tag">Jsoup</span><span className="tag">TF-IDF</span>
                  <span className="tag">MySQL</span><span className="tag">Groq / Llama 3.1</span><span className="tag">RAG</span>
                </div>
              </div>
              <div className="link-row" style={{ alignItems: 'center' }}>
                <Link className="btn primary" to="/projects/gsearch/architecture">System Architecture →</Link>
                <a className="btn mint" href="https://gsearch-19c9.onrender.com" target="_blank" rel="noopener">Live Demo ↗</a>
                <a href="https://github.com/arjunpjaiswal/GSearch" target="_blank" rel="noopener" style={{ color: 'var(--text-dim)', fontSize: '13px', marginLeft: '12px', textDecoration: 'underline' }}>GitHub</a>
              </div>
            </div>

            {/* Right: Search Mockup Widget */}
            <div className="bento-preview">
              <div className="preview-titlebar">
                <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                  <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                  <span style={{ marginLeft:'6px' }}>gsearch-pipeline</span>
                </div>
                <span style={{ color:'var(--amber)' }}>Interactive Preview</span>
              </div>
              <div className="search-mock-widget">
                <div className="search-mock-bar">
                  <span style={{ color:'var(--mint)' }}>🔍</span>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'12.5px', color:'var(--text)' }}>
                    {searchDemos[activeSearchTab].query}
                  </span>
                </div>
                <div className="search-mock-chips">
                  <span
                    className={`search-chip ${activeSearchTab === 'spring' ? 'active' : ''}`}
                    onClick={() => setActiveSearchTab('spring')}
                  >
                    Spring Boot
                  </span>
                  <span
                    className={`search-chip ${activeSearchTab === 'index' ? 'active' : ''}`}
                    onClick={() => setActiveSearchTab('index')}
                  >
                    Inverted Index
                  </span>
                  <span
                    className={`search-chip ${activeSearchTab === 'crawler' ? 'active' : ''}`}
                    onClick={() => setActiveSearchTab('crawler')}
                  >
                    BFS Crawler
                  </span>
                </div>
                <div className="search-mock-result">
                  <div className="ai-overview-tag">✦ Groq Llama 3.1 Grounded AI Overview</div>
                  <div style={{ fontSize:'12px', color:'var(--text)', marginBottom:'8px', lineHeight:1.5 }}>
                    {searchDemos[activeSearchTab].summary}
                  </div>
                  <div className="search-mock-title">{searchDemos[activeSearchTab].title}</div>
                  <div className="search-mock-snippet">{searchDemos[activeSearchTab].snippet}</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Project 3: Quora-Style Q&A Backend */}
        <article className="bento-project">
          <div className="bento-grid">
            <div className="bento-content">
              <div>
                <div className="stat-pills">
                  <span className="stat-pill" style={{ background: 'rgba(147,112,219,0.13)', color: '#b48ef7' }}>★ JWT + BCrypt Auth</span>
                  <span className="stat-pill" style={{ background: 'rgba(147,112,219,0.13)', color: '#b48ef7' }}>Nested Comments</span>
                  <span className="stat-pill" style={{ background: 'rgba(147,112,219,0.13)', color: '#b48ef7' }}>Paginated Feed</span>
                  <span className="stat-pill" style={{ background: 'rgba(147,112,219,0.13)', color: '#b48ef7' }}>UUID Keys</span>
                </div>
                <h3 className="bento-project-name">Quora-Style Q&amp;A Backend</h3>
                <p className="bento-project-desc">
                  A production-grade REST API for a Q&amp;A platform covering users, questions with topic tags, answers, nested comments, likes, and follows — with UUID primary keys, many-to-many topics, and a global exception handler for consistent JSON errors. Stateless JWT authentication with BCrypt password hashing; profile and answer edits are owner-restricted (403 otherwise). Features a paginated feed of questions from followed users, newest-first with a capped page size.
                </p>
                <div className="tag-row">
                  <span className="tag">Java 17</span><span className="tag">Spring Boot</span><span className="tag">Spring Security</span>
                  <span className="tag">JPA/Hibernate</span><span className="tag">MySQL</span><span className="tag">JWT</span><span className="tag">BCrypt</span>
                </div>
              </div>
              <div className="link-row" style={{ alignItems: 'center' }}>
                <a href="https://github.com/arjunpjaiswal/quora-api" target="_blank" rel="noopener" className="btn primary">GitHub →</a>
              </div>
            </div>

            {/* Right: Code Preview Pane */}
            <div className="bento-preview">
              <div className="preview-titlebar">
                <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                  <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                  <span style={{ marginLeft:'6px' }}>JwtAuthFilter.java</span>
                </div>
                <span style={{ color:'#b48ef7' }}>Spring Security</span>
              </div>
              <pre className="code-preview-body">
                <span className="com">{`// Stateless JWT filter — no session stored\n`}</span>
                <span className="kw">String</span> token = request<br />
                {'    .'}<span className="fn">getHeader</span>(<span className="str">"Authorization"</span>)<br />
                {'    .'}<span className="fn">substring</span>(7);<br /><br />
                <span className="kw">String</span> email = jwtUtil.<span className="fn">extractEmail</span>(token);<br />
                UserDetails user = userService<br />
                {'    .'}<span className="fn">loadUserByUsername</span>(email);<br /><br />
                <span className="com">{`// Validate & inject into SecurityContext\n`}</span>
                <span className="kw">if</span> (jwtUtil.<span className="fn">isValid</span>(token, user)) {'{'}<br />
                {'    '}<span className="kw">var</span> auth = <span className="kw">new</span> <span className="fn">UsernamePasswordAuthenticationToken</span>(<br />
                {'        '}user, <span className="kw">null</span>, user.<span className="fn">getAuthorities</span>());<br />
                {'    '}SecurityContextHolder.<span className="fn">getContext</span>()<br />
                {'        .'}<span className="fn">setAuthentication</span>(auth);<br />
                {'}'}
              </pre>
            </div>
          </div>
        </article>
      </section>

      {/* ---------- Categorized Visual Skill Cards ---------- */}
      <section id="skills">
        <div className="section-head">
          <span className="section-tag">03</span>
          <h2>Technical Skills &amp; Stack</h2>
        </div>
        <div className="skills-deck">
          {/* Card 1 */}
          <div className="skill-deck-card">
            <div className="skill-deck-header">
              <div className="skill-deck-icon">{`{ }`}</div>
              <div className="skill-deck-title">Languages &amp; Core</div>
            </div>
            <div className="skill-pills-wrap">
              <span className="skill-badge">Java 17</span>
              <span className="skill-badge">SQL (MySQL)</span>
              <span className="skill-badge">JavaScript</span>
              <span className="skill-badge">HTML5 &amp; CSS3</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="skill-deck-card">
            <div className="skill-deck-header">
              <div className="skill-deck-icon mint">⚙</div>
              <div className="skill-deck-title">Backend &amp; Systems</div>
            </div>
            <div className="skill-pills-wrap">
              <span className="skill-badge">Spring Boot 3</span>
              <span className="skill-badge">Spring Data JPA</span>
              <span className="skill-badge">Spring Security</span>
              <span className="skill-badge">JDBC</span>
              <span className="skill-badge">RESTful APIs</span>
              <span className="skill-badge">JWT / BCrypt</span>
              <span className="skill-badge">Multithreading (ExecutorService)</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="skill-deck-card">
            <div className="skill-deck-header">
              <div className="skill-deck-icon blue">🗄</div>
              <div className="skill-deck-title">Databases &amp; Search Internals</div>
            </div>
            <div className="skill-pills-wrap">
              <span className="skill-badge">MySQL 8</span>
              <span className="skill-badge">Inverted Indexing</span>
              <span className="skill-badge">TF-IDF Ranking</span>
              <span className="skill-badge">B-Tree Indexes</span>
              <span className="skill-badge">Connection Pooling</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="skill-deck-card">
            <div className="skill-deck-header">
              <div className="skill-deck-icon coral">🛠</div>
              <div className="skill-deck-title">Design Patterns &amp; Tooling</div>
            </div>
            <div className="skill-pills-wrap">
              <span className="skill-badge">SOLID Principles</span>
              <span className="skill-badge">Builder &amp; Singleton Pattern</span>
              <span className="skill-badge">DAO &amp; MVC</span>
              <span className="skill-badge">JUnit 5 Testing</span>
              <span className="skill-badge">Git &amp; GitHub</span>
              <span className="skill-badge">Maven &amp; Gradle</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Visual Trophy Achievements ---------- */}
      <section id="achievements">
        <div className="section-head">
          <span className="section-tag">04</span>
          <h2>Achievements &amp; Distinctions</h2>
        </div>
        <div className="trophy-grid">
          {/* Trophy 1 */}
          <Link to="/achievements/patent" className="trophy-card patent">
            <div>
              <div className="trophy-badge gold">Govt. of India Granted</div>
              <div className="trophy-title">Smart Water Bottle (Design Patent)</div>
              <div className="trophy-desc">
                Granted registered design patent protecting IoT health monitoring form factor. 1st Place at Create2Innovate Patent Fest &amp; Merit Award at Ideathon'25.
              </div>
            </div>
            <div className="trophy-footer">View Patent Details →</div>
          </Link>

          {/* Trophy 2 */}
          <Link to="/achievements/smartedtech" className="trophy-card hackathon">
            <div>
              <div className="trophy-badge mint">🏆 3rd Place · GDG RBU</div>
              <div className="trophy-title">SmartEdTech Platform</div>
              <div className="trophy-desc">
                Built alongside team ZenCode during Tech Sprint 2026. Interactive AI-driven virtual classroom with real-time PDF quiz generation and weak-point heatmaps.
              </div>
            </div>
            <div className="trophy-footer">Read Case Study →</div>
          </Link>

          {/* Trophy 3 */}
          <a href="https://leetcode.com/u/arjunpjaiswal/" target="_blank" rel="noopener" className="trophy-card leetcode">
            <div>
              <div className="trophy-badge blue">⚡ Algorithmic Problem Solving</div>
              <div className="trophy-title">300+ LeetCode Solutions</div>
              <div className="trophy-desc">
                Consistent focus on core Data Structures &amp; Algorithms — trees, graphs, dynamic programming, binary search, and multithreaded systems.
              </div>
            </div>
            <div className="trophy-footer" style={{ color:'var(--blue)' }}>LeetCode: arjunpjaiswal ↗</div>
          </a>
        </div>
      </section>

      {/* ---------- Experience & Education Timeline ---------- */}
      <section id="experience">
        <div className="section-head">
          <span className="section-tag">05</span>
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
            <p style={{ color:'var(--text-dim)', fontSize:'13.5px', marginTop:'4px' }}>
              Focus on Operating Systems, Database Management Systems, Multithreading, Computer Networks, and Object-Oriented Software Architecture.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Contact Section ---------- */}
      <section id="contact" className="contact">
        <div className="section-head">
          <span className="section-tag">06</span>
          <h2>Get in Touch</h2>
        </div>
        <p>
          Open to backend engineering roles, internships, and conversations on systems design. If a project above raised a question the demo didn't answer, reach out directly.
        </p>
        <div className="contact-links" style={{ alignItems:'center' }}>
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
