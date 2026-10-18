import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SmartImage from '@/components/SmartImage';
import VolunteerCTA from '@/components/VolunteerCTA';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ScrollStagger, ScrollStaggerItem } from '@/components/animations/ScrollStagger';
import ProgrammeCategoryTabs from '@/components/ProgrammeCategoryTabs';
import {
  homelessWelfareProgram,
  needyWelfareProgram,
  programsOverview,
} from '@/lib/siteContent';
import { getShelters } from '@/lib/shelters';

export const metadata = {
  title: 'Our Programs & Shelter Models | Helping Hearts NGO',
  description:
    'From street rescue to long-term residential care, mid-term psychiatric rehabilitation, and livelihood skills, see how Helping Hearts supports homeless and needy individuals.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Mapping focus area keys to their corresponding category routes
const FOCUS_AREA_CATEGORY_MAP = {
  'emergency-care': {
    href: '/programs/emergency-care',
    btnLabel: 'Learn more',
    hoverLabel: 'View Emergency Care & Facilities',
  },
  'medium-term-rehabilitation': {
    href: '/programs/mid-term',
    btnLabel: 'Learn more',
    hoverLabel: 'View Mid-Term Shelters & Facilities',
  },
  'long-term-care': {
    href: '/programs/long-term',
    btnLabel: 'Learn more',
    hoverLabel: 'View Long-Term Shelters & Facilities',
  },
  'livelihood-development': {
    href: '/programs/livelihood',
    btnLabel: 'Learn more',
    hoverLabel: 'View Livelihood Shelters & Facilities',
  },
};

export default async function ProgramsPage() {
  const { rescueBreakdown, focusAreas } = homelessWelfareProgram;
  const allShelters = await getShelters();

  const shelterCounts = {
    'long-term': allShelters.filter((s) => s.category === 'long-term').length,
    'mid-term': allShelters.filter((s) => s.category === 'mid-term').length,
    livelihood: allShelters.filter((s) => s.category === 'livelihood').length,
  };

  return (
    <>
      <PageHeader
        eyebrow={programsOverview.eyebrow}
        title={programsOverview.title}
        description={programsOverview.description}
        breadcrumb="Our Programs"
      />

      {/* Welfare of Homeless People */}
      <section className="py-16 lg:py-24 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal variant="fade-up" className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>{' '}
              Homeless Welfare Programme
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {homelessWelfareProgram.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {homelessWelfareProgram.description}
            </p>
          </ScrollReveal>

          {/* 3 Shelter Categories Quick Switcher Tabs */}
          <ScrollReveal variant="fade-up" className="mb-14">
            <div className="text-center mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Our 3 Shelter Categories — Click to view facilities & impact
              </p>
            </div>
            <ProgrammeCategoryTabs shelterCounts={shelterCounts} />
          </ScrollReveal>

          {/* Rescue breakdown */}
          <ScrollReveal variant="zoom-in" duration={0.65} className="mb-16">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="shrink-0 text-center md:text-left md:border-r md:border-gray-100 md:pr-10">
                  <p className="font-heading font-black text-5xl text-brand-blue leading-none">
                    {rescueBreakdown.total}
                  </p>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">
                    Rescued From Streets
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[...rescueBreakdown.byGender, ...rescueBreakdown.byCategory].map(
                    (item) => (
                      <div key={item.label} className="text-center sm:text-left">
                        <p className="font-heading font-black text-2xl text-gray-900">
                          {item.value}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">
                          {item.label}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-6">{rescueBreakdown.detail}</p>
            </div>
          </ScrollReveal>

          {/* Four focus areas - with interactive links to respective category pages */}
          <div className="space-y-16">
            {focusAreas.map((area, index) => {
              const isEven = index % 2 === 0;
              const categoryMatch = FOCUS_AREA_CATEGORY_MAP[area.key];
              const categoryUrl = categoryMatch?.href || (categoryMatch?.slug ? `/programs/${categoryMatch.slug}` : null);
              const hoverLabel = categoryMatch?.hoverLabel || 'Click to View Details';

              return (
                <div
                  key={area.key}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-10 lg:gap-14 bg-white/70 backdrop-blur-xs p-6 md:p-10 rounded-[2.5rem] border border-gray-100/80 shadow-xs hover:shadow-lg transition-all duration-300`}
                >
                  <ScrollReveal
                    variant={isEven ? 'fade-right' : 'fade-left'}
                    duration={0.65}
                    className="w-full lg:w-5/12 relative"
                  >
                    {categoryUrl ? (
                      <Link
                        href={categoryUrl}
                        aria-label={`Open ${area.title}`}
                        className="group block relative h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white cursor-pointer"
                      >
                        <SmartImage
                          src={area.image}
                          alt={area.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-brand-blue font-bold text-xs uppercase px-4 py-2 rounded-full shadow-lg">
                            {hoverLabel}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                        <SmartImage
                          src={area.image}
                          alt={area.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="absolute -top-4 -left-2 w-14 h-14 rounded-2xl bg-brand-blue text-white font-heading font-black text-xl flex items-center justify-center shadow-lg">
                      {area.step}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal
                    variant={isEven ? 'fade-left' : 'fade-right'}
                    duration={0.65}
                    delay={0.1}
                    className="w-full lg:w-7/12"
                  >
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-brand-blue transition">
                      {categoryUrl ? (
                        <Link href={categoryUrl}>{area.title}</Link>
                      ) : (
                        area.title
                      )}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-5">
                      {area.description}
                    </p>

                    {area.services && (
                      <ul className="space-y-3 mb-6">
                        {area.services.map((service) => (
                          <li key={service.title} className="flex gap-3">
                            <i className="fa-solid fa-circle-check text-brand-red mt-1 shrink-0"></i>
                            <span className="text-gray-600">
                              <span className="font-semibold text-gray-800">
                                {service.title}:
                              </span>{' '}
                              {service.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {categoryMatch && categoryUrl && (
                      <div className="pt-2">
                        <Link
                          href={categoryUrl}
                          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white text-sm font-bold hover:bg-brand-red transition-all shadow-sm hover:shadow-md"
                        >
                          <span>{categoryMatch.btnLabel}</span>
                          <i className="fa-solid fa-arrow-right text-xs pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
                        </Link>
                      </div>
                    )}
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Welfare of Needy People */}
      <section className="py-16 lg:py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal variant="fade-up" className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-brand-red font-bold text-xs uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue"></span>{' '}
              Public Healthcare Access
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {needyWelfareProgram.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {needyWelfareProgram.description}
            </p>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {needyWelfareProgram.initiatives.map((initiative) => (
              <ScrollStaggerItem
                key={initiative.title}
                className="bg-brand-cream rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {initiative.image && (
                  <div className="relative h-48">
                    <SmartImage
                      src={initiative.image}
                      alt={initiative.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 grow">
                    {initiative.description}
                  </p>
                  {initiative.stat && (
                    <p className="text-sm font-bold text-brand-blue flex items-center gap-2">
                      <i className="fa-solid fa-chart-simple"></i>
                      {initiative.stat}
                    </p>
                  )}
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
