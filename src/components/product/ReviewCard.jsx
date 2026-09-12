import Icon from '../common/Icon';
import Stars from '../common/Stars';

export default function ReviewCard({ review }) {
  return (
    <div className="review">
      <Icon name="quote" className="icon icon-lg" />
      <p className="quote">{review.text}</p>
      <div className="who">
        <span className="avatar">{review.name[0]}</span>
        <span>
          <b style={{ display: 'block', fontSize: 'var(--fs-sm)' }}>{review.name}</b>
          <span className="tiny muted">{review.occ}</span>
        </span>
        <Stars rating={review.rating} />
      </div>
    </div>
  );
}
