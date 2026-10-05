/**
 * Indian Aadhaar number validation.
 *
 * Format is 12 digits. UIDAI never issues a number starting with 0 or 1, so
 * that is checked alongside the length and digit-only shape.
 *
 * Shared between the browser and the server action so the two can never
 * disagree about what counts as valid — same pattern as lib/pan.js.
 */

const AADHAAR_PATTERN = /^[2-9][0-9]{11}$/;

export const AADHAAR_LENGTH = 12;

/** Strips everything that isn't a digit, caps at 12. */
export function normaliseAadhaar(value) {
  return String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, AADHAAR_LENGTH);
}

export function isValidAadhaar(value) {
  return AADHAAR_PATTERN.test(normaliseAadhaar(value));
}

/** The error to show, or null when the Aadhaar number is fine. */
export function aadhaarError(value) {
  const aadhaar = normaliseAadhaar(value);

  if (aadhaar === '') return 'Please enter your Aadhaar number.';
  if (aadhaar.length < AADHAAR_LENGTH) {
    return `Aadhaar number must be 12 digits (${aadhaar.length} entered).`;
  }
  if (!AADHAAR_PATTERN.test(aadhaar)) {
    return 'Please enter a valid Aadhaar number.';
  }
  return null;
}

/** Props the Aadhaar input should share wherever it appears. */
export const AADHAAR_INPUT_PROPS = {
  type: 'text',
  inputMode: 'numeric',
  autoComplete: 'off',
  maxLength: AADHAAR_LENGTH,
  pattern: '[2-9][0-9]{11}',
  placeholder: '234567890123',
};
