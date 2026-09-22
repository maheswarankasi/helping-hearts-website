import { impactCards } from '@/lib/siteContent';

const toneStyles = {
  blue: 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
  red: 'bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white',
};

export default function ImpactCards() {
  return (
    <section className="pb-20 relative z-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative -mt-10 lg:-mt-20">
          {impactCards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 hover:-translate-y-3 transition-transform duration-300 border border-gray-100 group"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-300 ${
                  toneStyles[card.tone]
                }`}
              >
                <i className={card.icon}></i>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
