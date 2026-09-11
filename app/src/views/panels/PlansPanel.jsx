/** View layer — Plans section: title left, table indented right (asymmetry). */

export function PlansPanel({ id, kicker, title, rows, note }) {
  return (
    <section className="section section-planos">
      <div className="frame">
        <div className="mono-label" data-reveal="slide">
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </div>

        <div className="mask">
          <h2 className="mega" data-depth="50" style={{ maxWidth: '12ch' }}>
            {title}
          </h2>
        </div>

        <div className="plan-list" data-depth="26">
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

        <span className="side-no" data-depth="90">04</span>
      </div>
    </section>
  );
}
