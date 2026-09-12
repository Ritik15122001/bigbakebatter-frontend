import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function SectionHead({ kicker, title, sub, link }) {
  return (
    <div className="section-head">
      <div className="st">
        {kicker && <span className="kicker kicker-script">{kicker}</span>}
        <h2 className="display-md">{title}</h2>
        {sub && <p className="lede">{sub}</p>}
      </div>
      {link && (
        <Link className="btn btn-outline btn-sm" to={link.to}>
          {link.label}
          <Icon name="aright" className="icon icon-sm" />
        </Link>
      )}
    </div>
  );
}
