"use client";

import { useState } from 'react';
import { submitVolunteer } from '@/app/actions';
import { volunteerAvailability, volunteerInterests } from '@/lib/siteContent';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  city: '',
  interest: '',
  availability: '',
  message: '',
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits).';
  }

  if (!values.city.trim()) errors.city = 'Please enter your city.';
  if (!values.interest) errors.interest = 'Please choose how you would like to help.';
  if (!values.availability) errors.availability = 'Please choose your availability.';

  return errors;
}

/**
 * Defined at module scope on purpose. Declaring it inside the component body
 * creates a brand new component type on every render, which defeats the React
 * Compiler's memoisation and remounts the node each keystroke.
 */
function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p
      id={id}
      className="mt-2 text-sm font-medium text-brand-red flex items-center gap-2"
    >
      <i className="fa-solid fa-circle-exclamation"></i>
      {message}
    </p>
  );
}

export default function VolunteerForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleChange = (name) => (e) => {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setSaveError(null);

    if (hasSubmitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setSaveError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    const result = await submitVolunteer(values);
    setIsSaving(false);

    if (result.ok) {
      setValues(EMPTY_FORM);
      setHasSubmitted(false);
      setIsDone(true);
      return;
    }

    // The server re-validates, so it can reject input the browser let through.
    if (result.errors) setErrors(result.errors);
    if (result.message) setSaveError(result.message);
  };

  const fieldClasses = (name) =>
    `w-full rounded-2xl border bg-brand-cream/60 px-5 py-3.5 text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:ring-4 ${
      errors[name]
        ? 'border-brand-red focus:ring-red-100'
        : 'border-gray-200 focus:border-brand-blue focus:ring-blue-100'
    }`;

  if (isDone) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center text-4xl mb-6">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3 className="font-heading text-3xl font-black text-gray-900 mb-4">
          Welcome to the family!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          Your details have reached us. One of our coordinators will get in
          touch with you soon to talk through the next steps.
        </p>
        <button
          type="button"
          onClick={() => setIsDone(false)}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-blue text-brand-blue font-bold font-heading hover:bg-brand-blue hover:text-white transition-all"
        >
          Sign up someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
            <i className="fa-solid fa-user text-brand-blue mr-2"></i>
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClasses('name')}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            <i className="fa-solid fa-envelope text-brand-blue mr-2"></i>
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClasses('email')}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
            <i className="fa-solid fa-phone text-brand-blue mr-2"></i>
            Phone Number <span className="text-brand-red">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="+91 90000 00000"
            value={values.phone}
            onChange={handleChange('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={fieldClasses('phone')}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">
            <i className="fa-solid fa-location-dot text-brand-blue mr-2"></i>
            City <span className="text-brand-red">*</span>
          </label>
          <input
            id="city"
            type="text"
            required
            placeholder="e.g. Coimbatore"
            value={values.city}
            onChange={handleChange('city')}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'city-error' : undefined}
            className={fieldClasses('city')}
          />
          <FieldError id="city-error" message={errors.city} />
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-bold text-gray-700 mb-2">
            <i className="fa-solid fa-hand-holding-heart text-brand-blue mr-2"></i>
            How would you like to help?{' '}
            <span className="text-brand-red">*</span>
          </label>
          <select
            id="interest"
            required
            value={values.interest}
            onChange={handleChange('interest')}
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? 'interest-error' : undefined}
            className={fieldClasses('interest')}
          >
            <option value="">Select an option</option>
            {volunteerInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <FieldError id="interest-error" message={errors.interest} />
        </div>

        <div>
          <label
            htmlFor="availability"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            <i className="fa-solid fa-clock text-brand-blue mr-2"></i>
            Availability <span className="text-brand-red">*</span>
          </label>
          <select
            id="availability"
            required
            value={values.availability}
            onChange={handleChange('availability')}
            aria-invalid={Boolean(errors.availability)}
            aria-describedby={
              errors.availability ? 'availability-error' : undefined
            }
            className={fieldClasses('availability')}
          >
            <option value="">Select an option</option>
            {volunteerAvailability.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <FieldError id="availability-error" message={errors.availability} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
          <i className="fa-solid fa-comment-dots text-brand-blue mr-2"></i>
          Anything else you would like us to know?{' '}
          <span className="text-gray-400 font-medium">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Your background, skills, or any questions you have..."
          value={values.message}
          onChange={handleChange('message')}
          className={`${fieldClasses('message')} resize-y`}
        />
      </div>

      {saveError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-brand-red font-medium flex items-start gap-3"
        >
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>{saveError}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto bg-brand-red text-white font-heading font-bold text-lg px-10 py-4 rounded-full hover:bg-red-800 hover:-translate-y-1 transition-all shadow-lg shadow-brand-red/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSaving ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
            </>
          ) : (
            <>
              Join Us <i className="fa-solid fa-heart"></i>
            </>
          )}
        </button>
        <p className="text-sm text-gray-500">
          Fields marked <span className="text-brand-red font-bold">*</span> are
          required.
        </p>
      </div>
    </form>
  );
}
