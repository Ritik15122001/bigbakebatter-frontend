import Reveal from '../common/Reveal';
import NewsletterForm from '../forms/NewsletterForm';

export default function NewsletterSection() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="news">
          <div>
            <span className="kicker kicker-script">Stay in the loop</span>
            <h2 className="display-sm" style={{ margin: '12px 0 10px' }}>
              Seasonal bakes, first
            </h2>
            <p className="lede">One email a month: new flavours, festival specials and the occasional discount code.</p>
          </div>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
