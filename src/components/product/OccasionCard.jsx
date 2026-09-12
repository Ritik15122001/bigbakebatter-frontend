import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';

export default function OccasionCard({ occasion }) {
  return (
    <Link className="occ-cell" to={occasion.cat ? `/shop?category=${encodeURIComponent(occasion.cat)}` : '/shop'}>
      <span className="om">
        <Pic src={occasion.img} alt={occasion.name} ph={occasion.ph} />
      </span>
      <span className="arrow">
        <Icon name="aupright" className="icon icon-sm" />
      </span>
      <span>
        <h3>{occasion.name}</h3>
        <span>{occasion.blurb}</span>
      </span>
    </Link>
  );
}
