import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import SmartImage from '@/components/SmartImage';
import VolunteerCTA from '@/components/VolunteerCTA';
import { getShelterById } from '@/lib/shelters';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const shelter = await getShelterById(id);

  if (!shelter) return { title: 'Shelter not found | Helping Hearts NGO' };

  return {
    title: `${shelter.name} | Helping Hearts NGO`,
    description: shelter.description.slice(0, 160),
  };
}

export default async function ShelterDetailsPage({ params }) {
  const { id } = await params;
  const shelter = await getShelterById(id);

  if (!shelter) notFound();

  const galleryImages = shelter.images.slice(1);

  return (
    <>
      {/* Hero banner uses the first uploaded photo */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 bg-brand-blue overflow-hidden">
        {shelter.image && (
          <SmartImage
            src={shelter.image}
            alt={shelter.name}
            fill
            priority
            sizes="100vw"
            quality={60}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 hero-overlay"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <nav className="text-sm text-blue-100 font-medium mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/shelters" className="hover:text-white transition">
              Our Shelters
            </Link>
          </nav>

          {shelter.tag && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>{' '}
              {shelter.tag}
            </div>
          )}

          <h1 className="font-heading text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
            {shelter.name}
          </h1>

          {shelter.address && (
            <p className="text-blue-50 text-lg font-light flex items-start gap-3 max-w-2xl">
              <i className="fa-solid fa-location-dot mt-1.5 text-brand-red"></i>
              {shelter.address}
            </p>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
              <h2 className="font-heading text-3xl font-black text-gray-900 mb-2">
                About This Shelter
              </h2>
              <div className="w-16 h-2 bg-brand-red rounded-full mb-8"></div>

              <div className="text-gray-600 leading-relaxed text-lg space-y-5 whitespace-pre-line">
                {shelter.description || 'Details coming soon.'}
              </div>
            </div>

            <aside className="space-y-6">
              {/* Capacity card is skipped entirely when the field is blank */}
              {shelter.capacity && (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                  <div className="text-brand-blue text-3xl mb-4">
                    <i className={shelter.capacityIcon}></i>
                  </div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Capacity
                  </p>
                  <p className="font-heading text-2xl font-bold text-gray-900">
                    {shelter.capacity}
                  </p>
                </div>
              )}

              {shelter.images.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                  <div className="text-brand-red text-3xl mb-4">
                    <i className="fa-solid fa-images"></i>
                  </div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Photos
                  </p>
                  <p className="font-heading text-2xl font-bold text-gray-900">
                    {shelter.images.length}
                  </p>
                </div>
              )}

              {shelter.mapUrl && (
                <a
                  href={shelter.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-brand-blue text-white font-heading font-bold py-4 rounded-full hover:bg-brand-red transition-colors shadow-lg"
                >
                  <i className="fa-solid fa-map mr-2"></i> View on Map
                </a>
              )}
            </aside>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-14 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
              <PhotoGallery
                images={galleryImages}
                title="Shelter Gallery"
                alt={shelter.name}
              />
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href="/shelters"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-red text-brand-red font-bold font-heading hover:bg-brand-red hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to All Shelters
            </Link>
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
