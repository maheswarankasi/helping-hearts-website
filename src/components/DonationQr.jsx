"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { donation } from '@/lib/siteContent';
import { buildUpiUri, isValidVpa } from '@/lib/upi';

/**
 * The QR a donor scans.
 *
 * When a UPI ID is configured we generate the code from a `upi://pay` link
 * that includes the amount, so the donor's app opens pre-filled. Falling back
 * to the static exported QR is still supported, but that image cannot carry
 * an amount — the donor has to type it in — so we say so explicitly instead
 * of letting them assume otherwise.
 */
export default function DonationQr({ amount, note }) {
  const [dataUrl, setDataUrl] = useState(null);
  const [failed, setFailed] = useState(false);

  const canGenerate = isValidVpa(donation.upiId);
  const upiUri = canGenerate
    ? buildUpiUri({
        payeeVpa: donation.upiId,
        payeeName: donation.payeeName,
        amount,
        note,
      })
    : null;

  useEffect(() => {
    if (!upiUri) return;

    let isActive = true;
    // Dynamic import keeps the QR encoder out of every other page's bundle.
    import('qrcode')
      .then((QRCode) =>
        (QRCode.default ?? QRCode).toDataURL(upiUri, {
          errorCorrectionLevel: 'M',
          margin: 1,
          width: 640,
          color: { dark: '#0a3085ff', light: '#ffffffff' },
        })
      )
      .then((url) => {
        if (isActive) setDataUrl(url);
      })
      .catch((error) => {
        console.error('QR generation failed:', error);
        if (isActive) setFailed(true);
      });

    return () => {
      isActive = false;
    };
  }, [upiUri]);

  // 1. Generated, amount-carrying QR.
  if (upiUri && !failed) {
    return (
      <div>
        <div className="bg-white border-4 border-brand-softblue rounded-[2rem] p-6 max-w-xs mx-auto">
          {dataUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={dataUrl}
              alt={`UPI QR code to pay ${donation.payeeName}`}
              width={320}
              height={320}
              className="w-full h-auto rounded-xl"
            />
          ) : (
            <div className="w-full aspect-square rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
              <i className="fa-solid fa-qrcode text-4xl"></i>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          <i className="fa-solid fa-circle-check text-green-600 mr-1"></i>
          The amount is already built into this code — your app will show it.
        </p>

        {/* On a phone the donor is already holding, tapping beats scanning. */}
        <a
          href={upiUri}
          className="mt-4 sm:hidden flex items-center justify-center gap-2 bg-brand-blue text-white font-heading font-bold py-3.5 rounded-full"
        >
          <i className="fa-solid fa-mobile-screen"></i> Open my UPI app
        </a>
      </div>
    );
  }

  // 2. A static QR image the NGO exported from their own payment app.
  if (donation.qrImage) {
    return (
      <div>
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
        <p className="text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4">
          <i className="fa-solid fa-circle-exclamation mr-1"></i>
          This is a fixed QR code, so please type the amount into your UPI app
          yourself.
        </p>
      </div>
    );
  }

  // 3. Nothing configured yet.
  return (
    <div className="bg-brand-cream border-2 border-dashed border-gray-300 rounded-[2rem] p-8 text-center max-w-xs mx-auto">
      <i className="fa-solid fa-qrcode text-5xl text-gray-300 mb-4"></i>
      <p className="text-sm text-gray-600 font-medium">
        Our payment QR code is being set up. Please use the details below, or
        call our office to donate.
      </p>
    </div>
  );
}
