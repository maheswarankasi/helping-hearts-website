import PageHeader from '@/components/PageHeader';
import VolunteerCTA from '@/components/VolunteerCTA';
import { heroImages, impactCards } from '@/lib/siteContent';

export const metadata = {
  title: 'Our Story | Helping Hearts NGO',
  description:
    'How Helping Hearts grew from a single rented home in Coimbatore into a network of shelters for the elderly, specially-abled, and orphaned children.',
};

const stats = [
  { value: '20+', label: 'Active Shelters', icon: 'fa-solid fa-house-chimney-user' },
  { value: '1,200+', label: 'Lives Touched', icon: 'fa-solid fa-heart' },
  { value: '350+', label: 'Volunteers', icon: 'fa-solid fa-hands-holding-child' },
  { value: '12', label: 'Years of Service', icon: 'fa-solid fa-calendar-check' },
];

const milestones = [
  {
    year: '2014',
    title: 'One Rented Home',
    description:
      'A small group of friends pooled their savings to rent a house in Coimbatore and welcomed eight abandoned senior citizens.',
  },
  {
    year: '2017',
    title: "Children's Village Opens",
    description:
      'Our first dedicated home for orphaned children began, pairing a safe roof with admission into nearby schools.',
  },
  {
    year: '2020',
    title: 'Lockdown Kitchens',
    description:
      'During the pandemic our volunteers served over 90,000 hot meals to stranded workers and isolated elderly residents.',
  },
  {
    year: '2023',
    title: 'Disability Support Centre',
    description:
      'A purpose-built centre for rehabilitation, physiotherapy, and skill training for differently-abled adults.',
  },
  {
    year: 'Today',
    title: 'A Growing Family',
    description:
      'Twenty homes, a permanent medical team, and a community of donors and volunteers who make every day possible.',
  },
];

const values = [
  {
    icon: 'fa-solid fa-hand-holding-heart',
    title: 'Dignity First',
    description:
      'Everyone who walks through our doors is a family member, never a beneficiary. Their choices and privacy come first.',
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Full Transparency',
    description:
      'Every rupee donated is accounted for, and our shelters are open to visits from supporters at any time.',
  },
  {
    icon: 'fa-solid fa-seedling',
    title: 'Lasting Change',
    description:
      'We invest in education, therapy, and skills so that care today becomes independence tomorrow.',
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Since 2014"
        title="Our Story"
        description="What began as one rented house and eight residents is now a network of homes across Coimbatore — built entirely on small acts of kindness."
        breadcrumb="Our Story"
      />

      {/* Mission + image */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="h-[380px] md:h-[460px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroImages.primary}
                  alt="A volunteer with one of our residents"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-[2rem] shadow-xl border border-gray-100 px-8 py-6 text-center">
                <p className="font-heading font-black text-4xl text-brand-blue leading-none">
                  12
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">
                  Years of Care
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-red"></span> Our
                Mission
              </div>

              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Nobody should grow old, or grow up,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">
                  alone.
                </span>
              </h2>

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Helping Hearts started in 2014 when a handful of friends found
                  an elderly man sleeping outside a bus stand in Gandhipuram.
                  There was nowhere to take him. So they rented a house.
                </p>
                <p>
                  That house filled up within a month. Twelve years later we run
                  homes for abandoned senior citizens, orphaned children, and
                  differently-abled adults — each one staffed around the clock
                  and funded almost entirely by individual donors.
                </p>
                <p>
                  We have never turned away someone who had nowhere else to go,
                  and we do not intend to start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-softblue text-brand-blue flex items-center justify-center text-2xl mb-4">
                  <i className={stat.icon}></i>
                </div>
                <p className="font-heading font-black text-4xl text-gray-900 mb-1">
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

      {/* Timeline */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How We Grew
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A few of the moments that shaped who we are today.
            </p>
          </div>

          <ol className="relative border-l-2 border-dashed border-brand-blue/20 ml-4 md:ml-6 space-y-10">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative pl-8 md:pl-12">
                <span className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-brand-red border-4 border-brand-cream"></span>
                <span className="inline-block font-heading font-black text-brand-blue text-lg mb-2">
                  {milestone.year}
                </span>
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What We Stand For
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-brand-cream p-8 rounded-[2rem] border border-gray-100 hover:-translate-y-3 transition-transform duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                    index % 2 === 0
                      ? 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                      : 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                  }`}
                >
                  <i className={value.icon}></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we care for — reuses the home page pillars */}
      <section className="py-20 bg-brand-cream border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Who We Care For
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactCards.map((card) => (
              <div
                key={card.title}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-3 transition-transform duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                    card.tone === 'red'
                      ? 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                      : 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                  }`}
                >
                  <i className={card.icon}></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
