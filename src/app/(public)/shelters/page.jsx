import PageHeader from '@/components/PageHeader';
import SheltersSection from '@/components/SheltersSection';
import VolunteerCTA from '@/components/VolunteerCTA';
import { getShelters } from '@/lib/shelters';

export const metadata = {
  title: 'Our Shelters | Helping Hearts NGO',
  description:
    'Discover the safe havens we operate — each shelter is designed to provide care, comfort, and a loving environment.',
};

export const revalidate = 300;

export default async function PublicSheltersPage() {
  const shelters = await getShelters();

  return (
    <>
      <PageHeader
        eyebrow="Homes of Hope"
        title="Our Care Shelters"
        description="Discover the safe havens we operate. Each shelter is designed to provide care, comfort, and a loving environment for those who need it most."
        breadcrumb="Our Shelters"
      />

      <SheltersSection
        shelters={shelters}
        title="Every Home Tells a Story"
        subtitle="Dedicated staff, warm meals, and round-the-clock care across all of our locations in and around Coimbatore."
        showViewAll={false}
        className="py-20 bg-brand-cream"
      />

      <VolunteerCTA />
    </>
  );
}
