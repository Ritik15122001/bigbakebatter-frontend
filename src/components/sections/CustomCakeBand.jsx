import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { IMG, QL } from '../../data/products';

export default function CustomCakeBand() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="band">
          <div className="band-copy">
            <span className="kicker kicker-script" style={{ color: 'var(--c-accent)' }}>
              Custom cakes
            </span>
            <h2>Your idea, built by our bakers</h2>
            <p>
              Send a sketch, a screenshot or a sentence describing the celebration. We come back within 24 hours with
              a design and a fixed quote — no obligation.
            </p>
            <div className="band-list">
              <div>
                <Icon name="camera" className="icon icon-sm" />
                Reference photos
              </div>
              <div>
                <Icon name="clock" className="icon icon-sm" />
                24-hour quote
              </div>
              <div>
                <Icon name="gift" className="icon icon-sm" />
                Tiers &amp; fondant
              </div>
            </div>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" to="/custom">
                Create your cake
                <Icon name="aright" className="icon icon-sm" />
              </Link>
              <Link className="btn btn-ondark btn-lg" to="/blog">
                See a wedding build
              </Link>
            </div>
          </div>
          <div className="band-media">
            <Pic src={IMG + 'photo-1535254973040-607b474cb50d' + QL} alt="Custom wedding cake" ph={['#E7E0D4', '#A08D72', '#FBF6F0']} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
