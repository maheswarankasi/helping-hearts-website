# Emergency Care & Short-Term Care Programme Page & Integration

A dedicated, responsive programme detail page for **Emergency Care & Short-Term Care** (Step 01 of the Homeless Welfare Programme) and its seamless integration into the public Programmes overview, featuring an interactive intervention timeline stepper and dedicated Government Hospital-based Emergency Care & Recovery Centres (ECRCs).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and user experience decisions were confirmed during the planning consultation:

- **Confirmed Decision 1 (Route & Aliasing)**: Support both `/programs/emergency-care` and `/programs/emergency-short-term-care` routes seamlessly. The primary canonical page will reside at `/programs/emergency-care` and `/programs/emergency-short-term-care/page.jsx` will re-export/render the same view, ensuring zero broken links regardless of the URL used.
- **Confirmed Decision 2 (Operating Facilities)**: Showcase dedicated Government Hospital-based Emergency Care & Recovery Centre (ECRC) cards (Coimbatore, Dindigul, Karur) highlighting campus location, 24/7 acute intake criteria, capacity, and rescue coordination.
- **Confirmed Decision 3 (Intervention Timeline)**: Implement an interactive visual stepper (`0–24 Hours: Rescue & Triage` ➔ `Day 1 – Week 2: Medical & Psychiatric Stabilization` ➔ `Week 2 – Month 1: Psychosocial & Identity Linkage` ➔ `Month 1 – Month 6: Transition & Pathway Referral`) with live step selection and detailed service breakdown.
- **Confirmed Decision 4 (Programmes Overview Integration)**: Update `/programs` Focus Area 01 card with a `"Learn more"` button featuring `<i className="fa-solid fa-arrow-right"></i>` with optical alignment, and link the card image directly to the new detail page.

---

### 1. Overview & Core Concept

- **What It Does**: Provides a dedicated, in-depth public page presenting Helping Hearts' emergency intervention pipeline for homeless individuals in acute crisis, including on-street rescue operations, immediate medical triage, psychiatric care in Government Hospital campus ECRCs, and pathways to mid-term rehabilitation or long-term care.
- **Target Audience / Persona**: Donors, government social welfare officers, healthcare partners, volunteers, and families searching for missing or destitute loved ones.
- **Key Value**: Closes the gap between initial street identification and structured long-term shelter care, articulating the exact acute-care methodology and impact figures (265+ rescues, 145 hospital beds, 49 family reunifications).

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Discovery from Programmes Overview (`/programs`)**: The visitor views the 4-step Homeless Welfare Programme. Step 01 ("Emergency Care & Short-Term Care") now has an active card link and a standard CTA button: `"Learn more"` with `<i className="fa-solid fa-arrow-right"></i>`.
  2. **Page Landing & Hero**: Visited at `/programs/emergency-care` or `/programs/emergency-short-term-care`. Displays breadcrumbs (`Home / Programmes / Emergency Care & Short-Term Care`), hero headline, mission statement, and a quick-action 24/7 rescue helpline banner.
  3. **Core Objectives & Services Grid**: 3-column card grid detailing **Rescue Services** (street outreach & transport), **Medical Care** (first aid, psychiatric evaluation, hospital referrals), and **Support Services** (counselling, welfare scheme linkage, family tracing).
  4. **Interactive Intervention Timeline Stepper**: 4-phase interactive stepper allowing users to click or tap through the chronological rescue-to-reintegration journey.
  5. **Operating Facilities & Model Centres**: Dedicated cards for the 3 active Government Hospital ECRC centres (Government Medical College Hospital Coimbatore, Government Hospital Oddanchatram Dindigul, and Government Medical College Hospital Karur), with key operational specifications.
  6. **Impact & Rescue Breakdown**: Transparent statistical verification highlighting 265 total rescues (141 male, 124 female), demographic triage categories, and family reunifications.
  7. **Next Step Navigation & Volunteer CTA**: Seamless navigation back to the Programmes Overview or forward to the Medium-Term Rehabilitation Pathway.

