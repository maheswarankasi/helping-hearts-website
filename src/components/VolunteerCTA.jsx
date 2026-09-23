import Link from 'next/link';

export default function VolunteerCTA() {
  return (
    <section id="volunteer" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-br from-brand-blue to-[#07205c] rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-brand-red opacity-20 rounded-full blur-2xl"></div>

          <div className="relative z-10 w-full md:w-2/3 text-center md:text-left mb-10 md:mb-0">
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-6">
              Want to be a part of our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-brand-red">
                Family?
              </span>
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto md:mx-0">
              Join our vibrant community of volunteers or support us
              financially. Share your time, skills, or love to make a real
              difference in someone&apos;s life today.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto flex flex-col gap-4 justify-center">
            <Link
              href="/join-us"
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-blue font-heading font-black text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform btn-pulse-white"
            >
              Join Us Now{' '}
              <i className="fa-solid fa-hand-holding-heart text-brand-red"></i>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-3 bg-brand-red text-white border-2 border-brand-red font-heading font-black text-lg px-8 py-4 rounded-full hover:bg-transparent transition-all btn-pulse-white"
            >
              Donate Us <i className="fa-solid fa-hand-holding-dollar"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
