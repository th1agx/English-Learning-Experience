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
            <h2 className="mega" data-reveal="wipe">
              {titleTop}
              <br />
              <em>{titleHighlight}</em> {titleBottom}
            </h2>
            <p className="lede" data-reveal="slide">{lede}</p>
            <a className="cta-button" data-reveal="pop" data-reveal-rot="-3" href={whatsappUrl} target="_blank" rel="noreferrer">
              {whatsappLabel}
            </a>
          </div>

          <ul className="cta-meta-list" data-reveal="slide">
            {metaItems.map((m) => (
              <li key={m}><b>{m}</b>ceff education — english class</li>
            ))}
          </ul>
        </div>

        <span className="side-no">05</span>
      </div>
    </section>
  );
}
