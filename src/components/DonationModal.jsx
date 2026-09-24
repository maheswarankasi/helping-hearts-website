"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { submitDonation } from '@/app/actions';
import { formatAmount } from '@/lib/firestoreUtils';
import { donation, donationPurposes, siteInfo } from '@/lib/siteContent';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  amount: '',
  purpose: donationPurposes[0],
  message: '',
};

const QUICK_AMOUNTS = [500, 1500, 3000, 10000];

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

  const amount = Number(values.amount);
  if (!String(values.amount).trim()) {
    errors.amount = 'Please enter an amount.';
  } else if (!Number.isFinite(amount) || amount < 1) {
    errors.amount = 'Please enter a valid amount.';
  }

  if (!values.purpose) errors.purpose = 'Please choose what your gift is for.';

  return errors;
}

/**
 * Defined at module scope on purpose — see the note in VolunteerForm.jsx.
 */
function FieldError({ message }) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs font-medium text-brand-red flex items-center gap-1.5">
      <i className="fa-solid fa-circle-exclamation"></i>
      {message}
    </p>
  );
}

export default function DonationModal({ onClose }) {
  // 'details' collects who is giving; 'pay' shows the QR to scan.
  const [step, setStep] = useState('details');
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [savedAmount, setSavedAmount] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add('modal-open');
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

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
    const result = await submitDonation(values);
    setIsSaving(false);

    if (result.ok) {
      setSavedAmount(result.amount);
      setStep('pay');
      return;
    }

    // The server re-validates, so it can reject input the browser let through.
    if (result.errors) setErrors(result.errors);
    if (result.message) setSaveError(result.message);
  };

  const copyUpiId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(donation.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — the id is on screen to copy by hand.
    }
  }, []);

  const fieldClasses = (name) =>
    `w-full rounded-xl border bg-brand-cream/60 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:ring-4 ${
      errors[name]
        ? 'border-brand-red focus:ring-red-100'
        : 'border-gray-200 focus:border-brand-blue focus:ring-blue-100'
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      <div
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[2rem] w-full max-w-xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-brand-red hover:text-white transition z-10"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="p-8 md:p-10">
          {step === 'details' ? (
            <>
              <h3
                id="donation-modal-title"
                className="font-heading text-3xl font-black text-gray-900 mb-2"
              >
                Make a Donation
              </h3>
              <div className="w-12 h-1.5 bg-brand-red rounded-full mb-4"></div>
              <p className="text-gray-500 mb-8">
                Tell us a little about yourself so we can send your receipt.
                You&apos;ll get our payment QR code on the next step.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="donor-name"
                      className="block text-sm font-bold text-gray-700 mb-1.5"
                    >
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={values.name}
                      onChange={handleChange('name')}
                      className={fieldClasses('name')}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div>
                    <label
                      htmlFor="donor-phone"
                      className="block text-sm font-bold text-gray-700 mb-1.5"
                    >
                      Phone <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="donor-phone"
                      type="tel"
                      required
                      placeholder="+91 90000 00000"
                      value={values.phone}
                      onChange={handleChange('phone')}
                      className={fieldClasses('phone')}
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="donor-email"
                    className="block text-sm font-bold text-gray-700 mb-1.5"
                  >
                    Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="donor-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    className={fieldClasses('email')}
                  />
                  <FieldError message={errors.email} />
                </div>

                <div>
                  <label
                    htmlFor="donor-amount"
                    className="block text-sm font-bold text-gray-700 mb-1.5"
                  >
                    Amount (₹) <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {QUICK_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() =>
                          handleChange('amount')({
                            target: { value: String(amount) },
                          })
                        }
                        className={`px-4 py-1.5 rounded-full text-sm font-bold border transition ${
                          String(values.amount) === String(amount)
                            ? 'bg-brand-blue text-white border-brand-blue'
                            : 'bg-brand-cream text-brand-blue border-gray-200 hover:border-brand-blue'
                        }`}
                      >
                        ₹{amount.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <input
                    id="donor-amount"
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="Or enter another amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    className={fieldClasses('amount')}
                  />
                  <FieldError message={errors.amount} />
                </div>

                <div>
                  <label
                    htmlFor="donor-purpose"
                    className="block text-sm font-bold text-gray-700 mb-1.5"
                  >
                    I would like this to go towards{' '}
                    <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="donor-purpose"
                    required
                    value={values.purpose}
                    onChange={handleChange('purpose')}
                    className={fieldClasses('purpose')}
                  >
                    {donationPurposes.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.purpose} />
                </div>

                <div>
                  <label
                    htmlFor="donor-message"
                    className="block text-sm font-bold text-gray-700 mb-1.5"
                  >
                    Message{' '}
                    <span className="text-gray-400 font-medium">(optional)</span>
                  </label>
                  <textarea
                    id="donor-message"
                    rows={3}
                    placeholder="Anything you would like to tell us"
                    value={values.message}
                    onChange={handleChange('message')}
                    className={`${fieldClasses('message')} resize-y`}
                  />
                </div>

                <p className="text-xs text-gray-500 leading-relaxed bg-brand-cream rounded-xl p-4">
                  <i className="fa-solid fa-shield-halved text-brand-blue mr-2"></i>
                  We never ask for your card number, UPI PIN, OTP, or bank
                  password. You pay directly from your own UPI app by scanning
                  our QR code.
                </p>

                {saveError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-brand-red text-sm font-medium flex items-start gap-2"
                  >
                    <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                    <span>{saveError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-brand-red text-white font-heading font-bold text-lg px-8 py-4 rounded-full hover:bg-red-800 transition-all shadow-lg shadow-brand-red/30 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      Continue to Payment{' '}
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center text-3xl mb-5">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <h3
                  id="donation-modal-title"
                  className="font-heading text-3xl font-black text-gray-900 mb-3"
                >
                  Scan &amp; Pay {formatAmount(savedAmount)}
                </h3>
                <p className="text-gray-500 mb-8">
                  Thank you, {values.name.trim().split(' ')[0]}. Open Google
                  Pay, PhonePe, Paytm, or any UPI app and scan the code below.
                </p>
              </div>

              {donation.qrImage ? (
                <div className="bg-white border-4 border-brand-softblue rounded-[2rem] p-6 max-w-xs mx-auto">
                  <Image
                    src={donation.qrImage}
                    alt={`UPI QR code for donating to ${donation.payeeName}`}
                    width={320}
                    height={320}
                    unoptimized
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              ) : (
                <div className="bg-brand-cream border-2 border-dashed border-gray-300 rounded-[2rem] p-8 text-center max-w-xs mx-auto">
                  <i className="fa-solid fa-qrcode text-5xl text-gray-300 mb-4"></i>
                  <p className="text-sm text-gray-600 font-medium">
                    Our payment QR code is being set up. Please use the details
                    below, or call our office to donate.
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-3">
                {donation.upiId && (
                  <div className="flex items-center justify-between gap-3 bg-brand-softblue rounded-xl px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                        UPI ID
                      </p>
                      <p className="font-heading font-bold text-brand-blue truncate">
                        {donation.upiId}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={copyUpiId}
                      className="shrink-0 px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-bold hover:bg-brand-red transition"
                    >
                      {copied ? (
                        <>
                          <i className="fa-solid fa-check mr-1"></i> Copied
                        </>
                      ) : (
                        'Copy'
                      )}
                    </button>
                  </div>
                )}

                {donation.bank.accountNumber && (
                  <div className="bg-brand-cream rounded-xl px-5 py-4 text-sm">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">
                      Bank Transfer
                    </p>
                    <dl className="space-y-1 text-gray-700">
                      <div className="flex gap-2">
                        <dt className="font-semibold">Name:</dt>
                        <dd>{donation.bank.accountName}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold">A/c No:</dt>
                        <dd>{donation.bank.accountNumber}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold">IFSC:</dt>
                        <dd>{donation.bank.ifsc}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold">Bank:</dt>
                        <dd>{donation.bank.bankName}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>

              <div className="mt-8 bg-brand-cream rounded-2xl p-5 text-sm text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-800 mb-2">
                  <i className="fa-solid fa-circle-info text-brand-blue mr-2"></i>
                  One last step
                </p>
                <p>
                  Since we do not use a payment gateway, your transfer
                  won&apos;t reach us automatically. Please send the payment
                  screenshot or UPI reference number to{' '}
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="text-brand-blue font-semibold hover:underline break-all"
                  >
                    {siteInfo.email}
                  </a>{' '}
                  or WhatsApp it to{' '}
                  <span className="font-semibold">{siteInfo.phone}</span> so we
                  can confirm it and issue your receipt.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full bg-brand-blue text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-brand-red transition-colors"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
