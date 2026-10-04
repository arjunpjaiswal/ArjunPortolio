import Breadcrumb from '../../components/Breadcrumb.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'

export default function SmartEdTech(){
  usePageTitle('SmartEdTech Case Study')
  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'Achievements', to:'/#achievements' },
          { label:'SmartEdTech' },
        ]} />
        <div className="page-kicker">Tech Sprint 2026 — hosted by GDG RBU</div>
        <h1 className="page-title">SmartEdTech 🎓</h1>
        <p className="page-lede">Built with team <b>ZenCode</b> over the course of the hackathon — a next-gen learning platform turning classrooms into interactive, AI-powered spaces.</p>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="result-banner">
          <div className="num">3rd</div>
          <div className="txt"><b>3rd Position</b> at Tech Sprint 2026, hosted by GDG RBU</div>
        </div>

        <div className="block">
          <h3>The problem</h3>
          <p style={{ marginBottom:0 }}>Overburdened teachers, and a lack of personalized feedback for students — the platform was built to take repetitive assessment work off instructors while giving each student feedback tuned to their own gaps, not a class average.</p>
        </div>

        <div className="block">
          <h3>What we built</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="t">🎥 Live Virtual Classroom</div>
              <div className="d">Jitsi Meet-powered broadcasts, real-time polls with live-updating results, integrated discussion chat, and automated attendance tracking.</div>
            </div>
            <div className="feature-card">
              <div className="t">🧠 AI-Powered Assessment Engine</div>
              <div className="d">Google Gemini and Groq (Llama 3) generate quizzes — MCQ, subjective, one-liner, or mixed — directly from uploaded PDF study material, then grade submissions with feedback on weak points.</div>
            </div>
            <div className="feature-card">
              <div className="t">📊 Teachers' Command Center</div>
              <div className="d">Real-time performance analytics, weakness heatmaps across the whole class, a centralized resource vault, and session scheduling.</div>
            </div>
            <div className="feature-card">
              <div className="t">🎒 Student Nexus</div>
              <div className="d">A 24/7 AI Study Buddy, access to shared materials, and a running history of past evaluation feedback.</div>
            </div>
          </div>
        </div>

        <div className="block">
          <h3>Tech stack</h3>
          <table className="spec-table">
            <tbody>
              <tr><td>Frontend</td><td>React 19, Vite, Tailwind CSS v4, React Router v7, Recharts, Lucide React</td></tr>
              <tr><td>Backend</td><td>Node.js, Express.js</td></tr>
              <tr><td>Database</td><td>Firebase Firestore</td></tr>
              <tr><td>AI</td><td>Google Gemini API (PDF analysis), Groq SDK (fast inference for grading &amp; quiz generation)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="block">
          <h3>Team ZenCode</h3>
          <p>Built alongside two teammates, with thanks to GDG RBU for organizing the hackathon.</p>
          <div className="people-list">
            <a href="https://www.linkedin.com/in/prajyot-korde-912621281/" target="_blank" rel="noopener">Prajyot Korde</a>
            <a href="https://www.linkedin.com/in/yash-debe-87a2322a1/" target="_blank" rel="noopener">Yash Debe</a>
            <a href="https://www.linkedin.com/company/gdg-rbu/" target="_blank" rel="noopener">GDG RBU (organizer)</a>
          </div>
        </div>
      </section>
    </main>
  )
}
