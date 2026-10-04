import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'

export default function GSearchArchitecture(){
  usePageTitle('GSearch Architecture')

  const curlCmd = `curl -X GET "https://gsearch-19c9.onrender.com/api/search?q=spring+boot"`
  const sampleJson = `{
  "query": "spring boot",
  "totalHits": 14,
  "aiSummary": "Spring Boot is an open-source Java framework that accelerates application development through opinionated starter dependencies, auto-configuration, and an embedded servlet container.",
  "results": [
    {
      "title": "Spring Boot Reference Documentation",
      "url": "https://spring.io/projects/spring-boot",
      "snippet": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications...",
      "tfidfScore": 5.482
    },
    {
      "title": "Building an Application with Spring Boot",
      "url": "https://spring.io/guides/gs/spring-boot",
      "snippet": "Learn how to build a RESTful web service with Spring Boot and standard starters...",
      "tfidfScore": 4.125
    }
  ]
}`

  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'GSearch', to:'/#projects' },
          { label:'System Architecture' },
        ]} />
        <div className="page-kicker">GSearch</div>
        <h1 className="page-title">System Architecture</h1>
        <p className="page-lede">Built as a deep-dive into how search engines actually work under the hood — a custom inverted index and TF-IDF ranking in plain MySQL, no Elasticsearch or Lucene, plus a RAG-grounded AI summary on top.</p>
        <div className="page-links">
          <a className="btn" href="https://gsearch-19c9.onrender.com" target="_blank" rel="noopener">Live Search Engine ↗</a>
          <a className="btn" href="https://github.com/arjunpjaiswal/GSearch" target="_blank" rel="noopener">GitHub ↗</a>
          <Link className="btn mint" to="/projects/gsearch/simulation">Backend Simulation →</Link>
        </div>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="arch-card">
          <div style={{ fontSize:'12px', color:'var(--mint)', marginBottom:'10px', fontWeight:600, letterSpacing:'0.04em' }}>END-TO-END SEARCH &amp; CRAWL PIPELINE</div>
          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-title">Web Pages</div>
              <div className="arch-node-desc">Jsoup HTML Fetch</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <div className="arch-node-title">Crawler Service</div>
              <div className="arch-node-desc">10-Thread BFS Pool</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-title">Indexer Service</div>
              <div className="arch-node-desc">Tokenize &amp; TF-IDF</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <div className="arch-node-title">MySQL Inverted Index</div>
              <div className="arch-node-desc">B-Tree index_entries</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node mint">
              <div className="arch-node-title">Groq (Llama 3)</div>
              <div className="arch-node-desc">RAG Grounded Summary</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-title">REST API</div>
              <div className="arch-node-desc">JSON Response</div>
            </div>
          </div>
        </div>

        <div className="block">
          <h3>Query path</h3>
          <ul className="flow-steps">
            <li><b>SearchController</b> receives <code>GET /api/search</code> and hands off to the service layer.</li>
            <li><b>SearchService</b> tokenizes the query — <code>"spring boot"</code> → <code>["spring","boot"]</code>.</li>
            <li>Each term is looked up in <code>index_entries</code>, the custom inverted index.</li>
            <li>TF-IDF scores are accumulated per document across all matched terms.</li>
            <li>Results are sorted by combined score and paginated via <code>subList()</code>.</li>
            <li>Full <code>Document</code> rows are fetched only for the current page (<code>FetchType.LAZY</code>) — no wasted reads on rows outside the page.</li>
            <li>The top 5 results are sent to <b>AISummaryService</b>, which calls Groq for a grounded summary.</li>
            <li>The assembled <code>SearchResponse</code> JSON is rendered by the frontend.</li>
          </ul>
        </div>

        <div className="block">
          <h3>Crawl path</h3>
          <ul className="flow-steps">
            <li><b>CrawlerService</b> runs breadth-first over a 10-thread <code>ExecutorService</code> pool, with a politeness delay and duplicate-URL detection via <code>ConcurrentHashMap</code>.</li>
            <li>Each page is fetched with Jsoup (static HTML only — no JS rendering).</li>
            <li><b>IndexerService</b> tokenizes the content and calculates its TF-IDF score.</li>
            <li><code>Document</code> and <code>IndexEntry</code> rows are saved atomically inside a single <code>@Transactional</code> boundary.</li>
            <li>Discovered links are self-submitted back into the thread pool as new crawl tasks.</li>
          </ul>
          <div className="callout mint">A scheduled job re-triggers the crawl daily at 2 AM to keep the index from going stale.</div>
        </div>

        <div className="block">
          <h3>Core tables</h3>
          <table className="spec-table">
            <thead><tr><th>Table</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>documents</td><td>One row per crawled page — url, title, snippet, content, crawled_at</td></tr>
              <tr><td>index_entries</td><td>One row per unique word per document — term, document_id, term_freq, tfidf_score, B-tree indexed</td></tr>
            </tbody>
          </table>
        </div>

        <div className="block">
          <h3>How ranking actually works</h3>
          <p><b>Inverted index</b> — every crawled page is tokenized into words, and each word maps to the documents containing it. A search becomes a direct index lookup instead of a full scan across every page.</p>
          <p><b>TF-IDF</b> — each term gets a relevance score: how often it appears in a document (TF) multiplied by how rare it is across the whole corpus (IDF). This is pre-calculated at crawl time inside the same transactional write, so search time only has to read, not compute.</p>
          <p><b>RAG summary</b> — the top 5 results are passed to Groq as context, constrained by a system prompt to summarize only what's in front of it — grounding rather than generating from general knowledge.</p>
        </div>

        <div className="block">
          <h3>Tech stack</h3>
          <table className="spec-table">
            <tbody>
              <tr><td>Backend</td><td>Spring Boot 3, Java 17</td></tr>
              <tr><td>Database</td><td>MySQL 8 (Spring Data JPA / Hibernate)</td></tr>
              <tr><td>Crawling</td><td>Jsoup</td></tr>
              <tr><td>AI Summary</td><td>Groq API (openai/gpt-oss-20b) via RestTemplate</td></tr>
              <tr><td>Frontend</td><td>Plain HTML/CSS/JS — voice search, favicons, AI Overview box, pagination, XSS protection</td></tr>
              <tr><td>Build</td><td>Gradle</td></tr>
              <tr><td>Hosting</td><td>Render (app) + Aiven (MySQL)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="block">
          <h3>REST API Contract</h3>
          <p>The backend exposes a clean, stateless JSON API. If the Render instance is cold-starting, you can view the exact contract and response structure below:</p>
          <div className="code-with-header">
            <div className="code-header">
              <span>cURL Request (GET /api/search)</span>
              <CopyButton text={curlCmd} label="Copy cURL" />
            </div>
            <div className="code-block">{curlCmd}</div>
          </div>
          <div className="code-with-header">
            <div className="code-header">
              <span>Sample JSON Response (200 OK)</span>
              <CopyButton text={sampleJson} label="Copy JSON" />
            </div>
            <div className="code-block">{sampleJson}</div>
          </div>
        </div>

        <div className="block">
          <h3>Known limitations</h3>
          <p style={{ marginBottom:0 }}>This is a deliberate MVP, not a production search system. Documented gaps: no stemming (run/running index as different terms), no exact phrase search, no robots.txt compliance, OFFSET-based pagination that degrades at deep pages, and no JavaScript rendering (static HTML only — Wikipedia, Baeldung, etc.).</p>
        </div>

        <div className="block">
          <h3>What V2 would add</h3>
          <p style={{ marginBottom:0 }}>Elasticsearch for BM25 ranking and horizontal scaling, trie-based autocomplete off the indexed terms, Redis caching for frequent queries, Kafka-backed distributed crawling, robots.txt compliance, PageRank-style link authority blended with TF-IDF, and Porter-stemmer normalization.</p>
        </div>

        <div className="nav-cards">
          <Link className="nav-card" to="/projects/gsearch/simulation">
            <div className="k">NEXT</div>
            <div className="t">Backend Simulation →</div>
            <div className="d">Watch a query move through the crawl → index → rank → summarize pipeline.</div>
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
