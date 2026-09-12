export function money(n) {
  return '₹' + Number(Math.round(n)).toLocaleString('en-IN');
}

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDateShort(d) {
  return `${d.getDate()} ${MON[d.getMonth()]}`;
}

/** Formats a raw 10-digit phone string as "+91 98996 60338" for display. */
export function formatPhone(digits) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function telHref(digits) {
  return 'tel:+91' + digits.replace(/\D/g, '');
}
