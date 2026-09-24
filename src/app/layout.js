import localFont from 'next/font/local';
import './globals.css';

// Headings font
const outfit = localFont({
  src: './fonts/Outfit.ttf',
  variable: '--font-outfit',
  display: 'swap',
});

// Body font
const dmSans = localFont({
  src: './fonts/DMSans.ttf',
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Helping Hearts NGO | Love You Give Might Help Somebody Live',
  description:
    'Helping Hearts is a Coimbatore non-profit started in 2009 by a group of engineering students. We rescue homeless people from the streets, run shelters and care centres, and take healthcare access to families across Coimbatore District.',
  icons: { icon: '/helping-hearts.jpeg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* FontAwesome is imported from globals.css rather than linked from a
          CDN — see the note there. No <head> overrides are needed. */}
      <body
        className={`${outfit.variable} ${dmSans.variable} font-body text-gray-700 bg-brand-cream antialiased overflow-x-hidden relative`}
      >
        {children}
      </body>
    </html>
  );
}
