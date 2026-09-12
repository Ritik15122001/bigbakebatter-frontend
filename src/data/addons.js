import { IMG, Q } from './products';

/**
 * Small, quick-add extras shown in the "before you go to cart" popup —
 * mirrors the Bakingo-style upsell shown right after Add to cart / Buy now,
 * grouped into browsable categories with a "Popular" cross-category tab.
 */
export const addonCategories = [
  { key: 'popular', label: 'Popular', icon: 'star' },
  { key: 'toppers', label: 'Cake Toppers', icon: 'gift' },
  { key: 'candles', label: 'Candles', icon: 'sparkles' },
  { key: 'party', label: 'Party Essentials', icon: 'party' },
  { key: 'chocolates', label: 'Chocolates', icon: 'cookie' },
  { key: 'more', label: 'More Addons', icon: 'plus' },
];

export const addons = [
  { id: 'ad1', name: 'Magic Relighting Candles', price: 59, cat: 'candles', popular: true, img: IMG + 'photo-1607478900766-efe13248b125' + Q, ph: ['#5A3B27', '#2F1B10'] },
  { id: 'ad2', name: 'Number Candles', price: 49, unit: 'per candle', cat: 'candles', popular: true, img: IMG + 'photo-1607478900766-efe13248b125' + Q, ph: ['#E4B7D0', '#B36FA0'] },
  { id: 'ad3', name: 'One Flower Candle', price: 99, cat: 'candles', img: IMG + 'photo-1486427944299-d1955d23e34d' + Q, ph: ['#D9A0A8', '#8C2F39'] },
  { id: 'ad4', name: "B'day Cap For Girl", price: 69, cat: 'party', popular: true, img: IMG + 'photo-1519869325930-281384150729' + Q, ph: ['#E4B7D0', '#B36FA0'] },
  { id: 'ad5', name: "B'day Cap For Boy", price: 69, cat: 'party', img: IMG + 'photo-1464349095431-e9a21285b5f3' + Q, ph: ['#9AB6D9', '#3E6FA0'] },
  { id: 'ad6', name: 'Confetti Set Of 2', price: 159, cat: 'party', popular: true, img: IMG + 'photo-1519225421980-707c68fee8bb' + Q, ph: ['#E0B570', '#B87B33'] },
  { id: 'ad7', name: 'Number Foil Balloons', price: 129, cat: 'party', img: IMG + 'photo-1521302200778-33500795e128' + Q, ph: ['#D9A972', '#9A6428'] },
  { id: 'ad8', name: 'Greeting Card — Happy Birthday', price: 99, cat: 'toppers', popular: true, img: IMG + 'photo-1607478900766-efe13248b125' + Q, ph: ['#09090B', '#3E2519'] },
  { id: 'ad9', name: 'Photo Topper — Personalised', price: 149, cat: 'toppers', img: IMG + 'photo-1519869325930-281384150729' + Q, ph: ['#E4B7D0', '#B36FA0'] },
  { id: 'ad10', name: 'Mini Cake Topper Flags', price: 79, cat: 'toppers', img: IMG + 'photo-1509440159596-0249088772ff' + Q, ph: ['#E0B570', '#B87B33'] },
  { id: 'ad11', name: 'Assorted Chocolate Box (6 pc)', price: 199, cat: 'chocolates', popular: true, img: IMG + 'photo-1606313564200-e75d5e30476c' + Q, ph: ['#6B4630', '#33200F'] },
  { id: 'ad12', name: 'Ferrero-Style Praline Box', price: 349, cat: 'chocolates', img: IMG + 'photo-1606890737304-57a1ca8a5b62' + Q, ph: ['#6E4A2E', '#3A2314'] },
  { id: 'ad13', name: 'Premium Cake Knife', price: 129, cat: 'more', img: IMG + 'photo-1509440159596-0249088772ff' + Q, ph: ['#E0B570', '#B87B33'] },
  { id: 'ad14', name: 'Mini Rose Bouquet', price: 249, cat: 'more', popular: true, img: IMG + 'photo-1519225421980-707c68fee8bb' + Q, ph: ['#D9A0A8', '#8C2F39'] },
];
