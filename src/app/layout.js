import './globals.css'; // Tailwind CSS connect aagurathu inga thaan

// Default SEO & Meta tags
export const metadata = {
  title: 'Helping Hearts NGO | Homes of Hope',
  description: 'Join us in our mission to bring love, shelter, and care to the elderly, disabled, and children.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Poppins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />

        {/* FontAwesome Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      
      {/* 
        font-sans: Tailwind config-la namma set panna Poppins font-a apply pannum.
        antialiased: Ezhuthukkalai (text) theliva matrum smooth aaga kaatum.
      */}
      <body className="font-sans text-gray-700 antialiased bg-white">
        
        {/* 
          Ithukulla thaan (public)/layout.jsx allathu admin/layout.jsx automatic-a ukkarum 
        */}
        {children}
        
      </body>
    </html>
  );
}