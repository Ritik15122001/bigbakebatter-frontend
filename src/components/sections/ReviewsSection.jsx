import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';
import ReviewCard from '../product/ReviewCard';
import { useContentStore } from '../../store/contentStore';

export default function ReviewsSection() {
  const reviews = useContentStore((s) => s.reviews);

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHead kicker="Reviews" title="What people say after the party" sub="2,417 delivered orders and counting." />
        </Reveal>
        <Reveal className="rev-grid">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
