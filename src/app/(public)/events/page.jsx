import PageHeader from '@/components/PageHeader';
import EventsSection from '@/components/EventsSection';
import VolunteerCTA from '@/components/VolunteerCTA';
import { getEvents } from '@/lib/events';

export const metadata = {
  title: 'Events | Helping Hearts NGO',
  description:
    'Celebrations, medical camps, and donation drives — a look at the moments we have shared with our community.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Moments Together"
        title="Our Events"
        description="Celebrations, medical camps, and donation drives — every gathering is a step towards a kinder community."
        breadcrumb="Events"
      />

      <EventsSection
        events={events}
        title="All Events"
        subtitle="Browse through the milestones we've achieved together with our volunteers, donors, and well-wishers."
        showViewAll={false}
        className="py-20 bg-white"
      />

      <VolunteerCTA />
    </>
  );
}
