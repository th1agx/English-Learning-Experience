/** View layer — HUD chrome (brand + journey counter). */

export function Hud({ brand, brandAccent, counterRef }) {
  return (
    <header className="hud">
      <div className="brand">
        {brand} <span>{brandAccent}</span>
      </div>
      <div className="counter" ref={counterRef}>01 / 05</div>
    </header>
  );
}
