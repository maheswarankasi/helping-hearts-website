import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import SmartImage from '@/components/SmartImage';
import RichText from '@/components/RichText';
import { isRichEmpty, toPlainText } from '@/lib/richText';
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
    description: toPlainText(event.summary).slice(0, 160),
  };
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const galleryImages = event.images.slice(1);

  // `isRichEmpty` flattens documents and plain strings alike, so these work
  // for records saved before these fields became rich text editors.
  const hasImpact = !isRichEmpty(event.impact);
  const hasChiefGuest = !isRichEmpty(event.chiefGuest);
  const hasSponsorNames = !isRichEmpty(event.sponsors);
  const hasSponsors = hasSponsorNames || event.sponsorLogos.length > 0;

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

            <RichText
              value={event.description || event.summary}
              className="text-gray-600 leading-relaxed text-lg"
            />
          </div>

          {/* Impact, chief guest and sponsors in two columns. Each block is
              omitted entirely when the admin left it blank. */}
          {(hasImpact || hasChiefGuest || hasSponsors) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {hasImpact && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-softblue text-brand-blue flex items-center justify-center text-2xl mb-5">
                    <i className="fa-solid fa-hand-holding-heart"></i>
                  </div>
                  <h2 className="font-heading text-2xl font-black text-gray-900 mb-2">
                    Impact / Beneficiaries
                  </h2>
                  <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>
                  <RichText
                    value={event.impact}
                    className="text-gray-600 leading-relaxed"
                  />
                </div>
              )}

              {hasChiefGuest && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center text-2xl mb-5">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <h2 className="font-heading text-2xl font-black text-gray-900 mb-2">
                    Chief Guest
                  </h2>
                  <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>
                  <RichText
                    value={event.chiefGuest}
                    className="text-gray-600 leading-relaxed"
                  />
                </div>
              )}

              {/* Spans both columns: the logo strip needs the width */}
              {hasSponsors && (
                <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-softblue text-brand-blue flex items-center justify-center text-2xl mb-5">
                    <i className="fa-solid fa-handshake-angle"></i>
                  </div>
                  <h2 className="font-heading text-2xl font-black text-gray-900 mb-2">
                    Sponsors &amp; CSR Partners
                  </h2>
                  <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>

                  {hasSponsorNames && (
                    <RichText
                      value={event.sponsors}
                      className="text-gray-600 leading-relaxed"
                    />
                  )}

                  {event.sponsorLogos.length > 0 && (
                    <div className="flex flex-wrap items-center gap-8 mt-8">
                      {event.sponsorLogos.map((logo, index) => (
                        <div
                          key={logo}
                          className="relative h-16 w-36 grayscale hover:grayscale-0 transition duration-300"
                        >
                          <SmartImage
                            src={logo}
                            alt={`Sponsor ${index + 1}`}
                            fill
                            sizes="144px"
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
