import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import BlogCard from '../../components/product/BlogCard';
import SectionHead from '../../components/common/SectionHead';
import Reveal from '../../components/common/Reveal';
import { useContentStore } from '../../store/contentStore';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';
import { getBlogPostById, getComments, postComment } from '../../services/contentService';

function fmtCount(n) {
  if (!n) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k`;
  return String(n);
}

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogs = useContentStore((s) => s.blogs);
  const settings = useContentStore((s) => s.settings);
  const profile = useUserStore((s) => s.profile);
  const pushToast = useUiStore((s) => s.pushToast);

  const cached = blogs.find((b) => b.id === id && b.status === 'Published');
  const [post, setPost] = useState(cached || null);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [form, setForm] = useState({ name: profile?.name || '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const related = blogs.filter((b) => b.id !== id && b.status === 'Published').slice(0, 3);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    let active = true;
    setPost(cached || null);
    setComments([]);
    setCommentsLoaded(false);
    getBlogPostById(id).then((fresh) => {
      if (active && fresh) setPost(fresh);
    });
    getComments(id)
      .then((data) => active && setComments(data))
      .finally(() => active && setCommentsLoaded(true));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!post) {
    return (
      <div className="container section text-center">
        <h1>Article not found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/blog')}>
          Back to blog
        </button>
      </div>
    );
  }

  const paragraphs = (post.body || '').split(/\n\n+/).filter(Boolean);

  const handleComment = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.text.trim().length < 2) {
      pushToast({ title: 'Add your name and a comment', kind: 'err' });
      return;
    }
    setSubmitting(true);
    try {
      const comment = await postComment(id, { name: form.name.trim(), text: form.text.trim() });
      setComments((c) => [comment, ...c]);
      setForm((f) => ({ ...f, text: '' }));
      pushToast({ title: 'Comment posted', kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not post comment', subtitle: err.message, kind: 'err' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />

      <article className="article">
        <div className="article-head">
          <span className="badge neutral">{post.cat}</span>
          <h1 className="display-md">{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <div className="article-byline">
            <span className="avatar">BB</span>
            <span className="stack gap-1" style={{ textAlign: 'left' }}>
              <b className="small">BigBakeBatter Kitchen</b>
              <span className="article-meta-row">
                <span>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                <span className="dot" />
                <span>
                  <Icon name="clock" className="icon icon-sm" /> {post.read} read
                </span>
                <span className="dot" />
                <span>
                  <Icon name="eye" className="icon icon-sm" /> {fmtCount(post.views)} views
                </span>
                <span className="dot" />
                <span>
                  <Icon name="msg" className="icon icon-sm" /> {fmtCount(comments.length)} comments
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="article-hero">
          <Pic src={post.img} alt={post.title} ph={post.ph} />
        </div>

        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <p>
          If you have questions about a specific cake or occasion, our team is always happy to help — reach out
          through the <Link to="/contact">contact page</Link> or start a <Link to="/custom">custom cake enquiry</Link>.
        </p>

        <div className="article-share">
          <span className="small muted">Share this article</span>
          <div className="row gap-2">
            <a
              className="btn-icon"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <Icon name="fb" className="icon icon-sm" />
            </a>
            <a
              className="btn-icon"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
            >
              <Icon name="tw" className="icon icon-sm" />
            </a>
            <a className="btn-icon" href={settings?.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="BigBakeBatter on Instagram">
              <Icon name="insta" className="icon icon-sm" />
            </a>
          </div>
        </div>

        <div className="comments-section">
          <h3 className="comments-head">
            <Icon name="msg" className="icon icon-sm" /> {comments.length ? `${comments.length} comment${comments.length === 1 ? '' : 's'}` : 'Comments'}
          </h3>

          <form className="comment-form" onSubmit={handleComment}>
            <span className="avatar">{(form.name || '?')[0].toUpperCase()}</span>
            <div className="stack gap-2" style={{ flex: 1 }}>
              <input
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <textarea
                className="textarea"
                rows={3}
                placeholder="Share your thoughts on this article…"
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              />
              <button className="btn btn-primary btn-sm" type="submit" disabled={submitting} style={{ alignSelf: 'flex-end' }}>
                {submitting ? 'Posting…' : 'Post comment'}
              </button>
            </div>
          </form>

          {commentsLoaded && comments.length === 0 && (
            <div className="row gap-2 center muted small" style={{ padding: '8px 0' }}>
              <Icon name="msg" className="icon icon-sm" />
              Be the first to share your thoughts on this article.
            </div>
          )}

          <div className="comment-list">
            {comments.map((c) => (
              <div className="comment-item" key={c.id}>
                <span className="avatar">{c.name[0].toUpperCase()}</span>
                <div>
                  <div className="row gap-2 center">
                    <b>{c.name}</b>
                    <span className="tiny muted">
                      {new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div style={{ marginTop: 'var(--s-9)', maxWidth: 1080, marginInline: 'auto' }}>
          <Reveal>
            <SectionHead kicker="The journal" title="Keep reading" link={{ to: '/blog', label: 'All articles' }} />
          </Reveal>
          <Reveal className="blog-grid">
            {related.map((b) => (
              <BlogCard key={b.id} post={b} />
            ))}
          </Reveal>
        </div>
      )}
    </div>
  );
}
