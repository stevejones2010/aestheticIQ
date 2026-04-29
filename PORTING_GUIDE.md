# AestheticIQ — Porting Guide

How to port the remaining wireframe pages into the Astro project.

This guide covers industry pages (Medical Devices, Beauty & Skincare, Distributors, Training, Investors), solution pages (Marketing Services, Market Intelligence, Consultancy, Compliance & PV), index pages, and utility pages. Pharma and the homepage are already done — use them as worked examples.

---

## Before you start

You need three things open:

1. **The wireframe HTML** for the page you're porting (e.g. `aestheticiq_industries.html` for industry pages, `aestheticiq_solutions.html` for solutions). Open in a browser to see the design, and in a code editor to copy content from.
2. **The Pharma worked example** at `src/pages/industries/pharma.astro` as your structural template.
3. **A code editor** like VS Code with the Astro extension installed (search "Astro" in Extensions, install the official Astro Build extension — gives you syntax highlighting and autocomplete).

The dev server should be running (`npm run dev`). Hot reload makes iteration fast.

---

## The 7-step porting process

Every page follows the same process. Work through it in order, don't skip ahead.

### Step 1: Find your page section in the wireframe

Industry pages live inside `aestheticiq_industries.html` — one big file with all 5 industry pages stacked. Each page starts with a `<div class="page-separator">` block. Search the file for these to find your page:

```
PAGE 1 — Medical Devices
PAGE 2 — Professional Beauty & Skincare
PAGE 3 — Distributors & Specialist Pharmacies
PAGE 4 — Training Providers
PAGE 5 — Investors & Corporate Finance
```

Solution pages live in `aestheticiq_solutions.html` — same structure, four pages stacked.

Copy the section between your `page-separator` and the next one. That's your source content.

### Step 2: Create the Astro file

The file path determines the URL. Use these conventions:

| Wireframe page | Astro file path | URL |
|---|---|---|
| Medical Devices | `src/pages/industries/medical-devices.astro` | `/industries/medical-devices/` |
| Beauty & Skincare | `src/pages/industries/beauty-skincare.astro` | `/industries/beauty-skincare/` |
| Distributors | `src/pages/industries/distributors.astro` | `/industries/distributors/` |
| Training | `src/pages/industries/training.astro` | `/industries/training/` |
| Investors | `src/pages/industries/investors.astro` | `/industries/investors/` |
| Marketing Services | `src/pages/solutions/marketing-services.astro` | `/solutions/marketing-services/` |
| Market Intelligence | `src/pages/solutions/market-intelligence.astro` | `/solutions/market-intelligence/` |
| Consultancy | `src/pages/solutions/consultancy.astro` | `/solutions/consultancy/` |
| Compliance & PV | `src/pages/solutions/compliance-pv.astro` | `/solutions/compliance-pv/` |

Filenames use kebab-case (lowercase with hyphens). No spaces, no underscores.

### Step 3: Copy the Pharma file as your starting template

For an industry page:

1. Open `src/pages/industries/pharma.astro`
2. Select all, copy
3. Paste into your new file
4. Save

For a solution page, there's no built worked example yet — but structurally a solution page is simpler than an industry page. Look at the wireframe and adapt the Pharma structure: hero, "what we offer" section, delivery cards, pricing tiers, FAQ, final CTA.

### Step 4: Update the frontmatter

The frontmatter is the block at the top between `---` markers. Update:

- The page `title` and `description` in the BaseLayout call
- The `BreadcrumbBar` items array
- Any data arrays (heroStats, domainCards, etc.) — replace Pharma content with your industry's content

The wireframe HTML has all the content you need. Just lift the text and restructure into JavaScript arrays.

**Example** — converting wireframe HTML to JS data:

Wireframe:
```html
<div class="proof-card">
  <div class="proof-card-label">SALES TERMS</div>
  <h4>Capital sales &amp; KAMs</h4>
  <p>Key Account Management, <strong>POC</strong> placement...</p>
</div>
```

