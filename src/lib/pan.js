/**
 * Indian PAN (Permanent Account Number) validation.
 *
 * Format is ABCDE1234F — five letters, four digits, one letter. The fourth
 * character encodes the holder type ('P' for an individual, 'C' for a
 * company, and so on), but we accept any letter rather than second-guessing
 * who is donating.
 *
 * Shared between the browser and the server action so the two can never
 * disagree about what counts as valid.
 */

const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const PAN_LENGTH = 10;

/** Uppercases, strips anything that isn't alphanumeric, caps at 10. */
export function normalisePan(value) {
  return String(value ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, PAN_LENGTH);
}

export function isValidPan(value) {
  return PAN_PATTERN.test(normalisePan(value));
}

/** The error to show, or null when the PAN is fine. */
export function panError(value) {
  const pan = normalisePan(value);

  if (pan === '') return 'Please enter your PAN number.';
  if (pan.length < PAN_LENGTH) {
    return `PAN must be 10 characters (${pan.length} entered).`;
  }
  if (!PAN_PATTERN.test(pan)) {
    return 'PAN should look like ABCDE1234F — five letters, four digits, one letter.';
  }
  return null;
}

/** Props the PAN input should share wherever it appears. */
export const PAN_INPUT_PROPS = {
  type: 'text',
  autoComplete: 'off',
  autoCapitalize: 'characters',
  spellCheck: false,
  maxLength: PAN_LENGTH,
  pattern: '[A-Z]{5}[0-9]{4}[A-Z]',
  placeholder: 'ABCDE1234F',
};
