/** View layer — HUD chrome (brand + section nav + journey counter). */

export function Hud({ brand, nav, activeIndex, total, onNavigate }) {
  const label = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  return (
    <header className="hud">
      <div className="brand">
        <span className="dot" />
        {brand}
      </div>

      {nav?.length > 0 && (
        <nav className="hud-nav" aria-label="Seções">
          {nav.map((item) => (
            <button
              key={item.index}
              type="button"
              className={activeIndex === item.index ? 'is-active' : ''}
              onClick={() => onNavigate?.(item.index)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <div className="counter">{label}</div>
    </header>
  );
}
