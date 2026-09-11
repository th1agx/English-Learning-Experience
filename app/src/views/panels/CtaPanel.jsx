/** View layer — CTA finale: mega left, info column right (asymmetry). */

export function CtaPanel({ kicker, titleTop, titleHighlight, titleBottom, lede, whatsappUrl, whatsappLabel, meta }) {
  const metaItems = meta.split('·').map((m) => m.trim());

  return (
    <section className="section section-cta" aria-label="Contato">
      <div className="frame">
        <div className="mono-label" data-reveal="slide">
          <span>{kicker}</span>
          <span>→ whatsapp</span>
        </div>

        <div className="cta-cols">
          <div>
            <div className="mask">
              <h2 className="mega" data-depth="40">
                {titleTop}
                <br />
                <em>{titleHighlight}</em> {titleBottom}
              </h2>
            </div>
            <p className="lede" data-reveal="slide">{lede}</p>
            <a className="cta-button" data-reveal="pop" href={whatsappUrl} target="_blank" rel="noreferrer">
              {whatsappLabel}
            </a>
          </div>

          <ul className="cta-meta-list">
            {metaItems.map((m) => (
              <li key={m}><b>{m}</b>ceff education — english class</li>
            ))}
          </ul>
        </div>

        <span className="side-no" data-depth="100">05</span>
      </div>
    </section>
  );
}
