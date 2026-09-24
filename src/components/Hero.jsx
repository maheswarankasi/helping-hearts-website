import Link from 'next/link';
import SmartImage from './SmartImage';
import { FOUNDED_YEAR, heroImages, siteInfo } from '@/lib/siteContent';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative flex items-center">
      {/* Background image — an optimised <Image> rather than a CSS
          background, so it can be resized, served as WebP, and preloaded. */}
      <SmartImage
        src={heroImages.background}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={60}
        className="object-cover"
      />
      <div className="absolute inset-0 hero-overlay"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Left text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>{' '}
              Spreading Hope Since {FOUNDED_YEAR}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest">
              <i className="fa-solid fa-certificate text-brand-red"></i> Reg.
              No. {siteInfo.registrationNumber}
            </div>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
            Every Heart <br /> Deserves a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-400">
              Loving Home.
            </span>
          </h1>

          <p className="font-heading text-xl md:text-2xl font-bold text-blue-100 mb-5 italic">
            &ldquo;{siteInfo.tagline}&rdquo;
          </p>

          <p className="text-lg text-blue-50 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
            Since {FOUNDED_YEAR} we have rescued homeless people from the
            streets, given them shelter and care, and taken healthcare to
            lakhs of families across Coimbatore.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/donate"
              className="bg-brand-red text-white px-8 py-4 rounded-full font-bold hover:-translate-y-1 transition-all text-center btn-pulse-white"
            >
              Donate Us{' '}
              <i className="fa-solid fa-hand-holding-heart text-white ml-2"></i>
            </Link>
            <Link
              href="/join-us"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-blue transition-all text-center flex items-center justify-center gap-2 btn-pulse-white"
            >
              Join Us <i className="fa-solid fa-heart text-brand-red"></i>
            </Link>
          </div>
        </div>

        {/* Right image collage */}
        <div className="w-full lg:w-1/2 relative h-[500px]">
          <div className="absolute right-0 top-0 w-4/5 h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50 z-10 transform hover:rotate-1 transition duration-500">
            <SmartImage
              src={heroImages.primary}
              alt="Volunteer caring for a senior resident"
              fill
              sizes="(max-width: 1024px) 80vw, 460px"
              className="object-cover"
            />
          </div>

          <div className="absolute left-0 bottom-0 w-3/5 h-64 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 z-20 transform -rotate-3 hover:rotate-0 transition duration-500">
            <SmartImage
              src={heroImages.secondary}
              alt="Children at our shelter"
              fill
              sizes="(max-width: 1024px) 60vw, 340px"
              className="object-cover"
            />
          </div>

          <div
            className="absolute -left-8 top-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl z-30 border border-white flex items-center gap-4 animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 text-white rounded-full flex items-center justify-center text-xl shadow-inner">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>
            <div>
              <p className="font-heading font-black text-2xl text-brand-blue leading-none">
                265
              </p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                Rescued From Streets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
