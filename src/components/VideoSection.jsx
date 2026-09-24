import VideoEmbed from './VideoEmbed';
import { impactVideo } from '@/lib/siteContent';

export default function VideoSection() {
  return (
    <section className="py-12 pb-24 bg-brand-cream relative">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="font-heading text-4xl font-black text-gray-900 mb-4">
          {impactVideo.title}
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          {impactVideo.subtitle}
        </p>

        <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white bg-gray-900 aspect-video">
          <VideoEmbed
            youtubeId={impactVideo.youtubeId}
            title="Helping Hearts impact video"
          />
        </div>
      </div>
    </section>
  );
}
