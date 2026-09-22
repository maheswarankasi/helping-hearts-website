import Hero from '@/components/Hero';
import ImpactCards from '@/components/ImpactCards';
import VideoSection from '@/components/VideoSection';
import EventsSection from '@/components/EventsSection';
import SheltersSection from '@/components/SheltersSection';
import VolunteerCTA from '@/components/VolunteerCTA';
import { events } from '@/lib/siteContent';
import { getShelters } from '@/lib/shelters';

// Re-read shelters periodically so admin additions show up without a redeploy
export const revalidate = 300;

export default async function HomePage() {
  const shelters = await getShelters({ limit: 2 });

  return (
    <>
      <Hero />
      <ImpactCards />
      <VideoSection />
      <EventsSection events={events.slice(0, 3)} />
      <SheltersSection shelters={shelters} />
      <VolunteerCTA />
    </>
  );
}