Astro frontmatter:
```ts
const domainCards = [
  {
    label: 'SALES TERMS',
    title: 'Capital sales & KAMs',
    body: 'Key Account Management, <strong>POC</strong> placement...',
  },
  // ...
];
```

Notice: `&amp;` becomes `&`. HTML inside string literals (the `<strong>` tag) stays as-is — it'll render as HTML when passed to `set:html`.

### Step 5: Update the page sections

Work through each section, replacing Pharma content with your industry's content:

- **Hero**: New eyebrow, title, subtitle, stats. Use `<em>` tags inside the title for cyan-accent words.
- **Domain fluency**: New three cards (lift directly from the wireframe).
- **Stack positioning**: New stack rows. Industry pages typically have 3 rows where the third is "AestheticIQ — specialist layer".
- **Roles intro**: Update the "How teams use it" section title and subtitle.
- **Role sections**: This is the biggest job — see Step 6.
- **Pricing tiers**: Update three tiers if relevant. Some industries have different commercial frames (e.g. Investors = project-based, no annual subscription).
- **Final CTA**: Adapt copy to industry. Most are similar.

### Step 6: Build the role-section visuals

This is where each industry differs most. Each role section in your wireframe has its own bespoke visual on the right side. The `RoleSection` component takes a `<slot>` for the visual, so you put the visual HTML inside `<RoleSection>...</RoleSection>` tags.

Five visual patterns appear across the industries:

| Pattern | Component to use | Used by |
|---|---|---|
| **Bar chart** | `BarChart.astro` | Pharma, Devices, Beauty, Distributors, Training |
| **Record list / feed** | `RecordList.astro` | Pharma (PV alerts), Distributors (new clinics), Training (practitioners), Investors (M&A targets) |
| **Account record** | Inline grid table | Pharma (Veeva record), Devices (lead score) |
| **Cycle/timeline** | Inline list | Devices (sales cycle) |
| **Region grid** | Inline grid | Devices (regional density), Training (regional map) |

The first two are pre-built — use the components. The other three are inline patterns — see "Visual primitive snippets" section below.

### Step 7: Test in the browser

Save the file. Hot reload should fire automatically. Navigate to the URL (e.g. `localhost:4321/industries/medical-devices/`) and check:

- ✅ Page loads without console errors
- ✅ All sections render in the right order
- ✅ Bar charts have visible bars (not just text)
- ✅ Sticky visuals stay in place when you scroll past them
- ✅ Mobile view works (resize browser to ~380px wide — role grids should stack vertically)
- ✅ Links in `RelatedLinks` and CTA buttons point to valid hrefs

If something looks broken, check the PowerShell terminal for build errors. Astro logs them clearly.

---

## Component reference card

What each shared component takes as props. Keep this open while porting.

### `BaseLayout`
```astro
<BaseLayout title="Page title" description="Page description">
  <!-- page content -->
</BaseLayout>
```

### `BreadcrumbBar`
```astro
<BreadcrumbBar items={[
  { label: 'Home', href: '/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Current page' },  // last item has no href
]} />
```

### `Hero`
```astro
<Hero
  eyebrow="FOR PHARMA & INJECTABLES"
  title="Your HCP data <em>stops where aesthetics begins.</em>"  // <em> = cyan accent
  subtitle="Generalist HCP databases were built for..."
  primaryCta={{ label: 'Book a demo →', href: '/contact/' }}
  secondaryCta={{ label: 'See a sample', href: '/contact/' }}
  stats={[                                                       // optional
    { num: '15,000+', label: 'UK clinics' },
  ]}
/>
```

### `SectionHeader`
```astro
<SectionHeader
  eyebrow="WHO WE SERVE"
  title="Built for the companies that sell into UK aesthetics."
  subtitle="Optional subtitle text."
  centered                  // optional - centers the header
  light                     // optional - white text for dark sections
/>
```

