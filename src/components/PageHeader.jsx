import Link from 'next/link';

/**
 * Banner used at the top of inner public pages. Extra top padding clears the
 * fixed floating navigation.
 */
export default function PageHeader({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-brand-blue to-[#07205c] overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-brand-red opacity-20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red"></span> {eyebrow}
          </div>
        )}

        <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
          {title}
        </h1>

        {description && (
          <p className="text-lg text-blue-50 max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        )}

        {breadcrumb && (
          <nav className="mt-8 text-sm text-blue-100 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white">{breadcrumb}</span>
          </nav>
        )}
      </div>
    </section>
  );
}
