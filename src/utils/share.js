/** Shares a product via the native share sheet where available, else copies the link. */
export async function shareProduct(product, pushToast) {
  const url = `${window.location.origin}/product/${product.id}`;
  const shareData = { title: product.name, text: `Check out ${product.name} on BigBakeBatter`, url };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') pushToast({ title: 'Could not share', kind: 'err' });
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    pushToast({ title: 'Link copied!', subtitle: 'Share it with anyone.', kind: 'ok' });
  } catch {
    pushToast({ title: 'Could not copy link', kind: 'err' });
  }
}
