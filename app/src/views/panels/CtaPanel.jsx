/** View layer — CTA finale. Regular flow section; the controller reveals it. */

export function CtaPanel({ kicker, titleTop, titleHighlight, titleBottom, lede, whatsappUrl, whatsappLabel, meta }) {
  return (
    <section className="section section-cta" aria-label="Contato">
      <div className="mono-label reveal">
        <span>{kicker}</span>
        <span>→ whatsapp</span>
      </div>

      <h2 className="mega reveal">
        {titleTop}
        <br />
        <em>{titleHighlight}</em> {titleBottom}
      </h2>

      <p className="lede reveal">{lede}</p>

      <a className="cta-button reveal" href={whatsappUrl} target="_blank" rel="noreferrer">
        {whatsappLabel}
      </a>

      <p className="cta-meta reveal">{meta}</p>
    </section>
  );
}