- **Visual Identity & Theme**:
  - *Palette*: Brand Dark Navy (`#0F172A`), Medical Trust Blue (`#1E3A8A` / `#2563EB`), Emergency Warm Red (`#DC2626`), Crisp Cream canvas (`#FBF9F5` / `#F8FAFC`), and subtle slate hairline borders.
  - *Typography*: Plus Jakarta Sans display typography for headlines with `text-wrap: balance`; readable body prose (`measure 65–75ch`); tabular figures (`tabular-nums`) for rescue statistics and bed capacities.
  - *Anti-Slop Discipline*: Zero unboxed pills on card headers; clean unboxed metadata with `·` separators; no thick left accent borders (`border-l-4`); no decorative pulsing green dots; standard single-line button text.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Route Aliasing Strategy**:
  - *Chosen Approach*: Implement the canonical page at `src/app/(public)/programs/emergency-care/page.jsx` and an alias route at `src/app/(public)/programs/emergency-short-term-care/page.jsx` importing and rendering the same component.
  - *Why*: Eliminates 404 risks whether links use the shortened semantic slug (`emergency-care`) or the literal hyphenated title (`emergency-short-term-care`).
- **Decision 2: Interactive Stepper State Management**:
  - *Chosen Approach*: Client-side interactive stepper component (`EmergencyTimelineStepper.jsx`) embedded in the server-rendered page.
  - *Why*: Delivers instant, zero-latency phase transitions when users click phases without full-page reloads or layout shift.
- **Decision 3: Real Data Grounding from Official Records**:
  - *Chosen Approach*: Ground all figures, centre names, and narrative directly in the verified organizational data from `src/lib/siteContent.js` and `src/lib/shelterCategories.js` (matching the attached PDF).
  - *Why*: Zero placeholder copy; 100% authentic figures corresponding to Helping Hearts' actual government hospital MoUs and field records.

---

### 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC NAVIGATION TREE                          │
│                                                                        │
│   /programs (Programmes Overview)                                      │
│      ├── Step 01: Emergency Care & Short-Term Care ─────────┐          │
│      ├── Step 02: Medium Term Rehabilitation Pathway        │          │
│      ├── Step 03: Long Term Residential Care                │          │
│      └── Step 04: Livelihood Development                    │          │
└─────────────────────────────────────────────────────────────┼──────────┘
                                                              ▼
┌────────────────────────────────────────────────────────────────────────┐
│   /programs/emergency-care  &  /programs/emergency-short-term-care     │
├────────────────────────────────────────────────────────────────────────┤
│ 1. PageHeader (Breadcrumbs, Title, Tagline, Rescue Badge)              │
│ 2. EmergencyOverviewCard (High-contrast mission & 24/7 Helpline bar)   │
│ 3. CoreServicesGrid (Rescue, Medical & Hospital, Psychosocial Support) │
│ 4. EmergencyTimelineStepper (Interactive 4-Phase Chronological Flow)   │
│      [0-24h Rescue] ➔ [Day 1-14 Triage] ➔ [Wk 2-4 Support] ➔ [Pathway] │
│ 5. OperatingECRCSection (Govt Hospital ECRCs: Coimbatore, Dindigul,    │
│    Karur with bed capacities & intake protocols)                       │
│ 6. RescueStatisticsStrip (265 Rescues, Gender & Condition breakdown)   │
│ 7. PathwayNavigationCTA (Links to Programmes Overview & Next Step)     │
└────────────────────────────────────────────────────────────────────────┘
```

- **Components to Create & Update**:
  1. `src/components/EmergencyTimelineStepper.jsx`: Interactive client component with step state, animated phase highlights, and granular intervention checklists.
  2. `src/app/(public)/programs/emergency-care/page.jsx`: Dedicated Next.js page component assembled with standard layout, metadata, and high-fidelity sections.
  3. `src/app/(public)/programs/emergency-short-term-care/page.jsx`: Route alias re-exporting the page.
  4. `src/app/(public)/programs/page.jsx`: Updated `FOCUS_AREA_CATEGORY_MAP` and Step 01 card linking to `/programs/emergency-care` with standard `"Learn more"` CTA button.
  5. `src/lib/siteContent.js`: Enhanced emergency care data dictionary including ECRC centres and timeline metadata.

---

### 5. Verification Plan

- Run `compile_applet` to verify compilation across both `/programs/emergency-care` and `/programs/emergency-short-term-care` routes.
- Run `lint_applet` to ensure zero syntax or accessibility lint issues.
- Verify that clicking `"Learn more"` on `/programs` routes to the dedicated page.
- Test responsive viewports on desktop (1440px), tablet (768px), and mobile (375px).
