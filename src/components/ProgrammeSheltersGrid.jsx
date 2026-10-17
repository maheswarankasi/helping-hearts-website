import Link from 'next/link';
import EmptyState from './EmptyState';
import SmartImage from './SmartImage';
import { ScrollStagger, ScrollStaggerItem } from './animations/ScrollStagger';
import { getCategoryBadgeStyle } from '@/lib/shelterCategories';

/**
 * Renders the filtered grid of shelters operating under a specific programme category,
 * located directly beneath the "Operating Facilities & Model Centres" heading.
 *
 * @param {object} props
 * @param {import('@/lib/types').Shelter[]} props.shelters
 * @param {string} [props.categoryTitle]
 * @param {string} props.categoryId
 */
export default function ProgrammeSheltersGrid({ shelters = [], categoryTitle, categoryId }) {
  const badgeStyle = getCategoryBadgeStyle(categoryId);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            <span className={`w-2 h-2 rounded-full ${badgeStyle.dot}`}></span>
            Active Facilities
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-gray-900">
            Operating Facilities & Model Centres
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-600 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            {shelters.length} {shelters.length === 1 ? 'Shelter Operating' : 'Shelters Operating'}
          </span>
          <Link
            href="/shelters"
            className="text-sm font-bold text-brand-blue hover:text-brand-red transition flex items-center gap-1.5"
          >
            All Shelters <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>

      {/* Grid or Empty State */}
      {shelters.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8">
          <EmptyState
            icon="fa-solid fa-house-chimney-medical"
            title="No shelters currently listed under this category"
            message={`Our team is continually expanding our network of care facilities. Check back soon or browse all existing shelters across Coimbatore.`}
            actionLabel="View All Shelters"
            actionHref="/shelters"
          />
        </div>
      ) : (
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shelters.map((shelter) => {
            const detailHref = `/shelters/${shelter.id}`;

            return (
              <ScrollStaggerItem
                key={shelter.id}
                className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Photo Thumbnail */}
                <Link
                  href={detailHref}
                  className="relative h-56 w-full block overflow-hidden bg-gray-100"
                  aria-label={`View ${shelter.name}`}
                >
                  {shelter.image ? (
                    <SmartImage
                      src={shelter.image}
                      alt={shelter.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                      <i className="fa-solid fa-image text-3xl mb-2"></i>
                      <span className="text-xs font-semibold">No Photo Available</span>
                    </div>
                  )}

                  {/* Photo count indicator */}
                  {shelter.images?.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-semibold backdrop-blur-xs flex items-center gap-1.5">
                      <i className="fa-solid fa-camera"></i>
                      {shelter.images.length}
                    </div>
                  )}
                </Link>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-brand-blue transition">
                        <Link href={detailHref}>{shelter.name}</Link>
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      {shelter.address && (
                        <p className="flex items-start gap-2.5">
                          <i className="fa-solid fa-location-dot text-brand-red mt-1 shrink-0"></i>
                          <span className="line-clamp-2">{shelter.address}</span>
                        </p>
                      )}

                      {shelter.capacity && (
                        <p className="flex items-center gap-2.5 text-xs font-semibold text-gray-700">
                          <i className={`${shelter.capacityIcon || 'fa-solid fa-users'} text-brand-blue`}></i>
                          <span>Capacity: {shelter.capacity}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Link: "Learn more ->" button as single primary action */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={detailHref}
                      className={`inline-flex items-center gap-1.5 text-sm font-bold font-heading transition-colors duration-200 group-hover:translate-x-1 ${
                        categoryId === 'mid-term'
                          ? 'text-brand-red hover:text-brand-blue'
                          : categoryId === 'livelihood'
                          ? 'text-emerald-700 hover:text-emerald-800'
                          : 'text-brand-blue hover:text-brand-red'
                      }`}
                    >
                      Learn more -&gt;
                    </Link>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      )}
    </div>
  );
}
