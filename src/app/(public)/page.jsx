import Link from 'next/link';
// import Hero from '@/components/Hero';
// import Features from '@/components/Features';

export default function HomePage() {
  return (
    <>
      {/* 
        <Hero />
        <Features />
      */}
      <section className="py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-sans text-4xl md:text-6xl font-bold text-brand-blue mb-6">
          Helping Hearts NGO
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl px-4">
          Welcome to our public site! Explore the safe havens we operate to provide care, comfort, and a loving environment for those in need.
        </p>
        
        {/* Shelters Page-ku Pora Link */}
        <Link 
          href="/shelters" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-md flex items-center gap-2"
        >
          View Our Shelters <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>
    </>
  );
}