### `RoleSection`
```astro
<RoleSection
  badge="Role 01 · Commercial"
  title="For National Sales Managers..."
  description="Your reps spend 6+ hours..."
  questions={['Question 1', 'Question 2']}
  outcome="Plain text or <strong>HTML allowed</strong>"
  reverse={true}            // optional - puts visual on left, content on right
  alt={true}                // optional - slate-50 background for alternation
>
  <!-- Bespoke visual goes here as a slot -->
  <div class="bg-white border ...">...</div>
</RoleSection>
```

### `BarChart` (NEW)
```astro
<BarChart
  items={[
    { label: 'Botox', value: 42, valueLabel: '42%', highlight: true },
    { label: 'Azzalure', value: 28, valueLabel: '28%' },
  ]}
  scale={2}                 // optional - multiplier on values for bar widths
  labelWidth="100px"        // optional - left column width
  valueWidth="60px"         // optional - right column width
/>
```
Note: BarChart does NOT include a card wrapper. See "Wrapping `BarChart` in a card with header" below.

### `RecordList` (NEW)
```astro
<RecordList items={[
  { severity: 'high', icon: '!', title: 'AE on Instagram', sub: 'Toxin migration · YCS reportable', time: '2d' },
  { severity: 'info', icon: 'i', title: 'Prescriber left clinic', sub: 'No current prescriber', time: '2w' },
]} />
```
Severities: `info` (cyan), `good` (green), `warn` (yellow), `high` (orange).

### `AccountRecord` (NEW)
Use for Veeva-style account displays. See full documentation in "Visual primitive components" section below.

### `Timeline` (NEW)
Use for sales cycles, engagement timelines. See full documentation below.

### `RegionGrid` (NEW)
Use for territory/density displays. See full documentation below.

### `PersonCard` (NEW)
Use for practitioner/KOL/audience lists. See full documentation below.

### `ScoredList` (NEW)
Use for ranked records with score badges. See full documentation below.

### `RelatedLinks`
```astro
<RelatedLinks
  label="OTHER INDUSTRIES WE SERVE"
  links={[
    { label: 'Medical Devices', href: '/industries/medical-devices/' },
    // ...
  ]}
/>
```

### `PricingTier`
```astro
<PricingTier
  tier="TIER 01"
  name="Bespoke Audience"
  price="£5,000"
  priceRange="–£6,000"     // optional
  period="One-off"
  description="A single audience segment..."
  features={['500–2,000 records', 'Full contact details']}
  featured={false}          // optional - true = highlighted "Most popular" tier
/>
```

### `FAQCard`
```astro
<FAQCard
  question="How often is the dataset refreshed?"
  answer="The dataset is updated daily..."
/>
```

---

## Per-solution porting notes

Solution pages have a different structure from industry pages — no role sections, but pricing and FAQ are central. Use **`reference-data.astro`** as your structural template.

### The standard solution page structure

Every solution page has these 7 sections in order:

1. **Hero** — eyebrow, title, subtitle, CTAs, hero stats
2. **What we offer / What's in a record** — left side has 4-6 numbered category cards, right side has a sticky visual
3. **How it works / methodology** — lighter section with source badges or process flow
4. **Delivery** — three-card grid on dark navy background
5. **Pricing** — three pricing tiers (`PricingTier` component)
6. **FAQ** — 4-6 procurement questions in a 2-column grid (`FAQCard` component)
7. **Final CTA** — dark navy with primary + secondary CTAs

### Marketing Services

**File**: `src/pages/solutions/marketing-services.astro`

**Hero**: Different framing from Reference Data — "Targeted campaigns into the UK clinic channel — planned, built, and delivered end-to-end."

**Section 2 visual**: Show a sample campaign brief instead of a record. Use the snippet from the wireframe — campaign hero box, audience tags, three small metric cards (clinics, cost, delivery time).

**Pricing tiers**: £5–6k bespoke audience / £10–15k managed campaign / £40k+ annual programme

**Note**: The "What we offer" categories are types of campaign (direct mail, digital audience, safety mailers, bespoke audience lists), not record fields.

### Market Intelligence

**File**: `src/pages/solutions/market-intelligence.astro`

