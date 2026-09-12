import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';
import OccasionCard from '../product/OccasionCard';
import { useProductStore } from '../../store/productStore';

export default function OccasionsSection() {
  const occasions = useProductStore((s) => s.occasions);

  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <SectionHead kicker="Shop by occasion" title="Every celebration, covered" />
        </Reveal>
        <Reveal className="occ-grid">
          {occasions.map((o) => (
            <OccasionCard key={o.name} occasion={o} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
