import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DonateCTA from '@/components/DonateCTA';
import ImpactStats from '@/components/ImpactStats';
import { FOUNDED_YEAR, donationAllocations, siteInfo } from '@/lib/siteContent';

export const metadata = {
  title: 'Donate Us | Helping Hearts NGO',
  description:
    'Help us rescue homeless people from the streets, run our shelters, and take healthcare to families across Coimbatore. Donate directly by scanning our UPI QR code.',
};

const steps = [
  {
    number: '01',
    title: 'Share your details',
    description:
      'Click Donate Now and fill in your name, contact, and the amount. This lets us issue your receipt.',
  },
  {
    number: '02',
    title: 'Scan our QR code',
    description:
      'We show you our UPI QR code. Scan it with Google Pay, PhonePe, Paytm, or any UPI app and pay directly.',
  },
  {
    number: '03',
    title: 'Send us the reference',
    description:
      'Share the payment screenshot or UPI reference with our office so we can confirm it against our statement.',
  },
  {
    number: '04',
    title: 'Receive your receipt',
    description:
      'Once confirmed, we email your receipt and tell you where your gift went.',
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Every Rupee Counts"
        title="Donate Us"
        description="Love you give might help somebody live. Your gift pays for street rescues, the running of our shelters, and healthcare that reaches families who cannot afford it."
        breadcrumb="Donate Us"
      />

      {/* Primary CTA + how the money is used */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-14 text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Donating takes under a minute. Share a few details, scan our UPI
              QR code, and your gift goes straight into the work â€” no
              middlemen, no processing fees taken out.
            </p>
            <DonateCTA />
            <p className="text-sm text-gray-500 mt-6">
              <i className="fa-solid fa-shield-halved text-brand-blue mr-2"></i>
              No payment gateway, no card details â€” you pay directly from your
              own UPI app.
            </p>
          </div>

          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Where Your Money Goes
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We keep administration lean so that the overwhelming majority of
              every donation reaches our residents directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationAllocations.map((item, index) => (
              <div
                key={item.label}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex gap-6 group hover:-translate-y-2 transition-transform duration-300"
              >
                <div
                  className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-white ${
                    index % 2 === 0
                      ? 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue'
                      : 'bg-red-50 text-brand-red group-hover:bg-brand-red'
                  }`}
                >
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real, organisation-supplied impact figures */}
      <ImpactStats
        title="What Your Gift Has Already Done"
        subtitle="These are the figures behind the work your donation funds."
        className="py-16 lg:py-20 bg-white border-y border-gray-100"
      />

      {/* How donating works */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How Donating Works
            </h2>
            <div className="w-16 h-2 bg-brand-red mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="font-heading font-black text-5xl text-white block mb-3 drop-shadow-sm">
                  <span className="text-brand-softblue">{step.number}</span>
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

          {/* Safety notice */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
            <h3 className="font-heading text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Please donate safely
            </h3>
            <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>
            <ul className="space-y-4 text-gray-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-check text-brand-red mt-1 shrink-0"></i>
                We will <strong>never</strong> ask for your card number, CVV,
                UPI PIN, OTP, or net-banking password. Anyone who does is not
                us.
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-check text-brand-red mt-1 shrink-0"></i>
                Donate only through the QR code shown on this website, or
                through details confirmed directly by our office on{' '}
                <span className="font-semibold">{siteInfo.phone}</span>.
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-check text-brand-red mt-1 shrink-0"></i>
                We cannot take responsibility for money given to any individual
                or account we have not authorised.
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-circle-check text-brand-red mt-1 shrink-0"></i>
                Read our{' '}
                <Link
                  href="/terms"
                  className="text-brand-blue font-semibold hover:underline"
                >
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-brand-blue font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                before donating.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-brand-blue to-[#07205c] rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-brand-red opacity-20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-6">
                Give what you can,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-brand-red">
                  today.
                </span>
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10">
                No amount is too small. Since {FOUNDED_YEAR} this work has been
                kept going by ordinary people who each gave a little, and by
                volunteers who gave their time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DonateCTA
                  label="Donate Now"
                  className="inline-flex items-center justify-center gap-3 bg-white text-brand-blue font-heading font-black text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform btn-pulse-white"
                />
                <Link
                  href="/join-us"
                  className="inline-flex items-center justify-center gap-3 bg-brand-red text-white border-2 border-brand-red font-heading font-black text-lg px-8 py-4 rounded-full hover:bg-transparent transition-all"
                >
                  Volunteer Instead <i className="fa-solid fa-heart"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