**Hero**: "Continuous market intelligence, purpose-built for UK aesthetics."

**Section 2 visual**: Use `BarChart` for the dashboard mock — show toxin brand share + category adoption charts in the same visual card.

**Section 3** ("Where Market Intelligence fits"): This is unique to MI. Not a delivery-style section — it's a positioning section (replaces ad-hoc tracking studies). Treat as a centered text block.

**Pricing tiers**: £8–10k category brief / £15–22k category subscription / £35k+ full portfolio

### Consultancy

**File**: `src/pages/solutions/consultancy.astro`

**Hero**: "Commercial decisions, backed by the UK's deepest aesthetic clinic dataset."

**Section 2 visual**: Engagement timeline (5 weeks/phases). Use the cycle/timeline pattern from industry pages — see "Visual primitive snippets" section.

**"Our approach"**: Replaces the "How it's built" section. Three principles in 3-column grid: grounded in data / UK aesthetic-native / named-lead accountability.

**Pricing tiers**: Different model — these are project sizes, not subscriptions. £25–40k focused / £60–100k full / £120k+ strategic. Period text says "3–5 week engagement" / "6–10 week engagement" / "12+ week engagement".

### Compliance & PV

**File**: `src/pages/solutions/compliance-pv.astro`

**Hero**: "Your MAH obligations extend into aesthetics. The data stack didn't. Now it does."

**Section 2 visual**: Use `RecordList` with severity-coded alerts (high, med, low). Same pattern as Pharma's PV alert visual.

**Unique section**: "Regulatory framework" — needs custom layout. List of regulations (HMR 2012 Part 11, CAP Code, PMCPA, HCA 2022 S.180) with a regulation code badge and short description for each. Build inline, see snippet below.

**FAQ**: Heavier than other solutions. Six regulatory-focused questions (Argus integration, GDPR, inspection support, etc).

**Pricing tiers**: £25–35k single product / £45–70k portfolio / £90k+ enterprise

### Regulatory framework snippet (for Compliance & PV page)

```astro
<div class="bg-white border border-slate-200 rounded-card p-6 max-w-[900px] mx-auto">
  {[
    { code: 'HMR 2012 · Part 11', title: 'MAH pharmacovigilance obligations', desc: 'Supports your obligation to collect, assess, and report adverse drug reactions across the channel where your product is used.' },
    { code: 'HMR 2012 · Reg 214', title: 'Prescription-only medicine supply', desc: 'Prescriber verification evidence to support PGD/supply-chain due diligence.' },
    { code: 'CAP Code', title: 'Advertising standards for POMs', desc: 'Monitoring for breaches of rules prohibiting advertising of prescription-only medicines to the public.' },
    { code: 'PMCPA', title: 'ABPI Code of Practice', desc: 'Surfaces conduct that would warrant self-reporting under the Code: off-label claims, inducements, unapproved promotional tactics.' },
    { code: 'HCA 2022 · S.180', title: 'Non-surgical cosmetic licensing regime', desc: 'Tracks customer readiness for the incoming amber/green tier licensing framework.' },
  ].map((row) => (
    <div class="flex gap-3 py-3 border-b border-slate-100 last:border-b-0 items-start">
      <span class="text-[10.5px] text-cyan-500 bg-cyan-500/8 px-2 py-1 rounded font-mono whitespace-nowrap flex-shrink-0 mt-0.5">
        {row.code}
      </span>
      <div class="flex-1">
        <div class="text-[13px] font-medium text-navy-900 mb-1">{row.title}</div>
        <div class="text-[11.5px] text-slate-500 leading-relaxed">{row.desc}</div>
      </div>
    </div>
  ))}
</div>
```

---

## Per-industry porting notes

### Medical Devices

**File**: `src/pages/industries/medical-devices.astro`

**Hero**: Capital equipment framing. Subtitle mentions "£80k laser sale takes 6–12 months to close."

