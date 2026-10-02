import Link from 'next/link';
import { homelessWelfareProgram, needyWelfareProgram } from '@/lib/siteContent';

const teaserCards = [
  {
    ...homelessWelfareProgram,
    icon: 'fa-solid fa-house-chimney-user',
    tone: 'blue',
  },
  {
    ...needyWelfareProgram,
    icon: 'fa-solid fa-briefcase-medical',
    tone: 'red',
  },
];

/** Homepage teaser for the two programmes detailed on /programs. */
export default function ProgramsTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red"></span> Our
            Programs
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 mb-4">
            How We Help
          </h2>
          <div className="w-16 h-2 bg-brand-red mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teaserCards.map((card) => (
            <div
              key={card.title}
              className="bg-brand-cream rounded-[2rem] border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                  card.tone === 'blue'
                    ? 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                    : 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                }`}
              >
                <i className={card.icon}></i>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {card.description}
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-red transition"
              >
                Learn More <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
