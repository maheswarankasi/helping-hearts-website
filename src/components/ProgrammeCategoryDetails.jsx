import SmartImage from './SmartImage';
import ScrollReveal from './animations/ScrollReveal';

/**
 * Renders detailed strategic and impact information for a single shelter programme category,
 * fully matching the verified text, operational facilities, and statistics from the PDF.
 *
 * @param {object} props
 * @param {import('@/lib/types').ProgrammeCategory} props.category
 */
export default function ProgrammeCategoryDetails({ category }) {
  const toneBg =
    category.tone === 'red'
      ? 'bg-red-50 text-brand-red border-red-200'
      : category.tone === 'emerald'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-brand-softblue text-brand-blue border-blue-200';

  const accentColor =
    category.tone === 'red'
      ? 'text-brand-red'
      : category.tone === 'emerald'
      ? 'text-emerald-600'
      : 'text-brand-blue';

  return (
    <div className="space-y-12 mb-16">
      {/* Category Overview Card */}
      <ScrollReveal variant="fade-up" className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-4 ${toneBg}`}>
              <i className={category.icon}></i>
              {category.badge}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight">
              {category.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-6">
              {category.tagline}
            </p>

            <p className="text-gray-600 leading-relaxed text-base">
              {category.overview}
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-72 md:h-84 w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <SmartImage
                src={category.image}
                alt={category.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Facilities & Operating Models from PDF */}
      {category.facilities && category.facilities.length > 0 && (
        <div className="space-y-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${toneBg}`}>
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-gray-900">
                Operating Facilities & Model Centres
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Verified operational care units and centres functioning across Coimbatore and Tamil Nadu.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.facilities.map((facility, idx) => (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 0.1}
                className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 flex items-start gap-2.5">
                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${accentColor === 'text-brand-red' ? 'bg-brand-red' : accentColor === 'text-emerald-600' ? 'bg-emerald-600' : 'bg-brand-blue'}`}></span>
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {facility.description}
                  </p>
                </div>

                {facility.locations && facility.locations.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                      Centres Located In:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {facility.locations.map((loc, lIdx) => (
                        <span
                          key={lIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200"
                        >
                          <i className="fa-solid fa-location-dot text-brand-red text-[10px]"></i>
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Objectives and Who It Supports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Objectives */}
        <ScrollReveal variant="fade-right" className="lg:col-span-7 bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${toneBg}`}>
              <i className="fa-solid fa-bullseye text-lg"></i>
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Programme Objectives
            </h2>
          </div>

          <ul className="space-y-4">
            {category.objectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${toneBg}`}>
                  <i className="fa-solid fa-check text-xs"></i>
                </div>
                <span className="text-gray-700 leading-relaxed font-medium">
                  {objective}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Who It Supports */}
        <ScrollReveal variant="fade-left" className="lg:col-span-5 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${toneBg}`}>
                <i className="fa-solid fa-users text-lg"></i>
              </div>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Who It Supports
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {category.whoItSupports}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-100/70 border border-gray-200/60 text-xs text-gray-600 flex items-center gap-2.5">
            <i className="fa-solid fa-heart-pulse text-brand-red text-base shrink-0"></i>
            <span>
              All admissions undergo physical medical screening and compassionate social casework.
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Impact Metrics & Report Summary from PDF */}
      {category.impactMetrics && category.impactMetrics.length > 0 && (
        <ScrollReveal variant="fade-up">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-sm space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Reporting Period Impact & Statistics
              </h3>
              {category.reportingSummary && (
                <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
                  “{category.reportingSummary}”
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
              {category.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="text-center p-4 rounded-xl bg-gray-50/70 border border-gray-100"
                >
                  <p className={`font-heading font-black text-3xl md:text-4xl ${accentColor} mb-1`}>
                    {metric.value}
                  </p>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    {metric.label}
                  </p>
                  {metric.subtext && (
                    <p className="text-[11px] text-gray-500 mt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
