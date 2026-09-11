/** View layer — Method section: title pinned left, steps offset right. */

export function MethodPanel({ id, kicker, title, steps }) {
  return (
    <section className="section">
      <div className="frame">
        <div className="mono-label" data-reveal="slide">
          <span>{kicker}</span>
          <span className="n">— {id}</span>
        </div>

        <div className="metodo-cols">
          <div>
            <h2 className="mega" data-reveal="wipe" data-depth="80" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>
              {title}
            </h2>
            <p className="lede" data-reveal="slide" style={{ marginTop: 40 }}>
              O conteúdo das aulas nasce do teste de nivelamento — cada etapa acontece no seu ritmo.
            </p>
          </div>
          <div data-reveal="slide" data-depth="36">
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

        <span className="side-no">02</span>
      </div>
    </section>
  );
}
