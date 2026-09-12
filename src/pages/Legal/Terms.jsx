import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function Terms() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms & conditions' }]} />
      <div className="legal">
        <h1 className="display-md" style={{ marginBottom: 6 }}>Terms &amp; conditions</h1>
        <p className="tiny muted">Last updated: 1 August 2026</p>

        <h3>Orders</h3>
        <p>
          Orders are confirmed once payment is received. Orders placed before 2 PM qualify for same-day delivery
          within our serviceable areas; orders after the cut-off are scheduled for the next available slot.
        </p>

        <h3>Payments</h3>
        <p>
          We accept UPI, credit and debit cards, and net banking through our secure payment partner. Cash on
          delivery is not available on any order.
        </p>

        <h3>Cancellations &amp; refunds</h3>
        <ul>
          <li>Orders can be cancelled free of charge up to 4 hours before the scheduled delivery slot.</li>
          <li>Custom cake enquiries can be withdrawn any time before the advance payment is made.</li>
          <li>Approved refunds are processed to the original payment method within 5–7 business days.</li>
        </ul>

        <h3>Product information</h3>
        <p>
          Every item on our menu is 100% eggless and vegetarian. Photos are for illustration — actual designs may
          vary slightly, especially for custom orders.
        </p>

        <h3>Liability</h3>
        <p>
          We take care to package every order for safe transit but cannot be held responsible for damage caused
          after delivery is accepted.
        </p>
      </div>
    </div>
  );
}
