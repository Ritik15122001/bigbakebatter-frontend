import { api } from './api';
import { ENDPOINTS } from './endpoints';

/** Creates a Razorpay order server-side and returns { orderId, amount, currency, keyId }. */
export async function createRazorpayOrder(amount) {
  return api.post(ENDPOINTS.razorpayOrder, { amount });
}

/**
 * Opens the Razorpay checkout modal and resolves with the payment response
 * once the customer completes payment, or rejects if they cancel/it fails.
 */
export function openRazorpayCheckout({ orderId, amount, currency, keyId, name, email, phone }) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Payment gateway failed to load. Please refresh and try again.'));
      return;
    }
    const rzp = new window.Razorpay({
      key: keyId,
      order_id: orderId,
      amount,
      currency,
      name: 'BigBakeBatter',
      description: 'Cake order payment',
      prefill: { name, email, contact: phone },
      theme: { color: '#ff3d19' },
      handler: (response) => {
        resolve({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled')),
      },
    });
    rzp.on('payment.failed', (response) => {
      reject(new Error(response.error?.description || 'Payment failed'));
    });
    rzp.open();
  });
}
