import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Mela Header */}
      {/* <Header /> */}
      
      {/* Nadula maarikitte irukka content (Home, Events page etc) */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Keela Footer */}
      {/* <Footer /> */}
    </div>
  );
}