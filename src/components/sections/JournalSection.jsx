import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';
import BlogCard from '../product/BlogCard';
import { useContentStore } from '../../store/contentStore';

const HOME_COUNT = 6;

export default function JournalSection() {
  const blogs = useContentStore((s) => s.blogs);
  const shown = blogs.slice(0, HOME_COUNT);

  if (!shown.length) return null;

  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <SectionHead kicker="From the journal" title="Cake notes & kitchen stories" link={{ to: '/blog', label: 'Read the blog' }} />
        </Reveal>
        <Reveal className="blog-grid">
          {shown.map((b) => (
            <BlogCard key={b.id} post={b} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
