import { Link } from 'react-router-dom';

/**
 * Placeholder for every route besides Home in this build phase. Keeps
 * navigation, the header/footer links and product-card clicks from hitting a
 * dead route while the rest of the pages are built out.
 */
export default function ComingSoon({ title = 'Coming soon' }) {
  return (
    <div className="container section">
      <div className="empty">
        <h3 className="display-sm">{title}</h3>
        <p>This page is on the build list — only the home page has been converted from the prototype so far.</p>
        <Link className="btn btn-primary" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
