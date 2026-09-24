"use client";

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

// The modal is only needed once someone decides to donate, so keep it out of
// the page's initial JavaScript and fetch it on the click.
const DonationModal = dynamic(() => import('./DonationModal'), { ssr: false });

/**
 * Button that opens the donation modal. Kept separate from the donate page so
 * the page itself can stay a server component.
 */
export default function DonateCTA({
  label = 'Donate Now',
  className = 'inline-flex items-center justify-center gap-3 bg-brand-red text-white font-heading font-black text-lg px-10 py-4 rounded-full hover:bg-red-800 hover:-translate-y-1 transition-all shadow-lg shadow-brand-red/30 btn-pulse-red',
  icon = 'fa-solid fa-hand-holding-heart',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {label} <i className={icon}></i>
      </button>

      {isOpen && <DonationModal onClose={close} />}
    </>
  );
}