**Roles** (3 not 4):
1. Key Account Management — visual: `ScoredList` with qualified prospects (clinic name, region, fit score)
2. Clinical Specialists — visual: `Timeline` showing the 5-step capital sales cycle (Day 0 → Day 180)
3. Commercial Operations — visual: `RegionGrid` showing addressable clinics by region

**Pricing**: Same structure as Pharma but different tiers, focused on capital sales economics.

### Professional Beauty & Skincare

**File**: `src/pages/industries/beauty-skincare.astro`

**Hero**: "Your brand lives on clinic shelves and Instagram, but nobody tracks that."

**Stack positioning**: Substitutes Salesforce/HubSpot for Veeva. Update the stack rows accordingly.

**Roles** (3, no PV role):
1. Regional Sales — visual: `AccountRecord` showing a sample clinic prospect with retail stock signals
2. Brand Marketing — visual: `BarChart` (wrapped in card) showing brand visibility vs. competitors
3. Business Development — visual: `RecordList` of new partner candidates with severity-coded rows

### Distributors & Specialist Pharmacies

**File**: `src/pages/industries/distributors.astro`

**Hero**: "First to the new clinic wins the account. Second is just noise."

**Stack positioning**: ERP / CRM / AestheticIQ.

**Roles** (3):
1. Account Operations — visual: `RecordList` of recently-opened clinics with prescriber status (use `info` and `good` severities)
2. Compliance & Supervision — visual: `RecordList` for compliance audits (use `good` for verified, `warn` for issues, `high` for breaches)
3. Category & Commercial — visual: `BarChart` (wrapped in card) showing % of clinics offering each treatment category

### Training Providers

**File**: `src/pages/industries/training.astro`

**Hero**: Lead with the 2027 licensing tailwind: "the biggest training demand in the sector's history."

**Roles** (3):
1. Marketing & Audience — visual: `PersonCard` showing target practitioners (use `amber` tags for "Licence renewal" and "Amber-tier impacted")
2. BD & Partnerships — visual: `RegionGrid` showing practitioner density by region
3. Operations & Curriculum — visual: `BarChart` (wrapped in card) with treatment category growth percentages

### Investors & Corporate Finance

**File**: `src/pages/industries/investors.astro`

**Hero**: "The UK aesthetics market is fragmented, fast-growing, and opaque."

**Stack positioning**: Financial databases / Commercial DD consultants / AestheticIQ. Don't name McKinsey/Bain.

**Use cases (not roles)** (3):
1. Acquisition Screening — visual: `ScoredList` showing M&A targets with company name, sites, revenue estimates, and fit scores (A+, A, B+)
2. Market Sizing & DD — visual: `BarChart` (wrapped in card) showing % independent vs. chain by region
3. Portfolio Monitoring — visual: `ScoredList` with arrow scores (`↑` Over, `=` At, `↓` Under) and matching `scoreTone` (green, cyan, amber)

**Pricing**: Different model — project-based engagements (£25–40k / £60–100k / £120k+). Adapt the engagement-tier section. The middle tier is typically featured.

## Visual primitive components

For visuals not covered by `BarChart` or `RecordList`, **use the dedicated components below.** Do NOT inline visual code — the components are styled to match the wireframes exactly. Inlining loses fidelity and the visuals end up worse than the original wireframes.

### `AccountRecord` — Veeva-style account display

Used for: clinic record displays (Pharma, Reference Data), account profiles (Devices), property records.

```astro
import AccountRecord from '@components/AccountRecord.astro';

<AccountRecord
  name="The Bloom Clinic"
  reference="AIQ-487291"
  groups={[
    {
      label: 'IDENTITY',
      fields: [
        { key: 'Trading name', value: 'The Bloom Clinic Ltd' },
        { key: 'Companies House', value: '12384756' },
      ]
    },
    {
      label: 'TREATMENTS',
      fields: [
        { key: 'Toxin', value: 'Azzalure', chip: { label: 'Web signal', tone: 'info' } },
        { key: 'Filler', value: 'Teosyal', chip: { label: 'Verified', tone: 'good' } },
      ]
    },
    {
      label: 'COMPLIANCE',
      fields: [
        { key: 'Save Face', value: 'Not held', chip: { label: 'Absent', tone: 'warn' } },
      ]
    }
  ]}
  footer="Stylised example · 50+ fields shown in full export"
/>
```

