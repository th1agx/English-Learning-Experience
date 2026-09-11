/** View layer — Plans section: title left, table indented right (asymmetry). */

export function PlansPanel({ id, kicker, title, rows, note }) {
  return (
    <section className="section">
      <div className="frame">
        <div className="mono-label" data-reveal="slide">
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </div>

        <h2 className="mega" data-reveal="wipe" data-depth="70" style={{ maxWidth: '12ch' }}>
          {title}
        </h2>

        <div className="plan-list" data-reveal="slide" data-depth="34">
          {rows.map((row) => (
            <div className="plan-row" key={row.freq}>
              <span className="freq">{row.freq}</span>
              <span className="desc">{row.desc}</span>
              <span className="unit">{row.unit}</span>
              <span className="price">{row.price}</span>
            </div>
          ))}
        </div>
        <p className="plan-note" data-reveal="slide">{note}</p>

        <span className="side-no">04</span>
      </div>
    </section>
  );
}
