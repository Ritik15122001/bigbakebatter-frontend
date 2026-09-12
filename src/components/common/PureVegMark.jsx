/**
 * The Indian FSSAI-style vegetarian mark: a green square outline with a
 * green dot centred inside. Used wherever we assert the whole menu is
 * 100% pure veg — text stays green to match.
 */
export default function PureVegMark({ label, size = 16, className = '', tone = '#15803D' }) {
  return (
    <span className={`row gap-2 center ${className}`.trim()} style={{ color: tone }}>
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          flex: 'none',
          border: `1.5px solid ${tone}`,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span style={{ width: size * 0.44, height: size * 0.44, borderRadius: '50%', background: tone }} />
      </span>
      {label && (
        <b className="tiny" style={{ color: tone, fontWeight: 700 }}>
          {label}
        </b>
      )}
    </span>
  );
}
