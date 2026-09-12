import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty">
      <span className="eico">
        <Icon name={icon} className="icon icon-xl" />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <Link className="btn btn-primary" to={action.to}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
