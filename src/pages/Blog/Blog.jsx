import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import BlogCard from '../../components/product/BlogCard';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import { useContentStore } from '../../store/contentStore';
import { fmtDateShort } from '../../utils/format';

const PAGE_SIZE = 6;

export default function Blog() {
  const blogs = useContentStore((s) => s.blogs);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [cat, setCat] = useState('all');
  const published = useMemo(() => blogs.filter((b) => b.status === 'Published'), [blogs]);
  const categories = useMemo(() => [...new Set(published.map((b) => b.cat))], [published]);
  const filtered = useMemo(() => (cat === 'all' ? published : published.filter((b) => b.cat === cat)), [published, cat]);
  const [lead, ...rest] = filtered;
  const shown = rest.slice(0, visible - 1);
  const hasMore = visible - 1 < rest.length;

  const changeCat = (c) => {
    setCat(c);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
      <span className="kicker kicker-script">Our journal</span>
      <h1 className="display-md" style={{ margin: '6px 0' }}>Cake notes &amp; kitchen stories</h1>
      <p className="lede" style={{ marginBottom: 24 }}>Baking guides, behind-the-scenes and everything cake care.</p>

      {categories.length > 1 && (
        <div className="opt-row" style={{ marginBottom: 36 }}>
          <button className={`opt ${cat === 'all' ? 'on' : ''}`} onClick={() => changeCat('all')}>All posts</button>
          {categories.map((c) => (
            <button key={c} className={`opt ${cat === c ? 'on' : ''}`} onClick={() => changeCat(c)}>{c}</button>
          ))}
        </div>
      )}

      {lead && (
        <Link to={`/blog/${lead.id}`} className="blog-lead">
          <div className="blog-lead-media">
            <Pic src={lead.img} alt={lead.title} ph={lead.ph} />
          </div>
          <div className="blog-lead-body">
            <span className="badge neutral">{lead.cat}</span>
            <h2>{lead.title}</h2>
            <p className="muted">{lead.excerpt}</p>
            <div className="blog-meta">
              <Icon name="cal" className="icon icon-sm" />
              <span>{lead.date || (lead.createdAt && fmtDateShort(new Date(lead.createdAt)))}</span>
              <span>·</span>
              <Icon name="clock" className="icon icon-sm" />
              <span>{lead.read} read</span>
              {lead.views > 0 && (
                <>
                  <span>·</span>
                  <Icon name="eye" className="icon icon-sm" />
                  <span>{lead.views.toLocaleString('en-IN')} views</span>
                </>
              )}
            </div>
            <span className="btn btn-dark btn-sm" style={{ alignSelf: 'flex-start', marginTop: 6 }}>
              Read article
              <Icon name="aright" className="icon icon-sm" />
            </span>
          </div>
        </Link>
      )}

      {shown.length > 0 && (
        <div className="blog-grid">
          {shown.map((b) => (
            <BlogCard key={b.id} post={b} />
          ))}
        </div>
      )}

      {!lead && (
        <p className="muted" style={{ padding: '40px 0' }}>No posts in this category yet.</p>
      )}

      {hasMore && (
        <div className="text-center" style={{ marginTop: 'var(--s-7)' }}>
          <button className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More Blogs
          </button>
        </div>
      )}
    </div>
  );
}
