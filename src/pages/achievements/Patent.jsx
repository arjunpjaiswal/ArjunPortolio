import Breadcrumb from '../../components/Breadcrumb.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'

export default function Patent(){
  usePageTitle('Smart Water Bottle Patent')
  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'Achievements', to:'/#achievements' },
          { label:'Smart Water Bottle' },
        ]} />
        <div className="page-kicker">Registered Design Patent — Government of India</div>
        <h1 className="page-title">Smart Water Bottle</h1>
        <p className="page-lede">Started as a simple observation: people often don't drink enough water, and frequently forget to take medicines on time. That turned into a Government of India design patent plus two competition wins.</p>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="block">
          <h3>The idea</h3>
          <p style={{ marginBottom:0 }}>A system that tracks water intake based on weather conditions and personal health factors, while ensuring timely medication adherence — leveraging AI and IoT for smart, personalized health monitoring.</p>
        </div>

        <div className="block">
          <h3>Recognition</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="t">🇮🇳 Registered Design Patent</div>
              <div className="d">Granted by the Government of India, protecting the unique form factor and structural design of the concept.</div>
            </div>
            <div className="feature-card">
              <div className="t">🏆 1st Position</div>
              <div className="d">Create2Innovate Patent Fest, RBUCON'25 — organized by ACM RCOEM.</div>
            </div>
            <div className="feature-card">
              <div className="t">🏅 Merit Award</div>
              <div className="d">Ideathon'25, Technology Startup category — organized by RCOEM TBI Foundation.</div>
            </div>
          </div>
        </div>

        <div className="block">
          <h3>Team</h3>
          <div className="people-list">
            <a href="https://www.linkedin.com/in/yash-debe-87a2322a1/" target="_blank" rel="noopener">Yash Debe</a>
            <a href="https://www.linkedin.com/in/palak-dhawan-32700a30b/" target="_blank" rel="noopener">Palak Dhawan</a>
            <a href="https://www.linkedin.com/in/shrina-handoo-505823292/" target="_blank" rel="noopener">Shrina Handoo</a>
            <a href="https://www.linkedin.com/in/vinit-mutha-9a450a296/" target="_blank" rel="noopener">Vinit Mutha</a>
            <a href="https://www.linkedin.com/in/bhuvan-dixit-ab432432b/" target="_blank" rel="noopener">Bhuvan Dixit</a>
          </div>
        </div>

        <div className="block">
          <h3>Mentors &amp; guide</h3>
          <div className="people-list">
            <a href="https://www.linkedin.com/in/ssbalpande/" target="_blank" rel="noopener">Dr. Suresh S. Balpande</a>
            <a href="https://www.linkedin.com/in/dr-rakesh-k-kadu-361726a0/" target="_blank" rel="noopener">Dr. Rakesh K. Kadu</a>
            <a href="https://www.linkedin.com/in/pratibha-bhake-kokardekar-519a4652/" target="_blank" rel="noopener">Prof. Pratibha Bhake Kokardekar</a>
            <a href="https://www.linkedin.com/in/chetanathaokar/" target="_blank" rel="noopener">Dr. Chetana B Thaokar (Guide)</a>
          </div>
        </div>

        <div className="block">
          <h3>Institution</h3>
          <p style={{ marginBottom:0 }}>Ramdeobaba University (RBU), Nagpur — Shri Ramdeobaba College of Engineering and Management.</p>
        </div>
      </section>
    </main>
  )
}
