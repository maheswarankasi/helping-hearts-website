import Link from 'next/link';
import { FOUNDED_YEAR, siteInfo, yearsOfService } from '@/lib/siteContent';

/**
 * The organisation's motto, in its own words.
 */
export default function MottoSection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-red"></span> Our Motto
        </div>

        <i className="fa-solid fa-quote-left text-4xl text-brand-red/20 mb-6 block"></i>

        <p className="font-heading text-xl md:text-2xl text-gray-800 leading-relaxed mb-8">
          {siteInfo.motto}
        </p>

        <p className="font-heading text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red mb-10">
          {siteInfo.tagline}
        </p>

        <p className="text-gray-500 mb-8">
          Built by students, sustained by volunteers, and running since{' '}
          {FOUNDED_YEAR} — now in our {yearsOfService + 1}th year.
        </p>

        <Link
          href="/our-story"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-blue text-brand-blue font-bold font-heading hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:-translate-y-1"
        >
          Read Our Story <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
