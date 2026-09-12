const IMG = 'https://images.unsplash.com/';
const Q = '?auto=format&fit=crop&w=900&q=70';
const QL = '?auto=format&fit=crop&w=1600&q=72';

const raw = [
  { id: 'c1', name: 'Belgian Chocolate Truffle', cat: 'Birthday', flavour: 'Belgian Chocolate', base: 649, tag: 'Bestseller', stock: 'In stock', qty: 24, rating: 4.9, reviews: 124, sold: 42, eggless: true,
    desc: 'Layers of dark chocolate sponge soaked in cocoa syrup, filled with a silky truffle ganache and finished with hand-shaved Belgian chocolate.',
    ph: ['#6B4A34', '#3E2519', '#5A3524'], img: ['photo-1578985545062-69928b1d9587', 'photo-1606890737304-57a1ca8a5b62', 'photo-1563729784474-d77dbb933a9e', 'photo-1571115177098-24ec42ed204d'] },
  { id: 'c2', name: 'Red Velvet Classic', cat: 'Birthday', flavour: 'Red Velvet · Cream Cheese', base: 699, tag: 'Bestseller', stock: 'In stock', qty: 18, rating: 4.8, reviews: 98, sold: 38, eggless: true,
    desc: 'The classic done properly — a soft, deep-red velvet crumb layered with tangy cream-cheese frosting.',
    ph: ['#B0463F', '#7A2222', '#F3E4DC'], img: ['photo-1586788680434-30d324b2d46f', 'photo-1616690710400-a16d146927c5', 'photo-1614707267537-b85aaf00c4b7', 'photo-1562440499-64c9a111f713'] },
  { id: 'c3', name: 'Vanilla Bean Celebration', cat: 'Anniversary', flavour: 'Madagascar Vanilla', base: 599, tag: '', stock: 'In stock', qty: 31, rating: 4.8, reviews: 76, sold: 29, eggless: true,
    desc: 'A light Madagascar vanilla-bean sponge with fresh whipped cream and a whisper of citrus.',
    ph: ['#F0DFC4', '#DCC199', '#FBF4EA'], img: ['photo-1535141192574-5d4897c12636', 'photo-1464349095431-e9a21285b5f3', 'photo-1519869325930-281384150729', 'photo-1621303837174-89787a7d4729'] },
  { id: 'c4', name: 'Butterscotch Crunch', cat: 'Birthday', flavour: 'Butterscotch', base: 629, tag: '', stock: 'In stock', qty: 12, rating: 4.7, reviews: 65, sold: 24, eggless: true,
    desc: 'Caramelised butterscotch cream folded through a golden sponge, with a praline crunch in every layer.',
    ph: ['#E0B570', '#B87B33', '#F6E3C4'], img: ['photo-1587668178277-295251f900ce', 'photo-1509440159596-0249088772ff', 'photo-1621303837174-89787a7d4729', 'photo-1488477181946-6428a0291777'] },
  { id: 'c5', name: 'Fresh Strawberry Cream', cat: 'Anniversary', flavour: 'Strawberry', base: 749, tag: 'Seasonal', stock: 'Low stock', qty: 4, rating: 4.9, reviews: 89, sold: 19, eggless: true,
    desc: 'Real strawberries folded into lightly sweetened fresh cream over a soft vanilla sponge.',
    ph: ['#E8A0A8', '#C2455B', '#FBEEF0'], img: ['photo-1565958011703-44f9829ba187', 'photo-1488477181946-6428a0291777', 'photo-1464349095431-e9a21285b5f3', 'photo-1519869325930-281384150729'] },
  { id: 'c6', name: 'Salted Caramel Coffee', cat: 'Anniversary', flavour: 'Coffee · Caramel', base: 729, tag: '', stock: 'In stock', qty: 15, rating: 4.8, reviews: 54, sold: 17, eggless: false,
    desc: 'Espresso-soaked sponge layered with salted caramel and a light mascarpone cream.',
    ph: ['#8A6647', '#4E3220', '#D9B98C'], img: ['photo-1486427944299-d1955d23e34d', 'photo-1571115177098-24ec42ed204d', 'photo-1578985545062-69928b1d9587', 'photo-1563729784474-d77dbb933a9e'] },
  { id: 'c7', name: 'New York Cheesecake', cat: 'Cheesecakes', flavour: 'Classic Baked', base: 799, tag: '', stock: 'In stock', qty: 9, rating: 4.9, reviews: 112, sold: 22, eggless: false,
    desc: 'Dense, slow-baked cheesecake on a buttery biscuit base, cracked top and all.',
    ph: ['#EBD9B4', '#C9A66B', '#FBF4EA'], img: ['photo-1533134242443-d4fd215305ad', 'photo-1524351199678-941a58a3df50', 'photo-1567171466295-4afa63d45416', 'photo-1565958011703-44f9829ba187'] },
  { id: 'c8', name: 'Fudge Brownie Box', cat: 'Brownies', flavour: 'Dark Chocolate', base: 399, tag: '', stock: 'In stock', qty: 26, rating: 4.7, reviews: 58, sold: 31, eggless: true,
    desc: 'A box of nine gooey, fudgy brownies with a crackly paper-thin top and a molten centre.',
    ph: ['#5A3B27', '#2F1B10', '#7A5334'], img: ['photo-1607478900766-efe13248b125', 'photo-1606313564200-e75d5e30476c', 'photo-1589375030300-c0dbc7b8b0f4', 'photo-1499636136210-6f4ee915583e'] },
  { id: 'c9', name: 'Rainbow Cupcakes (6)', cat: 'Cupcakes', flavour: 'Assorted', base: 449, tag: '', stock: 'In stock', qty: 20, rating: 4.7, reviews: 43, sold: 27, eggless: true,
    desc: 'Six vanilla cupcakes with rainbow buttercream swirls and sprinkles.',
    ph: ['#E4B7D0', '#B36FA0', '#FBF0F5'], img: ['photo-1519869325930-281384150729', 'photo-1426869981800-95ebf51ce900', 'photo-1486427944299-d1955d23e34d', 'photo-1464349095431-e9a21285b5f3'] },
  { id: 'c10', name: 'Mango Delight', cat: 'Eggless', flavour: 'Alphonso Mango', base: 679, tag: '', stock: 'Low stock', qty: 5, rating: 4.8, reviews: 71, sold: 21, eggless: true,
    desc: 'An eggless mango mousse cake built on fresh Alphonso pulp with a light vanilla sponge.',
    ph: ['#F2C572', '#D8901F', '#FBF0DC'], img: ['photo-1621303837174-89787a7d4729', 'photo-1587668178277-295251f900ce', 'photo-1509440159596-0249088772ff', 'photo-1535141192574-5d4897c12636'] },
  { id: 'c11', name: 'Blueberry Baked Cheesecake', cat: 'Cheesecakes', flavour: 'Blueberry', base: 849, tag: 'New', stock: 'Out of stock', qty: 0, rating: 4.9, reviews: 31, sold: 8, eggless: false,
    desc: 'Our New York base with a wild blueberry swirl folded through and a compote glaze.',
    ph: ['#8E93C6', '#3F4478', '#E7E4F3'], img: ['photo-1567171466295-4afa63d45416', 'photo-1524351199678-941a58a3df50', 'photo-1533134242443-d4fd215305ad', 'photo-1565958011703-44f9829ba187'] },
  { id: 'c12', name: 'Pistachio Rose Layer', cat: 'Anniversary', flavour: 'Pistachio · Rose', base: 899, tag: 'Signature', stock: 'In stock', qty: 7, rating: 5.0, reviews: 38, sold: 11, eggless: true,
    desc: 'Ground Iranian pistachio sponge, rose-water cream and a scatter of dried petals.',
    ph: ['#BFCF9E', '#7E9455', '#F4EEDD'], img: ['photo-1562777717-dc6984f65a63', 'photo-1550617931-e17a7b70dce2', 'photo-1535141192574-5d4897c12636', 'photo-1519869325930-281384150729'] },
  { id: 'c13', name: 'Dutch Truffle Overload', cat: 'Birthday', flavour: 'Dark Chocolate · Ganache', base: 759, tag: 'Bestseller', stock: 'In stock', qty: 16, rating: 4.9, reviews: 96, sold: 35, eggless: true,
    desc: 'Three layers of dark chocolate sponge under a mirror ganache glaze.',
    ph: ['#5E3D28', '#2F1B10', '#7A5334'], img: ['photo-1563729784474-d77dbb933a9e', 'photo-1578985545062-69928b1d9587', 'photo-1571115177098-24ec42ed204d', 'photo-1606890737304-57a1ca8a5b62'] },
  { id: 'c14', name: 'Blueberry Cheesecake Jar (2)', cat: 'Cheesecakes', flavour: 'Blueberry · Cream Cheese', base: 379, tag: 'New', stock: 'In stock', qty: 22, rating: 4.7, reviews: 29, sold: 18, eggless: false,
    desc: 'Two no-bake cheesecake jars layered with buttery crumb and wild blueberry compote.',
    ph: ['#9AA0CE', '#4A4E86', '#EDEAF7'], img: ['photo-1524351199678-941a58a3df50', 'photo-1567171466295-4afa63d45416', 'photo-1533134242443-d4fd215305ad', 'photo-1565958011703-44f9829ba187'] },
  { id: 'c15', name: 'Black Forest Gateau', cat: 'Birthday', flavour: 'Chocolate · Cherry', base: 689, tag: '', stock: 'In stock', qty: 14, rating: 4.8, reviews: 83, sold: 26, eggless: true,
    desc: 'The old classic — chocolate sponge soaked in cherry syrup, whipped cream, morello cherries.',
    ph: ['#7A4230', '#3A1F16', '#F5EBE2'], img: ['photo-1571115177098-24ec42ed204d', 'photo-1586788680434-30d324b2d46f', 'photo-1578985545062-69928b1d9587', 'photo-1563729784474-d77dbb933a9e'] },
  { id: 'c16', name: 'Choco Chip Cupcakes (6)', cat: 'Cupcakes', flavour: 'Chocolate Chip', base: 429, tag: '', stock: 'In stock', qty: 30, rating: 4.6, reviews: 37, sold: 23, eggless: true,
    desc: 'Six vanilla cupcakes packed with dark chocolate chips.',
    ph: ['#D8BFA6', '#8A6647', '#FBF0E4'], img: ['photo-1426869981800-95ebf51ce900', 'photo-1519869325930-281384150729', 'photo-1486427944299-d1955d23e34d', 'photo-1464349095431-e9a21285b5f3'] },
  { id: 'c17', name: 'Walnut Brownie Slab', cat: 'Brownies', flavour: 'Dark Chocolate · Walnut', base: 449, tag: '', stock: 'In stock', qty: 19, rating: 4.8, reviews: 52, sold: 20, eggless: false,
    desc: 'A dense fudge slab studded with toasted walnuts, cut thick.',
    ph: ['#6B4630', '#33200F', '#8C6440'], img: ['photo-1606313564200-e75d5e30476c', 'photo-1607478900766-efe13248b125', 'photo-1589375030300-c0dbc7b8b0f4', 'photo-1499636136210-6f4ee915583e'] },
  { id: 'c18', name: 'Eggless Rasmalai Fusion', cat: 'Eggless', flavour: 'Rasmalai · Saffron', base: 829, tag: 'Signature', stock: 'In stock', qty: 8, rating: 4.9, reviews: 64, sold: 15, eggless: true,
    desc: 'Saffron-milk soaked sponge with cardamom cream, chopped pistachio and rasmalai discs.',
    ph: ['#F2DFA6', '#C9A03C', '#FBF6E6'], img: ['photo-1550617931-e17a7b70dce2', 'photo-1562777717-dc6984f65a63', 'photo-1621303837174-89787a7d4729', 'photo-1535141192574-5d4897c12636'] },
  { id: 'c19', name: 'Lotus Biscoff Cream', cat: 'Anniversary', flavour: 'Biscoff · Caramel', base: 869, tag: 'Bestseller', stock: 'Low stock', qty: 6, rating: 4.9, reviews: 74, sold: 28, eggless: true,
    desc: 'Biscoff spread folded through mascarpone cream, layered with a spiced biscuit crumb.',
    ph: ['#D9A972', '#9A6428', '#F7E6CE'], img: ['photo-1587668178277-295251f900ce', 'photo-1509440159596-0249088772ff', 'photo-1486427944299-d1955d23e34d', 'photo-1488477181946-6428a0291777'] },
  { id: 'c20', name: 'Tender Coconut Cake', cat: 'Anniversary', flavour: 'Tender Coconut', base: 719, tag: 'Seasonal', stock: 'In stock', qty: 11, rating: 4.7, reviews: 41, sold: 13, eggless: true,
    desc: 'Light coconut sponge with tender coconut cream and shavings.',
    ph: ['#EDE7D8', '#BFB08C', '#FBF8F0'], img: ['photo-1519869325930-281384150729', 'photo-1535141192574-5d4897c12636', 'photo-1464349095431-e9a21285b5f3', 'photo-1621303837174-89787a7d4729'] },
  { id: 'c21', name: 'Ferrero Hazelnut Tower', cat: 'Birthday', flavour: 'Hazelnut · Nutella', base: 949, tag: 'Signature', stock: 'In stock', qty: 9, rating: 5.0, reviews: 58, sold: 19, eggless: false,
    desc: 'Hazelnut praline sponge, Nutella ganache and whole chocolates around the rim.',
    ph: ['#6E4A2E', '#3A2314', '#C79A5E'], img: ['photo-1606890737304-57a1ca8a5b62', 'photo-1563729784474-d77dbb933a9e', 'photo-1578985545062-69928b1d9587', 'photo-1571115177098-24ec42ed204d'] },
  { id: 'c22', name: 'Red Velvet Cupcakes (6)', cat: 'Cupcakes', flavour: 'Red Velvet', base: 479, tag: '', stock: 'In stock', qty: 17, rating: 4.8, reviews: 46, sold: 22, eggless: true,
    desc: 'Six red velvet cupcakes with a tall cream-cheese swirl.',
    ph: ['#C4646C', '#8C2F39', '#FBEDEF'], img: ['photo-1614707267537-b85aaf00c4b7', 'photo-1586788680434-30d324b2d46f', 'photo-1562440499-64c9a111f713', 'photo-1616690710400-a16d146927c5'] },
  { id: 'c23', name: 'Marble Tea Cake', cat: 'Tea Cakes', flavour: 'Vanilla · Cocoa', base: 349, tag: '', stock: 'In stock', qty: 28, rating: 4.6, reviews: 34, sold: 24, eggless: true,
    desc: 'A dense loaf-style tea cake marbled with cocoa.',
    ph: ['#E0CBA8', '#A87C4A', '#F8EFE0'], img: ['photo-1509440159596-0249088772ff', 'photo-1587668178277-295251f900ce', 'photo-1535141192574-5d4897c12636', 'photo-1486427944299-d1955d23e34d'] },
  { id: 'c24', name: 'Banana Walnut Loaf', cat: 'Tea Cakes', flavour: 'Banana · Walnut', base: 379, tag: '', stock: 'In stock', qty: 21, rating: 4.7, reviews: 40, sold: 19, eggless: true,
    desc: 'Ripe banana loaf with toasted walnuts and a cinnamon crumb top.',
    ph: ['#D9BE8E', '#96703B', '#F6EDDC'], img: ['photo-1606313564200-e75d5e30476c', 'photo-1509440159596-0249088772ff', 'photo-1607478900766-efe13248b125', 'photo-1499636136210-6f4ee915583e'] },
  { id: 'c25', name: 'Tiramisu Jars (2)', cat: 'Jar Desserts', flavour: 'Coffee · Mascarpone', base: 399, tag: 'New', stock: 'In stock', qty: 24, rating: 4.8, reviews: 33, sold: 21, eggless: false,
    desc: 'Two jars of espresso-soaked sponge layered with mascarpone cream.',
    ph: ['#C6A177', '#6B4526', '#F3E6D3'], img: ['photo-1524351199678-941a58a3df50', 'photo-1486427944299-d1955d23e34d', 'photo-1571115177098-24ec42ed204d', 'photo-1533134242443-d4fd215305ad'] },
  { id: 'c26', name: 'Choco Mousse Jars (2)', cat: 'Jar Desserts', flavour: 'Dark Chocolate Mousse', base: 369, tag: '', stock: 'In stock', qty: 26, rating: 4.7, reviews: 27, sold: 17, eggless: true,
    desc: 'Airy dark chocolate mousse over a brownie base, finished with a sea-salt fleck.',
    ph: ['#7A5334', '#33200F', '#B98A5A'], img: ['photo-1589375030300-c0dbc7b8b0f4', 'photo-1607478900766-efe13248b125', 'photo-1606313564200-e75d5e30476c', 'photo-1563729784474-d77dbb933a9e'] },
  { id: 'c27', name: 'Photo Print Celebration Cake', cat: 'Photo Cakes', flavour: 'Vanilla · Pineapple', base: 899, tag: '', stock: 'In stock', qty: 13, rating: 4.7, reviews: 48, sold: 16, eggless: true,
    desc: 'Your photo printed on edible sugar sheet over a vanilla-pineapple sponge.',
    ph: ['#EFE0C6', '#C0A170', '#FBF5EA'], img: ['photo-1464349095431-e9a21285b5f3', 'photo-1535141192574-5d4897c12636', 'photo-1519869325930-281384150729', 'photo-1621303837174-89787a7d4729'] },
  { id: 'c28', name: 'Kids Cartoon Photo Cake', cat: 'Photo Cakes', flavour: 'Chocolate · Vanilla', base: 949, tag: '', stock: 'Low stock', qty: 5, rating: 4.8, reviews: 36, sold: 12, eggless: true,
    desc: 'A bright two-tone sponge with a printed cartoon topper and piped name.',
    ph: ['#E7B7CE', '#A8508A', '#FBEFF6'], img: ['photo-1519869325930-281384150729', 'photo-1426869981800-95ebf51ce900', 'photo-1464349095431-e9a21285b5f3', 'photo-1486427944299-d1955d23e34d'] },
  { id: 'c29', name: 'Two-Tier Ivory Wedding Cake', cat: 'Wedding Tiers', flavour: 'Vanilla · Chocolate', base: 2499, tag: 'Signature', stock: 'In stock', qty: 4, rating: 5.0, reviews: 22, sold: 7, eggless: true,
    desc: 'Two tiers in ivory fondant with hand-piped detail and fresh flowers.',
    ph: ['#EDE6DA', '#B7A88E', '#FBF7F1'], img: ['photo-1535254973040-607b474cb50d', 'photo-1519225421980-707c68fee8bb', 'photo-1522767131594-6b7e96848fba', 'photo-1562777717-dc6984f65a63'] },
  { id: 'c30', name: 'Three-Tier Blush Wedding Cake', cat: 'Wedding Tiers', flavour: 'Vanilla · Strawberry', base: 3999, tag: 'Signature', stock: 'Low stock', qty: 2, rating: 5.0, reviews: 14, sold: 4, eggless: true,
    desc: 'Three tiers in blush buttercream with gold leaf and garden roses.',
    ph: ['#F0D8D8', '#C08A96', '#FBF2F3'], img: ['photo-1519225421980-707c68fee8bb', 'photo-1535254973040-607b474cb50d', 'photo-1522767131594-6b7e96848fba', 'photo-1550617931-e17a7b70dce2'] },
  { id: 'c31', name: 'Assorted Pastry Box (6)', cat: 'Pastries', flavour: 'Assorted', base: 429, tag: '', stock: 'In stock', qty: 23, rating: 4.6, reviews: 39, sold: 25, eggless: true,
    desc: 'Six pastry slices — chocolate, pineapple, black forest and butterscotch.',
    ph: ['#E4C9A4', '#A97F45', '#F9F0E2'], img: ['photo-1488477181946-6428a0291777', 'photo-1533134242443-d4fd215305ad', 'photo-1587668178277-295251f900ce', 'photo-1565958011703-44f9829ba187'] },
  { id: 'c32', name: 'Vegan Dark Chocolate Cake', cat: 'Vegan', flavour: 'Dark Chocolate · Almond', base: 799, tag: 'New', stock: 'In stock', qty: 10, rating: 4.7, reviews: 25, sold: 9, eggless: true,
    desc: 'No dairy, no egg. Almond-milk ganache over a dark chocolate sponge.',
    ph: ['#6A5140', '#2E1D12', '#9A7A5C'], img: ['photo-1578985545062-69928b1d9587', 'photo-1589375030300-c0dbc7b8b0f4', 'photo-1563729784474-d77dbb933a9e', 'photo-1606890737304-57a1ca8a5b62'] },
];

/* The whole menu is 100% veg and eggless — no per-product egg preference. */
export const products = raw.map((p) => {
  const img = p.img.map((i) => IMG + i + Q);
  return { ...p, img, hero: img[0].replace(Q, QL), eggless: true, veg: true };
});

const WEIGHTS_DEF = [
  { w: '0.5 KG', mult: 1 },
  { w: '1 KG', mult: 1.7 },
  { w: '1.5 KG', mult: 2.39 },
  { w: '2 KG', mult: 3.08 },
];

export function weightsFor(base) {
  return WEIGHTS_DEF.map((o) => ({ w: o.w, amount: Math.round((base * o.mult) / 10) * 10 }));
}

export function isBox(product) {
  return product.cat === 'Brownies' || product.cat === 'Cupcakes';
}

export { IMG, Q, QL };
