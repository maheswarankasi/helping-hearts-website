import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import { siteInfo } from '@/lib/siteContent';

export const metadata = {
  title: 'Contact Us | Helping Hearts NGO',
  description:
    'Get in touch with Helping Hearts — visit us in Coimbatore, call, email, or send us a message through our contact form.',
};

const contactCards = [
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Visit Us',
    lines: siteInfo.address,
    tone: 'blue',
  },
  {
    icon: 'fa-solid fa-phone',
    label: 'Call Us',
    lines: [siteInfo.phone, siteInfo.officeHours],
    tone: 'red',
  },
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    lines: [siteInfo.whatsappDisplay, 'Message us any time'],
    tone: 'red',
  },
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email Us',
    lines: [siteInfo.email, 'We reply within 2 working days'],
    tone: 'blue',
  },
];

const toneStyles = {
  blue: 'bg-brand-softblue text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
  red: 'bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We'd Love To Hear From You"
        title="Contact Us"
        description="Whether you want to volunteer, donate, or simply learn more about our homes — reach out and our team will get back to you."
        breadcrumb="Contact"
      />

      {/* Contact detail cards */}
      <section className="py-16 lg:py-20 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactCards.map((card) => (
              <div
                key={card.label}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110 ${
                    toneStyles[card.tone]
                  }`}
                >
                  <i className={card.icon}></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                  {card.label}
                </h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-gray-600 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + socials */}
      <section className="pb-20 lg:pb-24 bg-brand-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <div className="w-16 h-2 bg-brand-red rounded-full mb-4"></div>
              <p className="text-gray-500 mb-10">
                Fill in the form below and our team will respond as soon as
                possible.
              </p>

              <ContactForm />
            </div>

            <aside className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-brand-blue to-[#07205c] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-6 w-28 h-28 bg-brand-red opacity-20 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-black mb-4">
                    Prefer to talk?
                  </h3>
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    Our coordinators are happy to walk you through our homes,
                    volunteering options, and how donations are used.
                  </p>

                  <a
                    href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 mb-4 hover:bg-white hover:text-brand-blue transition-all group"
                  >
                    <span className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <span className="font-bold">{siteInfo.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${siteInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 mb-4 hover:bg-white hover:text-brand-blue transition-all"
                  >
                    <span className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                      <i className="fa-brands fa-whatsapp"></i>
                    </span>
                    <span className="font-bold">
                      {siteInfo.whatsappDisplay}
                    </span>
                  </a>

                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 hover:bg-white hover:text-brand-blue transition-all"
                  >
                    <span className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <span className="font-bold break-all">
                      {siteInfo.email}
                    </span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Follow Our Journey
                </h3>
                <div className="w-12 h-1.5 bg-brand-red rounded-full mb-6"></div>
                <p className="text-gray-500 mb-6">
                  See daily updates from our shelters and events.
                </p>
                <div className="flex gap-3">
                  {siteInfo.socials.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-12 h-12 rounded-full bg-brand-cream text-gray-600 flex items-center justify-center text-lg transition-all hover:scale-110 hover:text-white ${
                        index % 2 === 0
                          ? 'hover:bg-brand-blue'
                          : 'hover:bg-brand-red'
                      }`}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
