import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import VolunteerForm from '@/components/VolunteerForm';
import { siteInfo } from '@/lib/siteContent';

export const metadata = {
  title: 'Join Us | Helping Hearts NGO',
  description:
    'Volunteer with Helping Hearts in Coimbatore — spend time with our residents, teach our children, or lend your professional skills.',
};

const reasons = [
  {
    icon: 'fa-solid fa-people-group',
    title: 'Be Present',
    description:
      'An afternoon of conversation, a shared meal, or a game of carrom means more to our residents than almost anything else.',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Share a Skill',
    description:
      'Teach, tutor, cut hair, fix wiring, keep our books, run a health camp — whatever you are good at, we can use it.',
  },
  {
    icon: 'fa-solid fa-calendar-check',
    title: 'Give What You Can',
    description:
      'Some volunteers come weekly for years, others help at one event a year. Both matter, and neither is too small.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Fill in the form',
    description:
      'Tell us who you are, how you would like to help, and when you are free.',
  },
  {
    number: '02',
    title: 'We call you',
    description:
      'A coordinator gets in touch to understand your interests and answer your questions.',
  },
  {
    number: '03',
    title: 'Visit and induct',
    description:
      'Come and see a home, meet the staff, and go through our code of conduct and safeguarding practices.',
  },
  {
    number: '04',
    title: 'Start volunteering',
    description:
      'We match you to a home and a schedule that works for both sides.',
  },
];

export default function JoinUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Become a Volunteer"
        title="Join Us"
        description="Our homes run on the time and goodwill of ordinary people. Whatever you can offer — an hour a month or a skill we badly need — there is a place for you here."
        breadcrumb="Join Us"
      />

      {/* Why volunteer */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-3 transition-transform duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                    index % 2 === 0
                      ? 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                      : 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                  }`}
                >
                  <i className={reason.icon}></i>
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We keep the process simple, but we do take safeguarding
              seriously — our residents depend on it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <span className="font-heading font-black text-5xl text-brand-softblue block mb-3">
                  {step.number}
                </span>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up form */}
      <section id="volunteer-form" className="py-16 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Volunteer Sign-Up
              </h2>
              <div className="w-16 h-2 bg-brand-red rounded-full mb-4"></div>
              <p className="text-gray-500 mb-10">
                Fill this in and a coordinator will contact you. There is no
                obligation, and you can change your mind at any point.
              </p>

              <VolunteerForm />
            </div>

            <aside className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-brand-blue to-[#07205c] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-6 w-28 h-28 bg-brand-red opacity-20 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-black mb-4">
                    Good to know
                  </h3>
                  <ul className="space-y-4 text-blue-100 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-brand-red mt-1"></i>
                      Volunteering with us is unpaid and entirely voluntary.
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-brand-red mt-1"></i>
                      You must be 18 or older to volunteer on our premises.
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-brand-red mt-1"></i>
                      Photographing or filming residents needs our written
                      permission, every time.
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-brand-red mt-1"></i>
                      Your details are used only to coordinate volunteering.
                      See our{' '}
                      <Link
                        href="/privacy-policy"
                        className="underline hover:text-white"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Rather talk first?
                </h3>
                <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Call us during office hours and ask anything — there is no
                  form to fill in before you do.
                </p>
                <a
                  href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 bg-brand-cream rounded-2xl px-5 py-4 hover:bg-brand-softblue transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <span className="font-bold text-gray-800">
                    {siteInfo.phone}
                  </span>
                </a>
                <p className="text-xs text-gray-500 mt-4">
                  <i className="fa-solid fa-clock text-brand-red mr-2"></i>
                  {siteInfo.officeHours}
                </p>
              </div>

              <div className="bg-red-50 rounded-[2.5rem] border border-red-100 p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  Prefer to give instead?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  If time is tight, a donation goes just as far. It pays for
                  food, medicines, and school fees.
                </p>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-3 bg-brand-red text-white font-heading font-bold px-7 py-3.5 rounded-full hover:bg-red-800 transition-colors shadow-lg shadow-brand-red/25"
                >
                  Donate Us{' '}
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
