import Hero from '@/components/Hero';
import ImpactCards from '@/components/ImpactCards';
import VideoSection from '@/components/VideoSection';
import EventsSection from '@/components/EventsSection';
import SheltersSection from '@/components/SheltersSection';
import VolunteerCTA from '@/components/VolunteerCTA';
import { getEvents } from '@/lib/events';
import { getShelters } from '@/lib/shelters';

// Re-read Firestore periodically so admin additions show up without a redeploy
export const revalidate = 300;

export default async function HomePage() {
  const [events, shelters] = await Promise.all([
    getEvents({ limit: 3 }),
    getShelters({ limit: 2 }),
  ]);

  return (
    <>
      <Hero />
      <ImpactCards />
      <VideoSection />
      <EventsSection events={events} />
      <SheltersSection shelters={shelters} />
      <VolunteerCTA />
    </>
  );
}
