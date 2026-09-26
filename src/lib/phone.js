/**
 * Indian mobile numbers on the public forms: exactly 10 digits, nothing else.
 *
 * Shared between the browser and the server actions so the two can never
 * disagree about what counts as valid.
 */

export const PHONE_LENGTH = 10;

/**
 * Strips everything that isn't a digit and caps the result at 10.
 *
 * Indian numbers are very often pasted with a country code or a trunk zero.
 * Those prefixes are removed first — otherwise "+91 99944 77721" would be
 * truncated to the first ten digits and silently store the wrong number.
 */
export function normalisePhone(value) {
  let digits = String(value ?? '').replace(/\D/g, '');

  if (digits.length > PHONE_LENGTH) {
    if (digits.startsWith('91')) digits = digits.slice(2);
    else if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
  }

  return digits.slice(0, PHONE_LENGTH);
}

export function isValidPhone(value) {
  return new RegExp(`^\\d{${PHONE_LENGTH}}$`).test(normalisePhone(value));
}

/**
 * The error to show, or null when the number is fine. Distinguishes "empty"
 * from "wrong length" so the message is actually useful.
 */
export function phoneError(value) {
  const digits = normalisePhone(value);

  if (digits === '') return 'Please enter your mobile number.';
  if (digits.length < PHONE_LENGTH) {
    return `Mobile number must be ${PHONE_LENGTH} digits (${digits.length} entered).`;
  }
  return null;
}

/** Props every phone input on the public site should share. */
export const PHONE_INPUT_PROPS = {
  type: 'tel',
  inputMode: 'numeric',
  autoComplete: 'tel',
  maxLength: PHONE_LENGTH,
  // Keeps the browser's own validation in step with ours.
  pattern: `\\d{${PHONE_LENGTH}}`,
  placeholder: '9876543210',
};
