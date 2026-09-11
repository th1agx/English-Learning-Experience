/** View layer — Levels section: the horizontal moment inside the vertical pin.
 *  data-x marks the strip the controller translates while the section holds. */

export function LevelsPanel({ id, kicker, title, levels }) {
  return (
    <section className="section section-niveis">
      <div className="mono-label reveal">
        <span>{kicker}</span>
        <span className="n">— {id}</span>
      </div>

      <h2 className="mega reveal" data-depth="70">
        {title}
      </h2>

      <div className="lvl-strip" data-x>
        {levels.map((lvl, i) => (
          <span key={lvl.code} style={{ display: 'contents' }}>
            {i > 0 && <span className="lvl-arrow">→</span>}
            <div className="lvl">
              <b>{lvl.code}</b>
              <span>{lvl.name}</span>
            </div>
          </span>
        ))}
      </div>
    </section>
  );
}
