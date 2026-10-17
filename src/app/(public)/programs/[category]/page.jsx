import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ProgrammeCategoryTabs from '@/components/ProgrammeCategoryTabs';
import ProgrammeCategoryDetails from '@/components/ProgrammeCategoryDetails';
import ProgrammeSheltersGrid from '@/components/ProgrammeSheltersGrid';
import VolunteerCTA from '@/components/VolunteerCTA';
import {
  PROGRAMME_CATEGORIES,
  CATEGORY_MAP,
  isValidCategory,
} from '@/lib/shelterCategories';
import { getShelters, getSheltersByCategory } from '@/lib/shelters';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { category: rawCategory } = await params;
  const categoryId = String(rawCategory || '').toLowerCase();
  const category = CATEGORY_MAP[categoryId];

  if (!category) {
    return { title: 'Programme Category Not Found | Helping Hearts NGO' };
  }

  return {
    title: `${category.title} | Helping Hearts NGO`,
    description: category.tagline,
  };
}

export default async function ProgrammeCategoryPage({ params }) {
  const { category: rawCategory } = await params;
  const categoryId = String(rawCategory || '').toLowerCase();

  if (!isValidCategory(categoryId)) {
    notFound();
  }

  const category = CATEGORY_MAP[categoryId];

  // Fetch shelters filtered by category and total shelters for badge counts
  const allShelters = await getShelters();
  const matchingShelters = allShelters.filter((s) => s.category === categoryId);

  const shelterCounts = {
    'long-term': allShelters.filter((s) => s.category === 'long-term').length,
    'mid-term': allShelters.filter((s) => s.category === 'mid-term').length,
    livelihood: allShelters.filter((s) => s.category === 'livelihood').length,
  };

  return (
    <>
      <PageHeader
        eyebrow="Our Programmes & Shelter Models"
        title={category.title}
        description={category.tagline}
        breadcrumb={category.title}
      />

      <section className="py-16 lg:py-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Top Quick Category Tabs */}
          <ProgrammeCategoryTabs
            activeCategory={categoryId}
            shelterCounts={shelterCounts}
          />

          {/* Detailed Category Narrative & Objectives */}
          <ProgrammeCategoryDetails category={category} />

          {/* Shelters Filtered for this Category */}
          <div id="shelters-list" className="pt-8">
            <ProgrammeSheltersGrid
              shelters={matchingShelters}
              categoryTitle={category.title}
              categoryId={categoryId}
            />
          </div>

          {/* Back to main overview */}
          <div className="mt-16 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-700 hover:text-brand-blue font-bold border border-gray-200 shadow-sm transition"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Programmes Overview
            </Link>
          </div>
        </div>
      </section>

      <VolunteerCTA />
    </>
  );
}
