import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'
import sandboxHtml from '../../demos/querybuilder-sandbox.html?raw'

export default function QueryBuilderMethodology(){
  usePageTitle('QueryBuilder Methodology')

  const jitpackXml = `<dependency>
    <groupId>com.github.arjunpjaiswal.sql-querybuilder-lib</groupId>
    <artifactId>sql-querybuilder-core</artifactId>
    <version>1.0.1</version>
</dependency>`

  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'SQL QueryBuilder', to:'/#projects' },
          { label:'Implementation Methodology' },
        ]} />
        <div className="page-kicker">SQL QueryBuilder</div>
        <h1 className="page-title">Implementation Methodology</h1>
        <p className="page-lede">How the library was actually built and verified — the pattern choice, the SOLID discipline behind it, and the test suite that backs it up.</p>
        <div className="page-links">
          <Link className="btn" to="/projects/querybuilder/architecture">← System Architecture</Link>
          <a className="btn" href="https://github.com/arjunpjaiswal/sql-querybuilder-lib" target="_blank" rel="noopener">Source ↗</a>
        </div>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="block">
          <h3>Why the Builder pattern</h3>
          <p>Raw SQL string concatenation is both brittle (order-dependent, easy to malform) and dangerous (the direct path to injection). A fluent, chainable API makes complex queries readable in the order a person thinks about them — <code>select → from → where → orderBy → limit</code> — while every value still flows through a bound <code>PreparedStatement</code> underneath.</p>
        </div>

        <div className="block">
          <h3>SOLID, applied deliberately</h3>
          <table className="spec-table">
            <thead><tr><th>Principle</th><th>Where it shows up</th></tr></thead>
            <tbody>
              <tr><td>Single Responsibility</td><td>Each class does one job — build SQL, execute SQL, manage the connection, handle transactions, or handle one entity's CRUD</td></tr>
              <tr><td>Open/Closed</td><td>New builders or DAOs can be added without touching existing ones</td></tr>
              <tr><td>Liskov Substitution</td><td><code>SelectQueryBuilder</code> works anywhere an <code>IQueryBuilder</code> is expected</td></tr>
              <tr><td>Interface Segregation</td><td><code>IQueryBuilder</code> (SELECT) is kept separate from <code>IMutationBuilder</code> (INSERT/UPDATE/DELETE)</td></tr>
              <tr><td>Dependency Inversion</td><td>DAOs depend on builder interfaces, not concrete classes; <code>QueryExecutor</code> depends on <code>java.sql.Connection</code>, not a specific driver</td></tr>
            </tbody>
          </table>
        </div>

        <div className="block">
          <h3>Test strategy — 43 tests, zero database dependency</h3>
          <p>Every builder test asserts on the generated SQL string and parameter order, not on a live database — so the full suite runs in CI or offline with no MySQL instance required. Organized with JUnit 5 <code>@Nested</code> classes by builder:</p>
          <table className="spec-table">
            <thead><tr><th>Group</th><th>Tests</th><th>Covers</th></tr></thead>
            <tbody>
              <tr><td>SelectQueryBuilderTest</td><td>23</td><td>WHERE, AND, OR, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT, OFFSET, DISTINCT, subqueries, reset()</td></tr>
              <tr><td>InsertTests</td><td>5</td><td>Value binding order, generated-key retrieval</td></tr>
              <tr><td>UpdateTests</td><td>6</td><td>SET clause construction, value ordering</td></tr>
              <tr><td>DeleteTests</td><td>6</td><td>WHERE-clause requirement, guard exceptions</td></tr>
              <tr><td>InterfaceContractTests</td><td>3</td><td><code>IMutationBuilder</code> assignability across builders</td></tr>
            </tbody>
          </table>
          <div className="code-block">{`mvn test -pl sql-querybuilder-core

Tests run: 43, Failures: 0, Errors: 0
BUILD SUCCESS`}</div>
        </div>

        <div className="block">
          <h3>Packaging methodology</h3>
          <p>Published to JitPack rather than left as a clone-and-read repo, specifically so it could be pulled into another project as a real Maven/Gradle dependency:</p>
          <div className="code-with-header">
            <div className="code-header">
              <span>pom.xml (JitPack Dependency)</span>
              <CopyButton text={jitpackXml} label="Copy XML" />
            </div>
            <div className="code-block">{jitpackXml}</div>
          </div>
          <p>The core/demo split exists so the demo module has to consume <code>core</code> exactly the way an outside project would — through the published artifact's public API, not through package-private shortcuts a single-module layout would allow.</p>
        </div>

        <div className="block">
          <h3>Safety by construction</h3>
          <p><code>UpdateQueryBuilder.build()</code> and <code>DeleteQueryBuilder.build()</code> throw <code>IllegalStateException</code> if no WHERE clause was set — an accidental table-wide mutation fails loudly before it ever reaches the database, not silently after.</p>
          <div className="callout mint">
            <b>Builder reuse:</b> a single builder instance can be reset and reused — <code>b.reset()</code> clears all accumulated state so the same object can construct an unrelated query next, without re-instantiating.
          </div>
        </div>

        <div className="block">
          <h3>Try it yourself</h3>
          <p>This sandbox reproduces the builder's real chaining rules and validation guards — it's the interaction model of the library, running in your browser.</p>
          <div className="demo-frame">
            <div className="editor-titlebar">
              <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
              <span>sandbox — build a query below</span>
            </div>
            <iframe srcDoc={sandboxHtml} title="SQL QueryBuilder interactive sandbox" loading="lazy" />
          </div>
          <div className="demo-note" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); const w = window.open(); w.document.write(sandboxHtml); w.document.close(); }} style={{ color: 'var(--amber)' }}>Open full screen ↗</a>
          </div>
        </div>

        <div className="nav-cards">
          <Link className="nav-card" to="/projects/querybuilder/architecture">
            <div className="k">BACK</div>
            <div className="t">← System Architecture</div>
            <div className="d">Module layout, the builder/JDBC/DAO layers, and how this fits next to JPA.</div>
          </Link>
          <a className="nav-card" href="https://github.com/arjunpjaiswal/sql-querybuilder-lib" target="_blank" rel="noopener">
            <div className="k">SOURCE</div>
            <div className="t">GitHub repository ↗</div>
            <div className="d">Full source, JitPack install instructions, and the 18-section demo.</div>
          </a>
        </div>
      </section>
    </main>
  )
}
