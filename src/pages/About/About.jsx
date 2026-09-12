import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import SectionHead from '../../components/common/SectionHead';
import ReviewCard from '../../components/product/ReviewCard';
import { IMG, QL } from '../../data/products';
import { useContentStore } from '../../store/contentStore';
import { useProductStore } from '../../store/productStore';
import { formatPhone } from '../../utils/format';

const WHY_BADGES = [
  { icon: 'cake', label: 'Baked in-house' },
  { icon: 'leaf', label: 'No preservatives' },
  { icon: 'truck', label: 'Delivered chilled' },
];

const VALUES = [
  { icon: 'leaf', title: 'Fresh ingredients', text: 'Real cream, real butter, real fruit. If an ingredient is out of season, the cake comes off the menu until it is back.' },
  { icon: 'sun', title: 'Same-day baking', text: "Every order is assembled from that morning's bake. Nothing is frozen and nothing is held over to the next day." },
  { icon: 'check', title: 'Customer promise', text: 'If a cake arrives damaged or late, we re-bake it or refund it. No forms, no argument — just tell us.' },
];

export default function About() {
  const settings = useContentStore((s) => s.settings);
  const reviews = useContentStore((s) => s.reviews);
  const products = useProductStore((s) => s.products);
  const since = settings?.since || 2017;
  const phone = settings?.phones?.[0];

  const STATS = [
    [`${products.length || 30}+`, 'Signature cakes'],
    ['2,417', 'Orders delivered'],
    ['4.9', 'Average rating'],
    ['5 AM', 'Ovens on'],
  ];

  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <div style={{ maxWidth: '62ch' }}>
            <span className="kicker kicker-script">Our story</span>
            <h1 className="display-lg" style={{ margin: '14px 0 12px' }}>A small kitchen that refuses to bake ahead</h1>
            <p className="lede">
              BigBakeBatter started in {since} with one oven, one recipe book and a stubborn rule we still keep:
              nothing leaves the kitchen that was not baked that morning.
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-split">
            <div className="about-media">
              <Pic src={IMG + 'photo-1556910103-1c02745aae4d' + QL} alt="Our kitchen" ph={['#E5CDAE', '#9E7645', '#FBF4EA']} />
            </div>
            <div className="stack gap-4">
              <span className="kicker kicker-script">Why we exist</span>
              <h2 className="display-md">Fresh is a schedule, not a slogan</h2>
              <p>
                Most cake shops bake in bulk and hold stock for days. We bake to order, in small batches, starting at
                five in the morning. It makes the operation harder and the cake better — and it is the whole reason
                we cap how many orders we take in a day.
              </p>
              <p>
                Everything is made in-house: sponges, fillings, ganache, even the praline in the butterscotch. No
                mixes, no preservatives, no shortcuts we would not tell you about.
              </p>
              <div className="row gap-3 wrap" style={{ marginTop: 8 }}>
                {WHY_BADGES.map((b) => (
                  <span className="badge neutral" key={b.label}>
                    <Icon name={b.icon} className="icon icon-sm" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="stat-row">
            {STATS.map((s) => (
              <div className="card pad-6" key={s[1]}>
                <div className="st-n">{s[0]}</div>
                <p className="small muted" style={{ marginTop: 8 }}>{s[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="What we promise" title="Three things we will not compromise on" />
          <div className="value-grid">
            {VALUES.map((v) => (
              <div className="value" key={v.title}>
                <span className="vico">
                  <Icon name={v.icon} className="icon icon-md" />
                </span>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 8 }}>{v.title}</h3>
                <p className="small muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHead kicker="In their words" title="What customers say" />
          <div className="rev-grid">
            {reviews.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="band">
            <div className="band-copy">
              <span className="kicker kicker-script" style={{ color: 'var(--c-accent)' }}>Visit us</span>
              <h2>Come by the bakehouse</h2>
              <p>{settings?.addressFull || 'Bisrakh Jalalpur, Greater Noida West, UP 201306'}. Open 9 AM to 9 PM, every day except Monday.</p>
              <div className="band-list">
                {phone && (
                  <div>
                    <Icon name="phone" className="icon icon-sm" />
                    {formatPhone(phone)}
                  </div>
                )}
                {settings?.email && (
                  <div>
                    <Icon name="mail" className="icon icon-sm" />
                    {settings.email}
                  </div>
                )}
              </div>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/contact">
                  Contact us
                  <Icon name="aright" className="icon icon-sm" />
                </Link>
              </div>
            </div>
            <div className="band-media">
              <Pic src={IMG + 'photo-1517686469429-8bdb88b9f907' + QL} alt="Bakehouse" ph={['#E7DCCB', '#A08D72', '#FBF6F0']} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
