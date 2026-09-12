import { useNavigate } from 'react-router-dom';
import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';
import { useProductStore } from '../../store/productStore';
import { money } from '../../utils/format';

export default function FlavoursSection() {
  const navigate = useNavigate();
  const flavours = useProductStore((s) => s.flavours);

  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <SectionHead kicker="Signature flavours" title="Pick a flavour, we'll do the rest" />
        </Reveal>
        <Reveal className="flav-grid">
          {flavours.map((f) => (
            <button
              key={f.name}
              className="flav"
              style={{ '--fl': f.col }}
              onClick={() => navigate(`/shop?flavour=${encodeURIComponent(f.name)}`)}
            >
              <span className="swatch" style={{ background: f.col }} />
              <b>{f.name}</b>
              <span>from {money(f.from)}</span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
