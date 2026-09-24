import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import VolunteerCTA from '@/components/VolunteerCTA';
import ImpactStats from '@/components/ImpactStats';
import SmartImage from '@/components/SmartImage';
import {
  FOUNDED_YEAR,
  heroImages,
  impactCards,
  leadership,
  siteInfo,
  yearsOfService,
} from '@/lib/siteContent';

export const metadata = {
  title: 'Our Story | Helping Hearts NGO',
  description:
    'Helping Hearts began in 2009 as a group of engineering students in Coimbatore who wanted life to be about more than academics. Seventeen years on, it is still powered by young volunteers.',
};

const values = [
  {
    icon: 'fa-solid fa-hand-holding-heart',
    title: 'Any Social Cause',
    description:
      'We are not tied to one narrow programme. If a cause will make a real difference to many lives, we extend our support to it.',
  },
  {
    icon: 'fa-solid fa-face-smile',
    title: 'Love and Affection First',
    description:
      'Our aim is to shower love and affection on the hopeless, the helpless and the gifted people around us — and to see a great smile on their faces.',
  },
  {
    icon: 'fa-solid fa-users-rays',
    title: 'Powered by Youth',
    description:
      'Our greatest strength is the consistent support and untiring efforts of young volunteers, exactly as it was on day one.',
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Since ${FOUNDED_YEAR}`}
        title="Our Story"
        description="A group of engineering students decided life was about more than academics. Seventeen years later, Helping Hearts is still run on the energy of young volunteers."
        breadcrumb="Our Story"
      />

      {/* How it began */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative h-[380px] md:h-[460px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <SmartImage
                  src={heroImages.primary}
                  alt="Helping Hearts volunteers with a resident"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-[2rem] shadow-xl border border-gray-100 px-8 py-6 text-center">
                <p className="font-heading font-black text-4xl text-brand-blue leading-none">
                  {yearsOfService}
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">
                  Years of Service
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-softblue text-brand-blue font-bold text-xs uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-red"></span> How
                It Began
              </div>

              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Techies who{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">
                  transcended boundaries.
                </span>
              </h2>

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Our team Helping Hearts emerged in the year {FOUNDED_YEAR} by
                  a cluster of passionate college students, and it has now
                  stepped into its {yearsOfService + 1}th successful year.
                </p>
                <p>
                  Energetic engineering pupils in full swing got together to
                  work for the cause of society. It&apos;s a story of how the
                  techies have transcended boundaries to help the poor and the
                  needy. Life was much more than academics for us.
                </p>
                <p>
                  We gradually roped in like-minded students from many colleges
                  and actively supported the welfare of our society. Thus was
                  born the Helping Hearts Organization. Our team&apos;s greatest
                  strength is the consistent support and untiring efforts of the
                  youth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto, in the organisation's own words */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-[#07205c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-brand-red opacity-20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-red"></span> Our
            Motto
          </div>

          <p className="text-blue-50 text-lg md:text-xl leading-relaxed mb-10 font-light">
            {siteInfo.motto}
          </p>

          <p className="font-heading text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-brand-red">
            {siteInfo.tagline}
          </p>
        </div>
      </section>

      <ImpactStats
        title="What We Have Achieved"
        subtitle="Figures from across our rescue, shelter and healthcare programmes."
        className="py-16 lg:py-20 bg-brand-cream"
      />

      {/* Detailed impact breakdown */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              The Work Itself
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          </div>

          <div className="space-y-6">
            {impactCards.map((card, index) => (
              <div
                key={card.title}
                className="flex flex-col sm:flex-row gap-6 bg-brand-cream rounded-[2rem] border border-gray-100 p-8 group hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                    index % 2 === 0
                      ? 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                      : 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                  }`}
                >
                  <i className={card.icon}></i>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who runs it */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Who Runs Helping Hearts
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Registered as trust number {siteInfo.registrationNumber}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[leadership.founder, ...leadership.trustees].map((person, index) => (
              <div
                key={person.name}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-5 ${
                    index === 0
                      ? 'bg-brand-red text-white'
                      : 'bg-brand-softblue text-brand-blue'
                  }`}
                >
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">
                  {person.name}
                </h3>
                <p className="text-xs text-brand-red font-bold uppercase tracking-widest">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
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

          <div className="mt-14 text-center">
            <Link
              href="/join-us"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-brand-red text-brand-red font-bold font-heading hover:bg-brand-red hover:text-white transition-all shadow-sm hover:-translate-y-1"
            >
              Become a Volunteer <i className="fa-solid fa-heart"></i>
            </Link>
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
