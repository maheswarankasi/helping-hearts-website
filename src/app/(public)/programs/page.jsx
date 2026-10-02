import PageHeader from '@/components/PageHeader';
import SmartImage from '@/components/SmartImage';
import VolunteerCTA from '@/components/VolunteerCTA';
import {
  homelessWelfareProgram,
  needyWelfareProgram,
  programsOverview,
} from '@/lib/siteContent';

export const metadata = {
  title: 'Our Programs | Helping Hearts NGO',
  description:
    'From street rescue to long-term care and livelihood training, see how Helping Hearts supports homeless and needy individuals across Coimbatore District.',
};

export default function ProgramsPage() {
  const { rescueBreakdown, focusAreas } = homelessWelfareProgram;

  return (
    <>
      <PageHeader
        eyebrow={programsOverview.eyebrow}
        title={programsOverview.title}
        description={programsOverview.description}
        breadcrumb="Our Programs"
      />

      {/* Welfare of Homeless People */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
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
          </div>

          {/* Rescue breakdown */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 md:p-10 mb-16">
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

          {/* Four focus areas */}
          <div className="space-y-12">
            {focusAreas.map((area, index) => (
              <div
                key={area.key}
                className={`flex flex-col ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 lg:gap-14`}
              >
                <div className="w-full lg:w-5/12 relative">
                  <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                    <SmartImage
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-5 -left-2 w-16 h-16 rounded-2xl bg-brand-blue text-white font-heading font-black text-xl flex items-center justify-center shadow-lg">
                    {area.step}
                  </div>
                </div>

                <div className="w-full lg:w-7/12">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {area.description}
                  </p>

                  {area.services && (
                    <ul className="space-y-3">
                      {area.services.map((service) => (
                        <li key={service.title} className="flex gap-3">
                          <i className="fa-solid fa-circle-check text-brand-red mt-1"></i>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welfare of Needy People */}
      <section className="py-16 lg:py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {needyWelfareProgram.initiatives.map((initiative) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
