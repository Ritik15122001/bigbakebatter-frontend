import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import FAQAccordion from '../../components/sections/FAQAccordion';
import { useContentStore } from '../../store/contentStore';

export default function FAQ() {
  const faqs = useContentStore((s) => s.faqs);
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      <h1 className="display-md" style={{ marginBottom: 6 }}>Frequently asked questions</h1>
      <p className="lede" style={{ marginBottom: 32 }}>Everything about ordering, delivery and our eggless kitchen.</p>

      <div style={{ maxWidth: 760 }}>
        <FAQAccordion items={faqs} initialOpen={-1} />
      </div>

      <div className="card pad-6 text-center" style={{ maxWidth: 560, margin: '48px auto 0' }}>
        <h3 style={{ marginBottom: 8 }}>Still stuck?</h3>
        <p className="muted" style={{ marginBottom: 18 }}>Our team replies within a day, usually much sooner.</p>
        <Link className="btn btn-primary" to="/contact">
          Contact us
        </Link>
      </div>
    </div>
  );
}
