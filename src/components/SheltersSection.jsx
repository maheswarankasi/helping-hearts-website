import Link from 'next/link';

const toneStyles = {
  blue: {
    overlay: 'from-brand-blue/90 via-brand-blue/40',
    galleryText: 'text-brand-blue',
    tagText: 'text-brand-blue',
    locationText: 'text-brand-red',
    locationBg: 'bg-red-100',
    capacityIcon: 'text-brand-blue',
    arrow: 'bg-brand-blue hover:bg-brand-red',
  },
  red: {
    overlay: 'from-brand-red/90 via-brand-red/40',
    galleryText: 'text-brand-red',
    tagText: 'text-brand-red',
    locationText: 'text-brand-blue',
    locationBg: 'bg-blue-100',
    capacityIcon: 'text-brand-red',
    arrow: 'bg-brand-red hover:bg-brand-blue',
  },
};

export default function SheltersSection({
  shelters,
  title = 'Our Care Shelters',
  subtitle = "Explore the homes we've built with love. Each shelter is equipped with dedicated staff and necessary facilities.",
  showViewAll = true,
  className = 'py-20 bg-brand-cream',
}) {
  return (
    <section id="shelters" className={className}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {shelters.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No shelters published yet. Please check back soon.
          </p>
        ) : (
          <div className="space-y-12">
            {shelters.map((shelter, index) => {
              const tone = toneStyles[shelter.tone] ?? (index % 2 === 0 ? toneStyles.blue : toneStyles.red);
              const detailHref = shelter.mapUrl || '/shelters';
              const isExternal = Boolean(shelter.mapUrl);

              return (
                <div
                  key={shelter.id}
                  className="group relative flex flex-col md:flex-row items-center gap-8 bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="w-full md:w-1/2 h-72 md:h-[350px] overflow-hidden rounded-[2rem] relative">
                    {shelter.image ? (
                      <img
                        src={shelter.image}
                        alt={shelter.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-softblue flex items-center justify-center text-brand-blue text-4xl">
                        <i className="fa-solid fa-house-chimney-user"></i>
                      </div>
                    )}

                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${tone.overlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8`}
                    >
                      <Link
                        href={detailHref}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className={`bg-white ${tone.galleryText} font-bold px-6 py-2 rounded-full w-max flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}
                      >
                        View Gallery <i className="fa-solid fa-images"></i>
                      </Link>
                    </div>

                    {shelter.tag && (
                      <div
                        className={`absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tone.tagText}`}
                      >
                        {shelter.tag}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 p-4 md:p-8 relative">
                    {shelter.location && (
                      <div
                        className={`inline-flex items-center gap-2 ${tone.locationText} font-semibold text-sm mb-4`}
                      >
                        <i
                          className={`fa-solid fa-location-dot ${tone.locationBg} w-8 h-8 rounded-full flex items-center justify-center`}
                        ></i>
                        {shelter.location}
                      </div>
                    )}

                    <h3 className="font-heading text-3xl font-extrabold text-gray-900 mb-4">
                      {shelter.name}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {shelter.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <div className="flex items-center gap-4">
                        <div className={`${tone.capacityIcon} text-3xl`}>
                          <i
                            className={shelter.capacityIcon || 'fa-solid fa-users-rays'}
                          ></i>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                            Capacity
                          </p>
                          <p className="font-heading text-xl font-bold text-gray-900">
                            {shelter.capacityLabel || 'Contact us'}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={detailHref}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        aria-label={`More about ${shelter.name}`}
                        className={`w-12 h-12 rounded-full ${tone.arrow} text-white flex items-center justify-center transition-colors hover:scale-110 shadow-lg`}
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showViewAll && (
          <div className="mt-16 text-center">
            <Link
              href="/shelters"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-red text-brand-red font-bold font-heading hover:bg-brand-red hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              Explore All Shelters <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
