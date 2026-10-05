/**
 * The donation form's "PAN or Aadhaar" proof-of-identity field — a single
 * choice between the two, not both. Keeping the switch logic in one place
 * means the browser form and the server action can never disagree about
 * which validator applies.
 */

import {
  AADHAAR_INPUT_PROPS,
  aadhaarError,
  normaliseAadhaar,
} from './aadhaar';
import { PAN_INPUT_PROPS, normalisePan, panError } from './pan';

export const ID_TYPES = {
  PAN: 'PAN',
  AADHAAR: 'AADHAAR',
};

/** Options for the PAN/Aadhaar picker, in display order. */
export const ID_TYPE_OPTIONS = [
  { value: ID_TYPES.PAN, label: 'PAN Card' },
  { value: ID_TYPES.AADHAAR, label: 'Aadhaar Card' },
];

/** Falls back to PAN for anything that isn't a recognised type. */
function isAadhaar(idType) {
  return idType === ID_TYPES.AADHAAR;
}

export function normaliseIdNumber(idType, value) {
  return isAadhaar(idType) ? normaliseAadhaar(value) : normalisePan(value);
}

export function idNumberError(idType, value) {
  return isAadhaar(idType) ? aadhaarError(value) : panError(value);
}

export function idInputProps(idType) {
  return isAadhaar(idType) ? AADHAAR_INPUT_PROPS : PAN_INPUT_PROPS;
}

export function idLabel(idType) {
  return isAadhaar(idType) ? 'Aadhaar Number' : 'PAN Number';
}
