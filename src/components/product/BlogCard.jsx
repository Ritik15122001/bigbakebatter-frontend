import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { fmtDateShort } from '../../utils/format';

export default function BlogCard({ post }) {
  return (
    <Link className="blog-card" to={`/blog/${post.id}`}>
      <div className="blog-media">
        <Pic src={post.img} alt={post.title} ph={post.ph} />
      </div>
      <div className="blog-body">
        <span className="badge neutral">{post.cat}</span>
        <h3>{post.title}</h3>
        <p className="small muted">{post.excerpt}</p>
        <div className="blog-meta">
          <Icon name="cal" className="icon icon-sm" />
          <span>{post.date || (post.createdAt && fmtDateShort(new Date(post.createdAt)))}</span>
          <span>·</span>
          <Icon name="clock" className="icon icon-sm" />
          <span>{post.read} read</span>
          {post.views > 0 && (
            <>
              <span>·</span>
              <Icon name="eye" className="icon icon-sm" />
              <span>{post.views.toLocaleString('en-IN')} views</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
