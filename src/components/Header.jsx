"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks, siteInfo } from '@/lib/siteContent';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Solidify the glass nav once the page scrolls away from the top
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide the nav out of the way while the footer is in view
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Contact strip */}
      <div className="bg-white text-brand-blue text-sm py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span>
              <i className="fa-solid fa-phone mr-2"></i> {siteInfo.phone}
            </span>
            <a
              href={`https://wa.me/91${siteInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-red transition"
            >
              <i className="fa-brands fa-whatsapp mr-2 text-green-600"></i>{' '}
              {siteInfo.whatsappDisplay}
            </a>
            <span className="hidden lg:inline">
              <i className="fa-solid fa-envelope mr-2"></i> {siteInfo.email}
            </span>
            <span className="hidden xl:inline">
              <i className="fa-solid fa-location-dot mr-2"></i>{' '}
              {siteInfo.shortAddress}
            </span>
            <span className="hidden 2xl:inline">
              <i className="fa-solid fa-clock mr-2"></i> {siteInfo.officeHours}
            </span>
          </div>
          <div className="flex space-x-4">
            {siteInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hover:text-brand-red transition"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glass navigation */}
      <div
        className={`fixed w-full top-4 sm:top-12 z-50 px-4 transition-transform duration-500 ease-in-out ${
          isHidden ? '-translate-y-full' : ''
        }`}
      >
        <header
          className={`container mx-auto max-w-6xl glass-nav border border-white/60 rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${
            isScrolled
              ? 'shadow-xl bg-white/95'
              : 'shadow-lg shadow-brand-blue/5'
          }`}
        >
          <Link href="/" className="flex items-center">
            <Image
              src={siteInfo.logo}
              alt={siteInfo.name}
              width={132}
              height={48}
              priority
              className="h-12 w-auto object-contain rounded"
            />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex space-x-8 items-center font-semibold text-gray-600 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-brand-red transition ${
                  isActive(link.href) ? 'text-brand-blue' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/join-us"
              className="bg-brand-red text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-800 transition-all hover:scale-105 btn-pulse-red flex items-center gap-2"
            >
              Join Us <i className="fa-solid fa-heart"></i>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="lg:hidden text-brand-blue text-xl bg-brand-softblue w-10 h-10 rounded-full flex items-center justify-center"
          >
            <i
              className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}
            ></i>
          </button>
        </header>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t rounded-[2rem] mt-2 shadow-xl absolute w-[calc(100%-2rem)] left-4">
            <div className="flex flex-col px-4 py-4 space-y-4 font-medium text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={isActive(link.href) ? 'text-brand-blue' : 'text-gray-600'}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/join-us"
                onClick={closeMobileMenu}
                className="bg-brand-red text-white mx-auto px-6 py-2 rounded-full w-max btn-pulse-red"
              >
                Join Us <i className="fa-solid fa-heart"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
