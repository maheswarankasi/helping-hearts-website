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
  title: 'Helping Hearts NGO | Homes of Hope',
  description:
    'Helping Hearts is a Coimbatore based non-profit providing shelter, nourishment and boundless care to the elderly, specially-abled and orphaned children.',
  icons: { icon: '/helping-hearts.jpeg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome icons used across the site */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body
        className={`${outfit.variable} ${dmSans.variable} font-body text-gray-700 bg-brand-cream antialiased overflow-x-hidden relative`}
      >
        {children}
      </body>
    </html>
  );
}