Chip tones: `good` (green), `info` (cyan), `warn` (amber), `absent` (red).

### `Timeline` — sales cycles, engagement timelines

Used for: capital sales cycles (Devices), consultancy engagement phases, customer journeys, anything "Day 0 to Day 180" or "Week 1 to Week 8".

```astro
import Timeline from '@components/Timeline.astro';

<Timeline
  header="Sales cycle · Tracked account"
  subheader="The Bloom Clinic"
  steps={[
    { num: 1, title: 'Qualified by AestheticIQ', sub: 'IPL + 4 categories + GMC prescriber', time: 'Day 0' },
    { num: 2, title: 'First KAM contact', sub: 'Warm outreach, agenda set', time: 'Day 14' },
    { num: 3, title: 'Clinical specialist demo', sub: 'POC booked', time: 'Day 45' },
    { num: 4, title: 'Proposal & financing', sub: 'Tailored ROI presented', time: 'Day 90' },
    { num: 5, title: 'Close + training', sub: 'Lead prescriber certified', time: 'Day 180' },
  ]}
  footer="Stylised example · typical 6-month capital cycle"
/>
```

### `RegionGrid` — territory and density displays

Used for: regional clinic counts (Devices), practitioner density by area (Training), geographic addressable market views.

```astro
import RegionGrid from '@components/RegionGrid.astro';

<RegionGrid
  header="Addressable clinics by region"
  subheader="RF device category"
  cells={[
    { name: 'London', value: 612, label: 'clinics', heat: 'hot' },
    { name: 'South East', value: 287, label: 'clinics' },
    { name: 'NW England', value: 243, label: 'clinics' },
    { name: 'Midlands', value: 198, label: 'clinics', heat: 'med' },
    { name: 'Yorkshire', value: 147, label: 'clinics', heat: 'med' },
    { name: 'Scotland', value: 134, label: 'clinics' },
    { name: 'SW England', value: 112, label: 'clinics' },
    { name: 'Wales', value: 78, label: 'clinics' },
    { name: 'NE England', value: 54, label: 'clinics' },
  ]}
  footer="Stylised example · addressable = fit profile + GMC prescriber"
  columns={3}
/>
```

Heat levels: `hot` (cyan tinted, prominent), `med` (light cyan), default (slate).

### `PersonCard` — practitioner / KOL / audience list

Used for: target audience lists (Training), KOL maps (Pharma medical affairs), brand ambassador candidates (Beauty).

```astro
import PersonCard from '@components/PersonCard.astro';

<PersonCard
  header="Target audience · Level 7 Injectables"
  subheader="1,247 practitioners"
  people={[
    { initials: 'JC', name: 'Dr J. Chen', meta: 'GMC 7123456 · The Bloom Clinic · 3yr exp', tag: 'Licence renewal Q4 2026' },
    { initials: 'SR', name: 'Dr S. Ramanujan', meta: 'GMC 7891023 · Skinoza Clinic · 5yr exp', tag: 'Amber-tier impacted' },
    { initials: 'PO', name: "Ms P. O'Sullivan", meta: 'NMC 04-87342E · Moda Donna · Non-prescriber', tag: 'Prescriber upgrade candidate' },
  ]}
  footer="Stylised example · audience pull via API or CSV"
/>
```

Tag tones: `amber` (default, yellow), `cyan`, `green`.

### `ScoredList` — ranked records with score badges

Used for: M&A target lists (Investors), portfolio benchmarking, lead scoring (Devices), any "named entity with a fit score" pattern.

