# Shelter Categorization & Programme Showcase

Categorize care shelters into three dedicated tiers (**Long-Term**, **Mid-Term**, and **Livelihood**) across the administrative portal and public website, providing donors, volunteers, and beneficiaries with an organized view of each programme's objectives, impact, and associated facilities.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarification questions were skipped; the plan applies recommended standards to ensure complete backwards compatibility, zero broken links, and high usability:
> - **Category Persistence**: `category` field (`long-term`, `mid-term`, `livelihood`) added to shelter documents with `long-term` as the safe default fallback for existing records.
> - **URL & Route Architecture**: The primary public page remains `/programs` (and `/programmes` provided as an alias/rewrite route), supporting both dynamic in-page tab filtering with URL syncing (`/programs?category=long-term` or `/programs/[category]`).
> - **Clean Layout & State**: Each category showcases its distinct purpose, supported demographics, key metrics, and filtered shelter list with responsive skeletons and empty state cards.

- **Confirmed Classification**:
  - `long-term` ("Long-Term Shelters"): Permanent rehabilitation, continuous medical attention, and lifelong dignified care for elderly and abandoned individuals.
  - `mid-term` ("Mid-Term Shelters"): Transitional shelter, psychiatric/health recovery, family tracing, and reintegration programs.
  - `livelihood` ("Livelihood Shelters"): Skill empowerment, vocational training (e.g., Home Again projects), craft workshops, and self-sufficiency centres.

---

## 1. Overview & Core Concept

Helping Hearts operates different shelter models tailored to varying resident needs—from lifelong care for bedridden elders to transitional recovery and vocational training centers. 

This feature delivers:
1. **Admin Control**: Shelter administrators can assign each shelter to a mandatory category during creation or editing, and filter/view categories in the shelter table.
2. **Public Programme Hub**: A reimagined public page featuring interactive programme tier cards. Selecting any category dynamically reveals:
   - Dedicated programme overview (Objectives, Who It Supports, Impact Metrics).
   - Filtered grid of physical shelters operating under that specific category.
   - Direct link to individual shelter detail pages (`/shelters/[id]`).

---

## 2. User Experience & Visual Design

### A. Admin Experience (`/admin/shelters`)
- **Table View**: Adds a distinct badge column displaying the category (Long-Term, Mid-Term, Livelihood) alongside Name, Tag, Capacity, and Location.
- **Form Modal**:
  - Mandatory `Shelter Category` dropdown with options:
    - `Long-Term (Permanent elderly & intensive care)`
    - `Mid-Term (Transitional & rehabilitation)`
    - `Livelihood (Vocational & independent living)`
  - Form validation ensures category cannot be blank.

### B. Public Experience (`/programs` & `/programs/[category]`)
- **Hero / Header**: "Our Programmes & Shelter Models" highlighting how care is tailored by need.
- **3-Pillar Category Selector**:
  - Three interactive cards with icons and distinct accents (Brand Blue `#0a3085`, Brand Red `#cc111a`, Emerald `#047857`).
  - Active tab state with clean typographic underline and elevated container styling (Anti-Pill discipline).
- **Programme Focus Spotlight**:
  - **Objectives**: Primary mission of this care tier.
  - **Target Beneficiaries**: Who qualifies and how rescues transition here.
  - **Key Impact & Capabilities**: Capacity, staff-to-resident ratio, healthcare facilities.
- **Filtered Shelter Grid**:
  - Displays shelter cards matching the active category with image thumbnail, location pin, capacity badge, and "View Shelter" CTA.
  - **Loading Skeleton**: Shimmer cards while data loads.
  - **Empty State**: Friendly illustration and message when no shelters are listed in a tier yet.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: URL Synced In-Page State vs. Dedicated Routes**
  - *Chosen Approach*: Support both direct routes (`/programs/[category]`) and client-side tab switching with URL query sync (`/programs?category=long-term`).
  - *Why*: Gives users shareable, bookmarkable deep links for specific programmes while maintaining instant, smooth tab switching without full-page reloads.
- **Decision 2: Backwards Compatibility for Existing Shelters**
  - *Chosen Approach*: Documents in Firestore missing the `category` attribute default gracefully to `'long-term'` in both `getShelters()` data normalizer and admin display.
  - *Why*: Prevents null-pointer exceptions and ensures existing records are never hidden from view.
- **Decision 3: Server & Client Data Fetching Integration**
  - *Chosen Approach*: Server Component initial data fetch via `getShelters()` with client-side category filtering and transition animation.
  - *Why*: Instant first-paint performance without secondary client network waterfall, while allowing snappy zero-latency tab filtering.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                     Firestore Database                       │
│  Collection: 'shelters'                                      │
│  Schema: { id, name, category, address, capacity, ... }      │
└──────────────────────────────┬───────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│      Admin Portal            │ │       Public Website         │
│  /admin/shelters             │ │  /programs & /programs/[cat] │
├──────────────────────────────┤ ├──────────────────────────────┤
│ • Add/Edit Shelter Form      │ │ • Programme Category Cards   │
│   (Select: long-term, etc.)  │ │   (Tabs / Deep links)        │
│ • Category badge in table    │ │ • Programme Narrative Block  │
│ • Full CRUD in Firestore     │ │ • Filtered Shelters Grid     │
└──────────────────────────────┘ └──────────────────────────────┘
```

### Data Model & Types

```typescript
export type ShelterCategory = 'long-term' | 'mid-term' | 'livelihood';

export interface Shelter {
  id: string;
  name: string;
  category: ShelterCategory;
  tag?: string | null;
  address: string;
  description: any; // RichText or plain string
  capacity?: string | null;
  capacityIcon?: string;
  mapUrl?: string | null;
  images: string[];
  image: string | null;
  tone: 'blue' | 'red';
  sortKey: number;
}

export interface ProgrammeCategory {
  id: ShelterCategory;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: string;
  color: 'blue' | 'red' | 'emerald';
  objectives: string[];
  targetGroup: string;
  impactMetrics: { label: string; value: string }[];
  overview: string;
}
```

### Execution Steps
1. **Data Model & Normalization (`src/lib/shelters.js` & `src/lib/siteContent.js`)**:
   - Update `toShelter` normalizer to extract and sanitize `data.category` (defaulting to `'long-term'`).
   - Define `PROGRAMME_CATEGORIES` metadata constant in `src/lib/siteContent.js`.
2. **Admin Shelter Form & Table (`src/app/admin/shelters/page.jsx`)**:
   - Add `category` to `EMPTY_FORM` state.
   - Add `<select>` field with the three options in the shelter modal.
   - Display category badges in the admin listing table.
3. **Public Programme Category Hub (`src/app/(public)/programs/page.jsx` & `/programs/[category]/page.jsx`)**:
   - Create interactive `ProgrammeCategorySection` component for tab selection, programme overview, and filtered shelter card list.
   - Implement empty state (`EmptyState.jsx`) and skeleton cards for zero-result categories.
   - Provide route handler for both `/programs` and `/programs/[category]`.
4. **Verification**:
   - Test shelter creation, editing, category updating in admin panel.
   - Verify public filtering, category switching, deep linking, and responsive layouts.
