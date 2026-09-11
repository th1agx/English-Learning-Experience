/** View layer — Method section (editorial two-column with parallax). */

export function MethodPanel({ id, kicker, title, steps }) {
  return (
    <section className="section">
      <div className="mono-label reveal" data-depth="26">
        <span>{kicker}</span>
        <span className="n">— {id}</span>
      </div>

      <div className="metodo-cols">
        <h2 className="mega reveal" data-depth="80" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>
          {title}
        </h2>
        <div className="reveal" data-depth="36">
          {steps.map((s) => (
            <div className="metodo-item" key={s.n}>
              <span className="n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