```astro
import ScoredList from '@components/ScoredList.astro';

<ScoredList
  header="Acquisition targets · SE platform"
  subheader="Filter: 3-10 sites · £3-8m est."
  rows={[
    { name: 'Skinoza Group', details: '5 sites · London + SE · est. £6.2m · CH 11234567', score: 'A+', scoreLabel: 'Fit' },
    { name: 'InnovaSkin Holdings', details: '4 sites · SE · est. £4.8m · CH 12345678', score: 'A', scoreLabel: 'Fit' },
    { name: 'Moda Aesthetic Group', details: '6 sites · London + Home Counties · est. £7.4m', score: 'A', scoreLabel: 'Fit' },
    { name: 'Nova Aesthetic Clinics Ltd', details: '3 sites · London · est. £3.1m', score: 'B+', scoreLabel: 'Fit' },
  ]}
  footer="Stylised example · revenue estimates from Companies House"
/>
```

Score tones: `cyan` (default), `green`, `amber`, `red`.

For portfolio benchmarking with arrows, use `score: '↑'` / `'↓'` / `'='` and `scoreLabel: 'Over'` / `'Under'` / `'At'` with appropriate `scoreTone`.

### Wrapping `BarChart` in a card with header

Unlike the components above, `BarChart` does NOT include its own card wrapper. When you want a `BarChart` to look like the other visuals (with a header bar and footer note), wrap it like this:

```astro
<div class="bg-white border border-slate-200 rounded-card p-5 shadow-card-strong">
  <div class="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
    <div class="text-xs font-medium text-navy-900">Toxin brand visibility · UK clinics</div>
    <div class="text-[10px] text-slate-400">Q1 2026</div>
  </div>

  <BarChart
    items={[
      { label: 'Botox', value: 42, valueLabel: '42%' },
      { label: 'Bocouture', value: 17, valueLabel: '17%', highlight: true },
    ]}
    scale={2}
    labelWidth="80px"
  />

  <div class="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400 text-center leading-relaxed italic">
    Stylised example · continuous tracking
  </div>
</div>
```

---

## How Pharma uses each component

The Pharma worked example demonstrates four of the five components in action — useful as a reference when you're porting:

- **Role 01 (Commercial)** uses `AccountRecord` for the Veeva clinic record display
- **Role 02 (Medical Affairs)** wraps `BarChart` in a card for the practitioner influence map
- **Role 03 (Pharmacovigilance)** wraps `RecordList` for the alert feed
- **Role 04 (Brand Marketing)** wraps `BarChart` again, with `highlight: true` on Bocouture

`Timeline`, `RegionGrid`, and `PersonCard` aren't used on Pharma but are demonstrated in industry-page descriptions in the porting notes below. Look at the corresponding industry pages once they're ported.


## Common pitfalls and fixes

### 1. Bar chart bars don't show

**Symptom**: You see the labels and values but no bars.

**Cause**: Tailwind JIT didn't pick up `h-2`, `h-full`, or background colour classes.

**Fix**: Use the `BarChart` component instead of writing bar markup manually. If you have to inline bars for some reason, use `style="height: 8px; background: #f1f5f9"` for the track, never `class="h-2 bg-slate-100"`.

### 2. Hot reload showing old content

**Symptom**: You saved the file but the browser still shows the old version.

**Fix**: Hard refresh — `Ctrl+Shift+R`. This bypasses the browser cache.

### 3. Astro complains about a missing import

**Symptom**: Build error in PowerShell mentioning a component that "cannot be resolved."

**Fix**: Check the imports at the top of your `.astro` file. Astro path aliases:
- `@layouts/...` for layouts
- `@components/...` for components
- `@/styles/...` for styles

### 4. Em-dashes appearing in copy

**Symptom**: A `—` snuck into your page copy.

**Fix**: We did a sweep removing them earlier. If you find one, replace with comma, period, or colon as appropriate for the context. The em-dash sweep is documented in our previous conversations — check `aestheticiq_industries.html` (the wireframe source) for what the final copy should be.

### 5. The role visual isn't sticky on scroll

**Symptom**: When you scroll past a role section, the visual scrolls away with the text instead of staying in place.

**Cause**: `RoleSection` applies `lg:sticky lg:top-20` to its slot wrapper. If you've nested your visual inside additional containers, the sticky behaviour can break.

