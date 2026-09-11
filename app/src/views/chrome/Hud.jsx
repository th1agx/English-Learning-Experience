/** View layer — HUD chrome (brand + journey counter). */

export function Hud({ brand, index, total }) {
  const label = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  return (
    <header className="hud">
      <div className="brand">
        <span className="dot" />
        {brand}
      </div>
      <div className="counter">{label}</div>
    </header>
  );
}
