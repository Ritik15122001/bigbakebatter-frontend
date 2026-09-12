import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import FAQAccordion from './FAQAccordion';
import { useContentStore } from '../../store/contentStore';
import { formatPhone, telHref } from '../../utils/format';

export default function FAQSection() {
  const faqs = useContentStore((s) => s.faqs);
  const phone = useContentStore((s) => s.settings?.phones?.[0]);

  if (!faqs.length) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="faq-wrap">
          <Reveal>
            <span className="kicker kicker-script">Questions</span>
            <h2 className="display-md" style={{ margin: '12px 0 14px' }}>
              Everything you might ask before ordering
            </h2>
            <p className="lede">
              Still unsure?{' '}
              {phone && (
                <>
                  Call us on{' '}
                  <a className="mn-underline" href={telHref(phone)}>
                    {formatPhone(phone)}
                  </a>{' '}
                </>
              )}
              — a human answers between 9 AM and 9 PM.
            </p>
            <Link className="btn btn-outline" style={{ marginTop: 20 }} to="/contact">
              Contact us
            </Link>
          </Reveal>
          <Reveal>
            <FAQAccordion items={faqs} initialOpen={0} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
