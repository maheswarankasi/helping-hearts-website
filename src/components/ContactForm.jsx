"use client";

import { useState } from 'react';
import { PHONE_INPUT_PROPS, normalisePhone, phoneError } from '@/lib/phone';

const FIELDS = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Your full name',
    icon: 'fa-solid fa-user',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    icon: 'fa-solid fa-envelope',
  },
  {
    name: 'phone',
    label: 'Mobile Number',
    icon: 'fa-solid fa-phone',
    ...PHONE_INPUT_PROPS,
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'What is this about?',
    icon: 'fa-solid fa-tag',
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

// Every field is mandatory — each validator returns an error string or null.
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

  const phoneProblem = phoneError(values.phone);
  if (phoneProblem) errors.phone = phoneProblem;

  if (!values.subject.trim()) {
    errors.subject = 'Please enter a subject.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (name) => (e) => {
    // The phone field silently discards anything that isn't a digit, so the
    // 10-digit rule is impossible to break by typing.
    const value =
      name === 'phone' ? normalisePhone(e.target.value) : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear a field's error as soon as the user starts fixing it
    if (hasSubmitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setIsSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // TODO: send the enquiry. Replace this block with a POST to a route
    // handler (e.g. `/api/contact`) that mails the details on to the NGO.
    setIsSent(true);
    setValues(EMPTY_FORM);
    setHasSubmitted(false);
  };

  const inputClasses = (name) =>
    `w-full rounded-2xl border bg-brand-cream/60 px-5 py-3.5 text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:ring-4 ${
      errors[name]
        ? 'border-brand-red focus:ring-red-100'
        : 'border-gray-200 focus:border-brand-blue focus:ring-blue-100'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FIELDS.map(({ name, label, icon, ...inputProps }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              <i className={`${icon} text-brand-blue mr-2`}></i>
              {label} <span className="text-brand-red">*</span>
            </label>
            <input
              id={name}
              name={name}
              required
              // Carries this field's own type/inputMode/maxLength/pattern.
              {...inputProps}
              value={values[name]}
              onChange={handleChange(name)}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className={inputClasses(name)}
            />
            {errors[name] && (
              <p
                id={`${name}-error`}
                className="mt-2 text-sm font-medium text-brand-red flex items-center gap-2"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                {errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          <i className="fa-solid fa-comment-dots text-brand-blue mr-2"></i>
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us how you would like to help, or what you would like to know..."
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClasses('message')} resize-y`}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-2 text-sm font-medium text-brand-red flex items-center gap-2"
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            {errors.message}
          </p>
        )}
      </div>

      {isSent && (
        <div
          role="status"
          className="rounded-2xl border border-blue-200 bg-brand-softblue px-5 py-4 text-brand-blue font-medium flex items-start gap-3"
        >
          <i className="fa-solid fa-circle-info mt-0.5"></i>
          <span>
            All fields look good. Email delivery is not connected yet — this
            form currently validates only.
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto bg-brand-red text-white font-heading font-bold text-lg px-10 py-4 rounded-full hover:bg-red-800 hover:-translate-y-1 transition-all shadow-lg shadow-brand-red/30 flex items-center justify-center gap-3"
        >
          Send Message <i className="fa-solid fa-paper-plane"></i>
        </button>
        <p className="text-sm text-gray-500">
          Fields marked <span className="text-brand-red font-bold">*</span> are
          required.
        </p>
      </div>
    </form>
  );
}
