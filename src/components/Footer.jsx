import Link from 'next/link';
import { siteInfo } from '@/lib/siteContent';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Events', href: '/events' },
  { name: 'Our Shelters', href: '/shelters' },
  { name: 'Join Us', href: '/join-us' },
  { name: 'Donate Us', href: '/donate' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="bg-gray-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-10 relative"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-gray-800 pb-12 mb-10">
          <div className="w-full md:w-1/3">
            <img
              src={siteInfo.logo}
              alt={siteInfo.name}
              className="h-16 mb-6 bg-white p-2 rounded-xl object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Dedicated to serving the elderly, orphans, and physically
              challenged individuals with care, dignity, and compassion through
              our safe homes.
            </p>
            <div className="flex space-x-3">
              {siteInfo.socials.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition ${
                    index % 2 === 0
                      ? 'hover:bg-brand-blue'
                      : 'hover:bg-brand-red'
                  }`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-wrap md:flex-nowrap gap-12 justify-evenly">
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition inline-flex items-center gap-2"
                    >
                      <i className="fa-solid fa-minus text-brand-red w-3"></i>{' '}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot mt-1 text-brand-red"></i>
                  <span>
                    {siteInfo.address[0]}
                    <br />
                    {siteInfo.address[1]}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-brand-red"></i>
                  <span>{siteInfo.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-brand-red"></i>
                  <span>{siteInfo.email}</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-clock mt-1 text-brand-red"></i>
                  <span>{siteInfo.officeHours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Helping Hearts NGO. All Rights
            Reserved.
            <span className="block md:inline md:ml-2 mt-1 md:mt-0">
              Reg. No. {siteInfo.registrationNumber}
            </span>
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
