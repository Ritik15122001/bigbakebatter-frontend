import { IMG, QL } from './products';

export const banners = [
  {
    id: 'bn1', kicker: 'Made for the moment', headline: "Freshly baked cakes for life's sweetest celebrations",
    sub: 'Baked this morning, boxed this afternoon, at your door by evening. Order before 2 PM for same-day delivery.',
    cta: 'Explore cakes', ctaHref: '/shop', badge: ['20%', 'Off first order'], status: 'Published', order: 1,
    img: IMG + 'photo-1578985545062-69928b1d9587' + QL, ph: ['#6B4A34', '#3E2519', '#5A3524'],
  },
  {
    id: 'bn2', kicker: 'Celebrations taste better', headline: 'From birthdays to anniversaries, make every moment sweeter',
    sub: 'Twelve signature cakes, four weights, and a message piped on the board — free, every time.',
    cta: 'Shop bestsellers', ctaHref: '/shop', badge: ['4.9', '2,400 orders'], status: 'Published', order: 2,
    img: IMG + 'photo-1519869325930-281384150729' + QL, ph: ['#E4B7D0', '#8C3F6B', '#FBF0F5'],
  },
  {
    id: 'bn3', kicker: 'Your idea. Our bakers.', headline: 'Create a custom cake designed around your celebration',
    sub: 'Send a sketch or a photo. We come back with a design and a quote within 24 hours — no obligation.',
    cta: 'Create your cake', ctaHref: '/custom', badge: ['24h', 'Design & quote'], status: 'Published', order: 3,
    img: IMG + 'photo-1535254973040-607b474cb50d' + QL, ph: ['#E7E0D4', '#A08D72', '#FBF6F0'],
  },
  {
    id: 'bn4', kicker: 'Baked fresh. Delivered today.', headline: 'Order before 2 PM for same-day delivery',
    sub: 'Our kitchen bakes at dawn and routes go out at five. No preservatives, no day-old stock, no exceptions.',
    cta: 'Order now', ctaHref: '/shop', badge: ['2 PM', 'Same-day cut-off'], status: 'Draft', order: 4,
    img: IMG + 'photo-1486427944299-d1955d23e34d' + QL, ph: ['#E5CDAE', '#9E7645', '#FBF4EA'],
  },
];

export function liveBanners() {
  const live = banners.filter((b) => b.status === 'Published').sort((a, b) => a.order - b.order);
  return live.length ? live : [banners[0]];
}
