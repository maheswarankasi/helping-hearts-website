import { siteInfo } from '@/lib/siteContent';

/**
 * Shared renderer for the Privacy Policy and Terms & Conditions pages.
 *
 * `sections` is an array of `{ heading, body }`, where `body` is an array of
 * strings (paragraphs) or `{ list: string[] }` blocks.
 */
export default function LegalDocument({ lastUpdated, intro, sections }) {
  return (
    <section className="py-16 lg:py-20 bg-brand-cream">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Jump links */}
          <nav
            aria-label="On this page"
            className="lg:w-64 lg:shrink-0 lg:sticky lg:top-40 lg:self-start bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6"
          >
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">
              On This Page
            </p>
            <ol className="space-y-2 text-sm">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${index + 1}`}
                    className="text-gray-600 hover:text-brand-red transition inline-flex gap-2"
                  >
                    <span className="text-brand-blue font-bold shrink-0">
                      {index + 1}.
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
            <p className="text-sm text-gray-500 font-medium mb-8 pb-8 border-b border-gray-100">
              <i className="fa-solid fa-calendar-check text-brand-red mr-2"></i>
              Last updated: {lastUpdated}
            </p>

            {intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-gray-600 text-lg leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}

            {sections.map((section, index) => (
              <div
                key={section.heading}
                id={`section-${index + 1}`}
                className="mt-12 scroll-mt-40"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  <span className="text-brand-red">{index + 1}.</span>{' '}
                  {section.heading}
                </h2>
                <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>

                {section.body.map((block, blockIndex) =>
                  typeof block === 'string' ? (
                    <p
                      key={blockIndex}
                      className="text-gray-600 leading-relaxed mb-4"
                    >
                      {block}
                    </p>
                  ) : (
                    <ul key={blockIndex} className="space-y-3 mb-5 mt-1">
                      {block.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-gray-600 leading-relaxed"
                        >
                          <i className="fa-solid fa-circle text-[6px] text-brand-red mt-2.5 shrink-0"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            ))}

            {/* Contact block closes both documents */}
            <div className="mt-14 bg-brand-softblue rounded-[2rem] p-8">
              <h3 className="font-heading text-xl font-bold text-brand-blue mb-4">
                Questions about this document?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot mt-1 text-brand-red"></i>
                  <span>
                    {siteInfo.address[0]} {siteInfo.address[1]}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-brand-red"></i>
                  <a
                    href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                    className="hover:text-brand-blue transition"
                  >
                    {siteInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-brand-red"></i>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="hover:text-brand-blue transition break-all"
                  >
                    {siteInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-clock text-brand-red"></i>
                  <span>{siteInfo.officeHours}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
