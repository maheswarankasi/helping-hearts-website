import { impactStats } from '@/lib/siteContent';

/**
 * Headline figures band. Numbers come from siteContent.impactStats so that
 * every page quotes the same, organisation-supplied values.
 */
export default function ImpactStats({
  title = 'Our Impact So Far',
  subtitle = 'Every number here is a person our volunteers reached.',
  className = 'py-16 lg:py-20 bg-white border-y border-gray-100',
}) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                  index % 2 === 0
                    ? 'bg-brand-softblue text-brand-blue'
                    : 'bg-red-50 text-brand-red'
                }`}
              >
                <i className={stat.icon}></i>
              </div>
              <p className="font-heading font-black text-3xl md:text-4xl text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