**Fix**: Put your visual directly inside `<RoleSection>...</RoleSection>` — no extra `<div>` wrappers.

### 6. Colour appears wrong on a chart

**Symptom**: You used `bg-cyan-500` and got slate, or vice versa.

**Fix**: Same as #1 — Tailwind JIT issue. Use inline `style` for any chart fill colours.

### 7. Page renders but looks unstyled

**Symptom**: Plain Times New Roman text, no styling.

**Fix**: Check the PowerShell terminal for build errors. Usually means the Tailwind config is broken or `global.css` isn't being imported. The `BaseLayout.astro` imports global.css — make sure your page wraps in `<BaseLayout>`.

### 8. Mobile layout breaking

**Symptom**: Content overflows or sections look squished on phone width.

**Fix**: Most layout grids use `lg:grid-cols-[1fr_1.15fr]` — the `lg:` prefix means it's only a grid above 1024px width. Below that, it stacks. If your content overflows, check the wrapping container has `max-w-` set correctly.

---

## Quality checklist

Before considering a page done, verify each of these:

### Content correctness
- [ ] Page title in browser tab matches wireframe
- [ ] All copy from wireframe is present (lift word-for-word, don't paraphrase)
- [ ] No em-dashes left in body copy (the ones we removed earlier)
- [ ] Pricing values match the wireframe
- [ ] Stats/numbers match the wireframe
- [ ] Marketing Services cross-sell hooks are present where they should be (Pharma, Beauty, Distributors, Training)

### Visual correctness
- [ ] Hero shows correct title, eyebrow, subtitle, CTAs, stats
- [ ] All section eyebrows are present
- [ ] All role sections render with both content and visual
- [ ] Bar charts have visible bars (not just text)
- [ ] Sticky visuals stay in place when scrolling
- [ ] Pricing tiers show correctly with featured tier highlighted
- [ ] Final CTA is on dark navy background
- [ ] Related links chip bar is at the bottom

### Technical correctness
- [ ] No errors in PowerShell terminal (build is clean)
- [ ] No errors in browser DevTools console (F12 → Console)
- [ ] Page works at desktop width (1280px+)
- [ ] Page works at tablet width (768px)
- [ ] Page works at mobile width (380px)
- [ ] All `href`s point to valid routes (or to `#` if the target page doesn't exist yet)
- [ ] Images (none currently) load if any are added later

### Routing
- [ ] URL is correct based on file path
- [ ] Breadcrumb shows correct path
- [ ] Page is reachable from the homepage industries/solutions section
- [ ] Footer links point to this page correctly

---

## Time estimates

Rough estimates per page once you're in the rhythm:

- **First industry page** (Medical Devices): 60–90 minutes — you're learning the patterns
- **Subsequent industry pages**: 30–45 minutes each
- **Solution pages**: 30–45 minutes each (simpler structure)
- **Index pages** (Industries, Solutions, Insights): 20–30 minutes each
- **Contact**: 30 minutes
- **Legal pages**: 15 minutes each (mostly just placeholder structure)

Total estimated time to complete the site: **8–12 focused hours**.

---

## When to ask for help

Ask in a fresh conversation if:

- A page looks structurally wrong even after following the guide
- You hit a build error you don't understand
- You want to add a new visual pattern not covered here
- You want to tweak the design system (palette, typography, component patterns)
- You're ready to deploy and need help with Vercel setup
- You're ready to wire up the contact form, newsletter, or analytics

Don't ask for help with:

- Mechanical content swaps (just lift from the wireframe)
- Styling tweaks (Tailwind classes have good documentation at tailwindcss.com/docs)
- "Should this say X or Y?" — content decisions are yours to make

---

## Final note

Pharma is your reference. When in doubt, look at how Pharma did it. The patterns there work, and replicating them across other pages is the path of least resistance.

Take a screenshot of the live Pharma page in your browser and have it open while you port other industry pages — the visual reference will be faster than re-reading this guide.

Good luck. The site is going to be great.
