import localFont from 'next/font/local';
import './globals.css';

// Headings font.
//
// `display: 'block'` instead of the default 'swap': 'swap' paints the
// fallback system font first and swaps in Outfit once it loads, so on a slow
// connection the page visibly renders in each device's own default font
// (San Francisco, Segoe UI, Roboto, ...) before switching. 'block' holds
// text invisible for a short beat instead, so every device ends up showing
// the same Outfit/DM Sans typeface rather than a flash of its own system font.
const outfit = localFont({
  src: './fonts/Outfit.ttf',
  variable: '--font-outfit',
  display: 'block',
});

// Body font — same reasoning as Outfit above.
const dmSans = localFont({
  src: './fonts/DMSans.ttf',
  variable: '--font-dm-sans',
  display: 'block',
});

export const metadata = {
  title: 'Helping Hearts NGO | Love You Give Might Help Somebody Live',
  description:
    'Helping Hearts is a Coimbatore non-profit started in 2009 by a group of engineering students. We rescue homeless people from the streets, run shelters and care centres, and take healthcare access to families across Coimbatore District.',
  icons: {
    icon: [{ url: '/helping-hearts.jpeg', type: 'image/jpeg' }],
    shortcut: '/helping-hearts.jpeg',
    apple: '/helping-hearts.jpeg',
  },
};

// `data-scroll-behavior="smooth"` tells Next that the smooth scrolling set in
// globals.css is deliberate. Without it Next warns, and route transitions
// animate the scroll instead of jumping straight to the top of the new page.
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/helping-hearts.jpeg" type="image/jpeg" />
      </head>
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
