/** View layer — Plans section (butter field, ink table). */

export function PlansPanel({ id, kicker, title, rows, note }) {
  return (
    <section className="section section-planos">
      <div className="mono-label reveal" data-depth="26">
        <span>{kicker}</span>
        <span className="n">— {id}</span>
      </div>

      <h2 className="mega reveal" data-depth="80">
        {title}
      </h2>

      <div className="plan-list reveal" data-depth="34">
        {rows.map((row) => (
          <div className="plan-row" key={row.freq}>
            <span className="freq">{row.freq}</span>
            <span className="desc">{row.desc}</span>
            <span className="unit">{row.unit}</span>
            <span className="price">{row.price}</span>
          </div>
        ))}
      </div>
      <p className="plan-note reveal">{note}</p>
    </section>
  );
}
