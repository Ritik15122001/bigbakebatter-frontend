import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="row gap-1 center">
          {i > 0 && <Icon name="cright" className="icon icon-sm" />}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
