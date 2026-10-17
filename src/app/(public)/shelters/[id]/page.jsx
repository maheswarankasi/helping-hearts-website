import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import SmartImage from '@/components/SmartImage';
import RichText from '@/components/RichText';
import { toPlainText } from '@/lib/richText';
import VolunteerCTA from '@/components/VolunteerCTA';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getShelterById } from '@/lib/shelters';
import { getCategoryBadgeStyle } from '@/lib/shelterCategories';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const shelter = await getShelterById(id);

  if (!shelter) return { title: 'Shelter not found | Helping Hearts NGO' };

  return {
    title: `${shelter.name} | Helping Hearts NGO`,
    description: toPlainText(shelter.description).slice(0, 160),
  };
}

export default async function ShelterDetailsPage({ params }) {
  const { id } = await params;
  const shelter = await getShelterById(id);

  if (!shelter) notFound();

  const galleryImages = shelter.images.slice(0);
  const categoryBadge = getCategoryBadgeStyle(shelter.category);

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
          <ScrollReveal variant="fade-up">
            <nav className="text-sm text-blue-100 font-medium mb-6 flex items-center flex-wrap gap-2">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link href="/programs" className="hover:text-white transition">
                Our Programs
              </Link>
              <span className="text-white/40">/</span>
              <Link
                href={`/programs/${shelter.category || 'long-term'}`}
                className="hover:text-white transition font-semibold"
              >
                {categoryBadge.label} Shelters
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/70 truncate">{shelter.name}</span>
            </nav>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              <Link
                href={`/programs/${shelter.category || 'long-term'}`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider hover:bg-white/25 transition"
              >
                <span className={`w-2 h-2 rounded-full ${categoryBadge.dot}`}></span>
                <span>{categoryBadge.fullLabel}</span>
                <i className="fa-solid fa-arrow-right text-[10px] pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
              </Link>

              {shelter.tag && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                  {shelter.tag}
                </div>
              )}
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              {shelter.name}
            </h1>

            {shelter.address && (
              <p className="text-blue-50 text-lg font-light flex items-start gap-3 max-w-2xl">
                <i className="fa-solid fa-location-dot mt-1.5 text-brand-red"></i>
                {shelter.address}
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <ScrollReveal
              variant="fade-right"
              duration={0.65}
              className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12"
            >
              <h2 className="font-heading text-3xl font-black text-gray-900 mb-2">
                About This Shelter
              </h2>
              <div className="w-16 h-2 bg-brand-red rounded-full mb-8"></div>

              <RichText
                value={shelter.description}
                className="text-gray-600 leading-relaxed text-lg"
                fallback={<p className="text-gray-500">Details coming soon.</p>}
              />
            </ScrollReveal>

            <ScrollReveal
              variant="fade-left"
              duration={0.65}
              delay={0.1}
              className="space-y-6"
            >
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

              {/* Programme Category card */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="text-brand-red text-3xl mb-4">
                  <i className="fa-solid fa-diagram-project"></i>
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                  Programme Tier
                </p>
                <p className="font-heading text-xl font-bold text-gray-900 mb-3">
                  {categoryBadge.fullLabel}
                </p>
                <Link
                  href={`/programs/${shelter.category || 'long-term'}`}
                  className="group inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-red transition"
                >
                  <span>View Programme Objectives</span>
                  <i className="fa-solid fa-arrow-right text-[10px] pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
                </Link>
              </div>

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
            </ScrollReveal>
          </div>

          {galleryImages.length > 0 && (
            <ScrollReveal variant="fade-up" className="mt-14">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
                <PhotoGallery
                  images={galleryImages}
                  title="Shelter Gallery"
                  alt={shelter.name}
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal variant="fade-up" className="mt-14 text-center">
            <Link
              href="/shelters"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-red text-brand-red font-bold font-heading hover:bg-brand-red hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to All Shelters
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
