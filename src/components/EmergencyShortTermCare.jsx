import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SmartImage from '@/components/SmartImage';
import VolunteerCTA from '@/components/VolunteerCTA';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { ScrollStagger, ScrollStaggerItem } from '@/components/animations/ScrollStagger';
import { emergencyCareProgramme } from '@/lib/emergencyCareData';

/**
 * Dedicated, responsive component for the "Emergency Care & Short-Term Care" programme.
 * Features exact copy and statistics from the Helping Hearts Programme Report & PDF:
 * - 24/7 Crisis Rescue & Intake Helpline
 * - Core Services: Rescue Services, Medical Care, and Support Services
 * - Operating Facilities & Model Centres: Government Hospital Campus ECRCs
 * - Verified Impact Metrics & Demographic Breakdown (265 Rescues, 145 Beds)
 * - Continuum of Care Transition CTA
 */
export default function EmergencyShortTermCare() {
  const {
    title,
    tagline,
    overview,
    concludingNote,
    image,
    imageAlt,
    helpline,
    services,
    facilities,
    impactMetrics,
    demographicBreakdown,
  } = emergencyCareProgramme;

  return (
    <>
      <PageHeader
        eyebrow="Homeless Welfare Programme · Step 01"
        title={title}
        description={tagline}
        breadcrumb="Emergency Care & Short-Term Care"
      />

      <div className="bg-brand-cream min-h-screen py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          
          {/* Quick Back & Emergency Helpline Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-blue transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1 shrink-0"></i>
              <span>Back to Programmes Overview</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5">
                <i className="fa-solid fa-circle-exclamation"></i>
                {helpline.title}:
              </span>
              <a
                href={`tel:${helpline.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-red text-xs md:text-sm font-black hover:bg-brand-red hover:text-white transition-colors"
              >
                <i className="fa-solid fa-phone text-xs"></i>
                {helpline.phone}
              </a>
              <a
                href={`tel:${helpline.altPhone.replace(/\s+/g, '')}`}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-800 text-xs md:text-sm font-bold hover:bg-brand-blue hover:text-white transition-colors"
              >
                <i className="fa-solid fa-phone text-xs"></i>
                {helpline.altPhone}
              </a>
            </div>
          </div>

          {/* Core Overview & Hero Narrative */}
          <ScrollReveal variant="fade-up" className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-brand-red border border-red-200">
                  <i className="fa-solid fa-truck-medical"></i>
                  Frontline Crisis Intervention
                </div>

                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                  {title}
                </h1>

                <p className="text-lg md:text-xl text-gray-800 font-semibold leading-relaxed">
                  {tagline}
                </p>

                <p className="text-gray-600 leading-relaxed text-base">
                  {overview}
                </p>

                <div className="p-4 rounded-xl bg-brand-softblue/60 border border-blue-100 text-sm text-brand-blue font-medium flex items-start gap-3">
                  <i className="fa-solid fa-circle-info text-base mt-0.5 shrink-0"></i>
                  <span>{concludingNote}</span>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative h-72 md:h-96 w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-gray-100">
                  <SmartImage
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-200">
                      Rapid Response Vehicle
                    </p>
                    <p className="text-sm font-medium">
                      Equipped for acute street rescues across Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Key Objectives / Services Grid (Matching PDF verbatim) */}
          <section className="space-y-8">
            <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-3">
                <i className="fa-solid fa-shield-heart"></i>
                Core Services & Objectives
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                Three Pillars of Emergency Intervention
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                Extract from official programme documentation detailing the immediate rescue, medical care, and casework pipeline.
              </p>
            </ScrollReveal>

            <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ScrollStaggerItem key={service.id} className="h-full">
                  <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                            service.tone === 'red'
                              ? 'bg-red-50 text-brand-red'
                              : service.tone === 'blue'
                              ? 'bg-blue-50 text-brand-blue'
                              : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          <i className={service.icon}></i>
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                          {service.stepNumber}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>

                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                        {service.tagline}
                      </p>

                      <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">
                        {service.description}
                      </p>

                      <div className="border-t border-gray-100 pt-4 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Key Operational Capabilities:
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                              <i className="fa-solid fa-check text-brand-red mt-0.5 shrink-0"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400">
                      <span>Tamil Nadu Network</span>
                      <span className="text-brand-blue flex items-center gap-1">
                        Active 24/7 <i className="fa-solid fa-clock text-[10px]"></i>
                      </span>
                    </div>
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </section>

          {/* Operating Facilities & Model Centres (Hospital Campus ECRCs) */}
          <section className="space-y-8">
            <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-3">
                <i className="fa-solid fa-hospital"></i>
                Operating Facilities & Model Centres
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                Emergency Care & Recovery Centres (ECRCs)
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                Located within Government Hospital campuses across Tamil Nadu to provide immediate medical, psychiatric, and humanitarian relief.
              </p>
            </ScrollReveal>

            {facilities && facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {facilities.map((centre) => (
                  <div
                    key={centre.id}
                    className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                        {centre.district}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-softblue text-brand-blue">
                        {centre.capacity}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {centre.name}
                    </h3>

                    <p className="text-xs text-gray-500 font-semibold mb-3 flex items-start gap-1.5">
                      <i className="fa-solid fa-location-dot text-brand-red mt-0.5 shrink-0"></i>
                      <span>{centre.address}</span>
                    </p>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      {centre.description}
                    </p>

                    <div className="border-t border-gray-100 pt-5 space-y-2 mt-auto">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Facility Highlights:
                      </p>
                      <ul className="space-y-1.5">
                        {centre.keyFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-600">
                            <i className="fa-solid fa-circle-check text-brand-blue mt-0.5 shrink-0"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <i className="fa-solid fa-hospital text-4xl text-gray-300 mb-3"></i>
                <p className="text-gray-600 font-medium">
                  Operating facilities information is currently being synchronized.
                </p>
              </div>
            )}
          </section>

          {/* Verified Impact Indicators & Demographics */}
          <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm space-y-10">
            <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-3">
                <i className="fa-solid fa-chart-line"></i>
                Demonstrated Impact
              </div>
              <h2 className="font-heading text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                Verified Emergency Care Indicators
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                Official figures documented in the Helping Hearts Programme Report across our street outreach and hospital intake.
              </p>
            </ScrollReveal>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="text-center p-6 rounded-2xl bg-gray-50/80 border border-gray-100"
                >
                  <p className="font-heading font-black text-3xl md:text-5xl text-brand-blue mb-1 tabular-nums">
                    {metric.value}
                  </p>
                  <p className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wide">
                    {metric.label}
                  </p>
                  {metric.subtext && (
                    <p className="text-xs text-gray-500 mt-1">{metric.subtext}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Demographic and Vulnerability Category Breakdown */}
            <div className="pt-8 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 bg-brand-softblue/40 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-heading text-lg font-bold text-brand-blue mb-2">
                  Street Rescues by Gender
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  Every individual identified on the streets undergoes immediate dignity protection without discrimination.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {demographicBreakdown.byGender.map((g) => (
                    <div
                      key={g.label}
                      className="bg-white rounded-xl p-4 text-center border border-blue-100 shadow-2xs"
                    >
                      <i className={`${g.icon} text-2xl text-brand-blue mb-1`}></i>
                      <p className="font-heading font-black text-2xl text-gray-900 tabular-nums">
                        {g.value}
                      </p>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {g.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                  Breakdown by Crisis Vulnerability Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {demographicBreakdown.byCondition.map((c) => (
                    <div
                      key={c.label}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-brand-red shrink-0 shadow-2xs">
                        <i className={c.icon}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-gray-900 text-sm">
                            {c.label}
                          </span>
                          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-red-100 text-brand-red tabular-nums">
                            {c.value}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Continuum of Care / Next Programme Navigation */}
          <section className="bg-gradient-to-r from-brand-blue to-blue-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-red-300">
                  Continuum of Care Pathway
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-black leading-snug">
                  What Happens After Emergency Stabilization?
                </h3>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                  Emergency care provides immediate life protection and medical relief. Stabilized residents transition seamlessly into Step 02: Medium Term Rehabilitation Pathway for structured psychiatric follow-up, or into long-term dignified residential care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <Link
                  href="/programs/mid-term"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-white hover:text-brand-blue transition-all shadow-md"
                >
                  <span>Explore Medium-Term Pathway</span>
                  <i className="fa-solid fa-arrow-right text-xs pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
                </Link>
                <Link
                  href="/programs"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition-colors"
                >
                  <i className="fa-solid fa-layer-group text-xs pt-[2px] shrink-0"></i>
                  <span>All Programmes</span>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>

      <VolunteerCTA />
    </>
  );
}
