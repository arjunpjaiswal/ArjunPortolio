import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb.jsx'
import { usePageTitle } from '../../hooks/usePageTitle.js'

export default function QueryBuilderArchitecture(){
  usePageTitle('QueryBuilder Architecture')

  return (
    <main className="wrap">
      <div className="page-header">
        <Breadcrumb trail={[
          { label:'Home', to:'/' },
          { label:'SQL QueryBuilder', to:'/#projects' },
          { label:'System Architecture' },
        ]} />
        <div className="page-kicker">SQL QueryBuilder</div>
        <h1 className="page-title">System Architecture</h1>
        <p className="page-lede">Two Maven modules under a parent aggregator: <code>core</code> is the published library, <code>demo</code> is a runnable e-commerce example that consumes <code>core</code> exactly the way an external project would.</p>
        <div className="page-links">
          <a className="btn" href="https://github.com/arjunpjaiswal/sql-querybuilder-lib" target="_blank" rel="noopener">Source on GitHub ↗</a>
          <Link className="btn mint" to="/projects/querybuilder/methodology">Implementation Methodology →</Link>
        </div>
      </div>

      <section style={{ borderTop:'none' }}>
        <div className="arch-card">
          <div style={{ fontSize:'12px', color:'var(--mint)', marginBottom:'10px', fontWeight:600, letterSpacing:'0.04em' }}>SYSTEM EXECUTION PIPELINE</div>
          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-title">Caller / DAO</div>
              <div className="arch-node-desc">UserDAO / Service</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <div className="arch-node-title">Fluent Builder</div>
              <div className="arch-node-desc">IQuery / IMutation</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-title">Guards &amp; SQL</div>
              <div className="arch-node-desc">? Parameter Binding</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <div className="arch-node-title">QueryExecutor</div>
              <div className="arch-node-desc">PreparedStatement &amp; Tx</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node mint">
              <div className="arch-node-title">DatabaseConn</div>
              <div className="arch-node-desc">Double-Checked Lock</div>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-title">MySQL 8</div>
              <div className="arch-node-desc">JDBC Driver Exec</div>
            </div>
          </div>
        </div>

        <div className="block">
          <h3>Module layout</h3>
          <p>The library and its usage example are deliberately separate Maven modules — <code>demo</code> depends on <code>core</code> via the same JitPack coordinates any external consumer would use, so the example never has private access to internals.</p>
          <div className="code-block">{`sql-querybuilder/
├── pom.xml                              ← Parent aggregator (packaging=pom)
├── sql-querybuilder-core/               ← THE LIBRARY — published to JitPack
│   └── src/main/java/com/querybuilder/
│       ├── core/                        ← Builder layer
│       │   ├── IQueryBuilder.java           SELECT builder interface
│       │   ├── IMutationBuilder.java        INSERT/UPDATE/DELETE interface
│       │   ├── SelectQueryBuilder.java
│       │   ├── InsertQueryBuilder.java
│       │   ├── UpdateQueryBuilder.java
│       │   └── DeleteQueryBuilder.java
│       └── jdbc/                        ← JDBC layer
│           ├── DatabaseConnection.java      Singleton, double-checked locking
│           ├── QueryExecutor.java           PreparedStatement execution
│           └── TransactionManager.java      ACID transaction handling
└── sql-querybuilder-demo/                ← Usage example (not published)
    ├── schema.sql
    └── src/main/java/com/querybuilder/
        ├── model/    User.java, Product.java, Order.java
        ├── dao/      UserDAO.java, ProductDAO.java, OrderDAO.java
        └── Main.java  ← 18-section walkthrough of every feature`}</div>
        </div>

        <div className="block">
          <h3>Builder layer</h3>
          <p>Two segregated interfaces keep read and write concerns from leaking into each other — code that only needs to run a <code>SELECT</code> never sees mutation methods, and vice versa.</p>
          <table className="spec-table">
            <thead><tr><th>Component</th><th>Responsibility</th></tr></thead>
            <tbody>
              <tr><td>IQueryBuilder</td><td>Contract for SELECT-only builders</td></tr>
              <tr><td>IMutationBuilder</td><td>Contract for INSERT / UPDATE / DELETE builders</td></tr>
              <tr><td>SelectQueryBuilder</td><td>WHERE / AND / JOIN / GROUP BY / HAVING / ORDER BY / LIMIT / DISTINCT / subqueries</td></tr>
              <tr><td>InsertQueryBuilder</td><td>Column/value binding, returns generated keys via the executor</td></tr>
              <tr><td>UpdateQueryBuilder / DeleteQueryBuilder</td><td>Guarded — throw <code>IllegalStateException</code> if built without a WHERE clause</td></tr>
            </tbody>
          </table>
        </div>

        <div className="block">
          <h3>JDBC layer</h3>
          <ul className="flow-steps">
            <li><b>DatabaseConnection</b> — Singleton connection manager, thread-safe initialization via double-checked locking; reads its target database from JVM system properties (<code>db.url</code>, <code>db.user</code>, <code>db.password</code>) rather than any hardcoded value.</li>
            <li><b>QueryExecutor</b> — runs builder output through <code>PreparedStatement</code>, maps <code>ResultSet</code> rows via <code>ResultSetMetaData</code>, exposes <code>executeQuery</code>, <code>executeUpdate</code>, and <code>executeInsertGetKey</code>.</li>
            <li><b>TransactionManager</b> — wraps multi-step operations (stock check → insert order → decrement stock) in a single transaction with automatic rollback if any step fails.</li>
          </ul>
        </div>

        <div className="block">
          <h3>DAO layer</h3>
          <p>Entity-level methods (<code>findByCity</code>, <code>findByAgeRange</code>, <code>searchByName</code>) sit on top of the builder + executor, so calling code never touches SQL directly. Applied across <code>User</code>, <code>Product</code>, and <code>Order</code> in the demo module.</p>
        </div>

        <div className="block">
          <h3>Where this sits next to Spring Data JPA</h3>
          <p>The library isn't a JPA replacement — it's built to run <em>alongside</em> it, sharing the same <code>DataSource</code>. JPA handles simple CRUD and relationship mapping; the builder + <code>JdbcTemplate</code> takes over where JPA gets awkward — dynamic filters, multi-table aggregation, GROUP BY / HAVING reports.</p>
          <div className="code-block">{`// JPA — simple, declarative
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByCity(String city);
}

`}<span className="hl2">{`// Builder + JdbcTemplate — dynamic, multi-table
`}</span>{`@Service
public class UserReportService {
    @Autowired JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> topSpenders(double min) {
        String sql = new `}<span className="hl">SelectQueryBuilder</span>{`()
            .select("u.name", "SUM(o.total_price) AS total")
            .from("users u")
            .innerJoin("orders o", "o.user_id = u.id")
            .groupBy("u.id", "u.name")
            .having("SUM(o.total_price) > ?")
            .orderBy("total", "DESC")
            .build();
        return jdbcTemplate.queryForList(sql, min);
    }
}`}</div>
        </div>

        <div className="block">
          <h3>Security architecture</h3>
          <ul className="flow-steps">
            <li>Every value is bound through <code>PreparedStatement ?</code> placeholders — never string-concatenated — which is what removes SQL injection as a risk category rather than just filtering for it.</li>
            <li><code>UpdateQueryBuilder</code> and <code>DeleteQueryBuilder</code> refuse to build without a WHERE clause, so an accidental full-table update or delete fails at build time, not at execution.</li>
            <li>Credentials are never baked into the library — <code>DatabaseConnection</code> only reads them from JVM system properties supplied by the consumer at runtime.</li>
          </ul>
          <div className="callout">
            <b>Version note:</b> 1.0.0 shipped with a hardcoded default database password in <code>DatabaseConnection.java</code>. 1.0.1 removed it — all credentials now come from the consumer, never from the library itself. Published as a lesson learned, not edited out of the history.
          </div>
        </div>

        <div className="nav-cards">
          <Link className="nav-card" to="/projects/querybuilder/methodology">
            <div className="k">NEXT</div>
            <div className="t">Implementation Methodology →</div>
            <div className="d">Why the Builder pattern, the SOLID mapping, the test strategy, and a working sandbox.</div>
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
