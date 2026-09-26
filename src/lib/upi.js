/**
 * Builds UPI deep links (`upi://pay?...`).
 *
 * A QR image exported from Google Pay or PhonePe is a *static* code: it
 * carries the payee only, so the donor has to type the amount themselves. A
 * QR generated from one of these links carries the amount as well, so the
 * donor's app opens with the figure already filled in.
 *
 * Spec reference: NPCI UPI Linking Specification, the `upi://pay` intent.
 */

/** A VPA looks like `name@bank`. Deliberately permissive on the local part. */
const VPA_PATTERN = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-_]{1,64}$/;

export function isValidVpa(vpa) {
  return typeof vpa === 'string' && VPA_PATTERN.test(vpa.trim());
}

/**
 * @param {object} options
 * @param {string} options.payeeVpa   e.g. 'helpinghearts@okaxis'
 * @param {string} options.payeeName  shown in the donor's UPI app
 * @param {number} [options.amount]   rupees; omitted for an open-amount code
 * @param {string} [options.note]     transaction note, trimmed to 50 chars
 * @returns {string|null} the deep link, or null when the VPA is unusable
 */
export function buildUpiUri({ payeeVpa, payeeName, amount, note }) {
  if (!isValidVpa(payeeVpa)) return null;

  const params = new URLSearchParams();
  params.set('pa', payeeVpa.trim());
  params.set('pn', (payeeName || 'Helping Hearts').trim());
  params.set('cu', 'INR');

  const numeric = Number(amount);
  if (Number.isFinite(numeric) && numeric > 0) {
    // UPI expects two decimal places.
    params.set('am', numeric.toFixed(2));
  }

  if (note) {
    // Most apps reject notes longer than 50 characters, and `&`/`#` inside a
    // note breaks some older parsers, so strip them.
    params.set('tn', note.replace(/[&#]/g, ' ').trim().slice(0, 50));
  }

  // URLSearchParams encodes spaces as '+', which several UPI apps do not
  // decode. %20 is handled correctly everywhere.
  return `upi://pay?${params.toString().replace(/\+/g, '%20')}`;
}
