import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import SmartImage from '@/components/SmartImage';
import VolunteerCTA from '@/components/VolunteerCTA';
import { getEventById } from '@/lib/events';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) return { title: 'Event not found | Helping Hearts NGO' };

  return {
    title: `${event.title} | Helping Hearts NGO`,
    description: event.summary.slice(0, 160),
  };
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const galleryImages = event.images.slice(1);

  return (
    <>
      {/* Hero banner uses the first uploaded photo */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 bg-brand-blue overflow-hidden">
        {event.image && (
          <SmartImage
            src={event.image}
            alt={event.title}
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
            <Link href="/events" className="hover:text-white transition">
              Events
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {event.dateLabel && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest">
                <i className="fa-solid fa-calendar-day text-brand-red"></i>{' '}
                {event.dateLabel}
              </span>
            )}
            {event.location && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest">
                <i className="fa-solid fa-location-dot text-brand-red"></i>{' '}
                {event.location}
              </span>
            )}
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-black text-white leading-[1.1]">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
            <h2 className="font-heading text-3xl font-black text-gray-900 mb-2">
              About This Event
            </h2>
            <div className="w-16 h-2 bg-brand-red rounded-full mb-8"></div>

            <div className="text-gray-600 leading-relaxed text-lg space-y-5 whitespace-pre-line">
              {event.description || event.summary}
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-14 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
              <PhotoGallery
                images={galleryImages}
                title="Event Gallery"
                alt={event.title}
              />
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-blue text-brand-blue font-bold font-heading hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to All Events
            </Link>
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
