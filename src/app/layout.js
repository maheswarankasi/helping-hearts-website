import localFont from 'next/font/local';
import './globals.css';

const outfit = localFont({
  src: './fonts/Outfit.ttf', // Unga font file name-a inga correct-a podunga
  variable: '--font-outfit',
  display: 'swap',
});

// 2. DM Sans Local Font Setup
const dmSans = localFont({
  src: './fonts/DMSans.ttf', // Unga font file name-a inga correct-a podunga
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Helping Hearts NGO | Homes of Hope',
  description: 'Join us in our mission to bring love, shelter, and care.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome Icons mattum iruntha pothum */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      
      {/* font-sans namma CSS-la Outfit nu set pannathala, muzhu site-kum Outfit font apply aagidum */}
      <body className={`${outfit.variable} ${dmSans.variable} font-sans text-gray-700 antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}