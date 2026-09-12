import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { IMG, QL } from '../../data/products';

export default function CorporateCakesBand() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="band">
          <div className="band-media">
            <Pic src={IMG + 'photo-1733119673475-c7a31c393d42' + QL} alt="Office team celebrating with cake" ph={['#5A3B27', '#2F1B10', '#7A5334']} />
          </div>
          <div className="band-copy">
            <span className="kicker kicker-script" style={{ color: 'var(--c-accent)' }}>
              For your workplace
            </span>
            <h2>Corporate cakes &amp; bulk gifting</h2>
            <p>
              Office birthdays, team milestones, festive hampers or a client thank-you — order in bulk with company
              branding, a dedicated account manager and a GST invoice, delivered on your schedule.
            </p>
            <div className="band-list">
              <div>
                <Icon name="pkg" className="icon icon-sm" />
                Bulk &amp; recurring orders
              </div>
              <div>
                <Icon name="gem" className="icon icon-sm" />
                Logo &amp; branded toppers
              </div>
              <div>
                <Icon name="news" className="icon icon-sm" />
                GST invoicing
              </div>
            </div>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" to="/corporate-cakes">
                Explore corporate cakes
                <Icon name="aright" className="icon icon-sm" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
