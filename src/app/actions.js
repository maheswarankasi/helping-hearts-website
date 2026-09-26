'use server';

import { addDonor } from '@/lib/donors';
import { addVolunteer } from '@/lib/volunteers';
import { normalisePhone, phoneError } from '@/lib/phone';
import { normalisePan, panError } from '@/lib/pan';

/**
 * Server actions for the two public forms.
 *
 * Writing through the server keeps the Firebase SDK (~550 KB) out of the
 * public client bundle entirely, and gives us validation that a visitor
 * cannot skip by disabling JavaScript in the browser.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function checkContactFields(values) {
  const errors = {};

  if (text(values.name).length < 2) {
    errors.name = 'Please enter your name.';
  }
  if (!EMAIL_PATTERN.test(text(values.email))) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneProblem = phoneError(values.phone);
  if (phoneProblem) errors.phone = phoneProblem;

  return errors;
}

export async function submitVolunteer(values) {
  const errors = checkContactFields(values);

  if (!text(values.city)) errors.city = 'Please enter your city.';
  if (!text(values.interest)) {
    errors.interest = 'Please choose how you would like to help.';
  }
  if (!text(values.availability)) {
    errors.availability = 'Please choose your availability.';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    // Store the digits only, so every record is formatted the same way.
    await addVolunteer({ ...values, phone: normalisePhone(values.phone) });
    return { ok: true };
  } catch (error) {
    console.error('Volunteer sign-up failed:', error);
    return {
      ok: false,
      message:
        'Sorry, we could not save your details just now. Please try again, or call our office.',
    };
  }
}

export async function submitDonation(values) {
  const errors = checkContactFields(values);

  const amount = Number(values.amount);
  if (!Number.isFinite(amount) || amount < 1) {
    errors.amount = 'Please enter a valid amount.';
  }
  if (!text(values.purpose)) {
    errors.purpose = 'Please choose what your gift is for.';
  }

  const panProblem = panError(values.pan);
  if (panProblem) errors.pan = panProblem;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    await addDonor({
      ...values,
      phone: normalisePhone(values.phone),
      pan: normalisePan(values.pan),
    });
    return { ok: true, amount };
  } catch (error) {
    console.error('Donor record failed:', error);
    return {
      ok: false,
      message:
        'Sorry, we could not save your details just now. Please try again, or call our office.',
    };
  }
}
