export default function AppLoader({ ready }) {
  return (
    <div className={`app-loader ${ready ? 'out' : ''}`} aria-hidden={ready}>
      <span className="brand-mark">
        <img src="/brand/logo-icon.png" alt="" />
      </span>
      <span className="app-loader-ring" />
      <p>Baking up something fresh…</p>
    </div>
  );
}
