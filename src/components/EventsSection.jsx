"use client";

import { useState } from 'react';
import Link from 'next/link';
import EmptyState from './EmptyState';
import SmartImage from './SmartImage';
import ScrollReveal from './animations/ScrollReveal';
import { ScrollStagger, ScrollStaggerItem } from './animations/ScrollStagger';
import InfiniteScrollTrigger from './animations/InfiniteScrollTrigger';
import { toPlainText } from '@/lib/richText';

export default function EventsSection({
  events = [],
  title = 'Recent Events',
  subtitle = "Glimpses of the smiles we've shared and the milestones we've achieved together with our community.",
  showViewAll = true,
  className = 'py-20 bg-white border-t border-gray-100',
  initialCount = 6,
  batchSize = 6,
}) {
  // If showViewAll is true (homepage preview), limit to initialCount (e.g. 3 or 6).
  // If showViewAll is false (full /events page), progressively load more items as user scrolls!
  const [visibleCount, setVisibleCount] = useState(
    showViewAll ? Math.min(events.length, initialCount) : Math.min(events.length, initialCount)
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = !showViewAll && visibleCount < events.length;

  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    // Simulate brief smooth batch intake for on-scroll feel
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(events.length, prev + batchSize));
      setIsLoadingMore(false);
    }, 350);
  };

  const displayedEvents = events.slice(0, visibleCount);

  return (
    <section id="events" className={className}>
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollReveal variant="fade-up" className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </ScrollReveal>

        {events.length === 0 ? (
          <EmptyState
            icon="fa-solid fa-calendar-days"
            title="No events published yet"
            message="Events added from the admin panel will appear here with their photos."
          />
        ) : (
          <>
            <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.map((event) => (
                <ScrollStaggerItem key={event.id} className="flex">
                  <Link
                    href={`/events/${event.id}`}
                    className="w-full bg-brand-cream rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col group"
                  >
                    <div className="relative h-60 overflow-hidden">
                      {event.image ? (
                        <SmartImage
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-softblue flex items-center justify-center text-brand-blue text-4xl">
                          <i className="fa-solid fa-calendar-days"></i>
                        </div>
                      )}

                      {event.day && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-brand-blue font-bold px-3 py-2 rounded-xl text-center leading-tight shadow-md">
                          <span className="block text-2xl font-black">
                            {event.day}
                          </span>
                          <span className="block text-xs uppercase">
                            {event.month}
                          </span>
                        </div>
                      )}

                      {event.images && event.images.length > 1 && (
                        <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                          <i className="fa-solid fa-images"></i>{' '}
                          {event.images.length} Photos
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col grow">
                      <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                        {event.summaryText || toPlainText(event.summary)}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 text-brand-blue font-bold group-hover:text-brand-red transition w-max">
                        <span>View Details</span>
                        <i className="fa-solid fa-arrow-right pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
                      </span>
                    </div>
                  </Link>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>

            {/* Scroll-triggered loader for full page view */}
            {!showViewAll && (
              <InfiniteScrollTrigger
                hasMore={hasMore}
                loading={isLoadingMore}
                onLoadMore={handleLoadMore}
                loadingText="Loading more events as you scroll..."
              />
            )}
          </>
        )}

        {showViewAll && events.length > 0 && (
          <ScrollReveal variant="fade-up" delay={0.2} className="mt-12 text-center">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-blue text-brand-blue font-bold font-heading hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              <span>View All Events</span>
              <i className="fa-solid fa-arrow-right pt-[2px] transition-transform group-hover:translate-x-1 shrink-0"></i>
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
