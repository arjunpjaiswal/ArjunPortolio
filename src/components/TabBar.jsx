import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SECTIONS = ['projects', 'experience', 'skills', 'achievements', 'contact']

export default function TabBar(){
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'
  const onAbout = pathname === '/about'
  const [activeSection, setActiveSection] = useState('')

  // Scroll-spy on Home page to highlight active tab
  useEffect(() => {
    if (!onHome) {
      setActiveSection('')
      return
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140
      let found = ''
      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            found = sectionId
            break
          }
        }
      }
      setActiveSection(found)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onHome])

  const handleNavClick = (sectionId, e) => {
    e.preventDefault()
    if (onHome) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', `/#${sectionId}`)
        setActiveSection(sectionId)
      }
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  return (
    <nav className="tabbar">
      <div className="tabbar-inner">
        <span className="tab-root">~/arjun-jaiswal</span>

        {/* About — dedicated page */}
        <Link
          to="/about"
          className={`tab ${onAbout ? 'is-active' : ''}`}
        >
          about.md
        </Link>

        <button
          type="button"
          onClick={(e) => handleNavClick('projects', e)}
          className={`tab ${onHome && activeSection === 'projects' ? 'is-active' : ''}`}
        >
          projects
        </button>
        <button
          type="button"
          onClick={(e) => handleNavClick('experience', e)}
          className={`tab ${onHome && activeSection === 'experience' ? 'is-active' : ''}`}
        >
          experience
        </button>
        <button
          type="button"
          onClick={(e) => handleNavClick('skills', e)}
          className={`tab ${onHome && activeSection === 'skills' ? 'is-active' : ''}`}
        >
          skills
        </button>
        <button
          type="button"
          onClick={(e) => handleNavClick('achievements', e)}
          className={`tab ${onHome && activeSection === 'achievements' ? 'is-active' : ''}`}
        >
          achievements
        </button>
        <button
          type="button"
          onClick={(e) => handleNavClick('contact', e)}
          className={`tab ${onHome && activeSection === 'contact' ? 'is-active' : ''}`}
        >
          contact
        </button>
        <a
          className="tab"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto', color: 'var(--amber)', fontWeight: 500 }}
          title="Open Resume PDF"
        >
          resume.pdf ↗
        </a>
      </div>
    </nav>
  )
}
