import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/animations/ScrollProgress';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <ScrollProgress />
      <Header />

      <main className="grow">{children}</main>

      <Footer />
      <BackToTop />
    </div>
  );
}
