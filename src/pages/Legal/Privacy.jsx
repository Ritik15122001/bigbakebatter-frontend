import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function Privacy() {
  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy policy' }]} />
      <div className="legal">
        <h1 className="display-md" style={{ marginBottom: 6 }}>Privacy policy</h1>
        <p className="tiny muted">Last updated: 1 August 2026</p>

        <h3>What we collect</h3>
        <p>
          When you place an order or create an account, we collect your name, email, phone number and delivery
          address — only what's needed to bake, pack and deliver your order.
        </p>

        <h3>How we use it</h3>
        <ul>
          <li>To process and deliver your orders</li>
          <li>To send order updates via email or SMS</li>
          <li>To respond to enquiries and custom cake requests</li>
          <li>To improve our menu and service, in aggregate and anonymised form</li>
        </ul>

        <h3>Payment information</h3>
        <p>
          All payments are processed by our secure payment gateway partner. We never store your card, UPI or
          net-banking credentials on our servers.
        </p>

        <h3>Sharing your information</h3>
        <p>
          We share delivery details with our riders solely to complete your delivery. We do not sell your personal
          information to third parties.
        </p>

        <h3>Your choices</h3>
        <p>
          You can update or delete your account information at any time from your account page, or by writing to
          hello@bigbakebatter.com.
        </p>
      </div>
    </div>
  );
}
