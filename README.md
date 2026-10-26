# KS Digital — Official Website & Admin CRM

> Modern, full-stack digital marketing agency platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Features a high-converting visual redesign, lightweight lead management CRM, dynamic database-backed CMS, and strict SEO/performance optimization.

- **Live URL:** [https://ksdigital.co.in](https://ksdigital.co.in) (and [https://ksdigital-ecru.vercel.app](https://ksdigital-ecru.vercel.app))
- **Admin Portal:** `/admin` (disallowed in robots.txt, excluded from sitemap)

---

## 🌟 Key Architecture & Features

- **Next.js 15 App Router & Server Actions:** Zero-API-boilerplate server actions for high-performance data mutations and lead capture.
- **Server-Side Rendered (SSR) & Dynamic Revalidation:** Complete HTML rendered on the server for Google search bots; edits made in the admin panel go live in seconds via `revalidatePath()`.
- **CRM Lead Pipeline:** Captures leads with spam honeypot, phone/email validation, and UTM parameter tracking. Admin dashboard offers a 6-stage pipeline (`NEW` → `CONTACTED` → `QUALIFIED` → `PROPOSAL_SENT` → `WON` → `LOST`), internal notes timeline, and one-click CSV export.
- **Team Section (Part B):** Fully database-driven "Meet Our Expertise" section with `Person` JSON-LD schema, role descriptions, bio modal dialogs, and initial avatar fallbacks.
- **Visual Design System (Part A):** Dark/Light mode support, CSS variable design tokens, Space Grotesk & Inter typography with `font-display: swap`, responsive mobile menu, and floating WhatsApp contact widget.
- **Ethical Integrity:** Fictitious client logos and unverified statistical claims have been purged; all client metrics require CMS verification (documented in `TODO_CONTENT.md`).

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js v18.17+ or v20+ (tested on Node v24)
- npm or pnpm

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/ksdigital.git
cd ksdigital
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
DATABASE_URL="postgresql://username:password@host/ksdigital?sslmode=require"
NEXTAUTH_SECRET="your-32-char-random-secret"
ADMIN_EMAIL="sawantketan87@gmail.com"
ADMIN_PASSWORD="AdminKS2026!Secure"
ADMIN_NAME="Ketan Sawant"
NEXT_PUBLIC_SITE_URL="https://ksdigital.co.in"
```

### 3. Generate Prisma Client & Push Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 4. Seed Initial Content & Super Admin
Populate the database with all services, team members, default pricing plans, FAQs, and create your first Super Admin user:
```bash
npm run db:seed
```

### 5. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
Open **[http://localhost:3000/admin](http://localhost:3000/admin)** to access the CRM & CMS.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), import your `ksdigital` repository.
3. Under **Environment Variables**, add:
   - `DATABASE_URL`: Connection string from Neon Postgres or Supabase.
   - `NEXTAUTH_SECRET`: Random 32+ character string.
   - `ADMIN_EMAIL`: `sawantketan87@gmail.com`
   - `ADMIN_PASSWORD`: Your chosen secure master password.
   - `NEXT_PUBLIC_SITE_URL`: `https://ksdigital.co.in`
   - `RESEND_API_KEY`: (Optional) Your Resend API key for instant lead email notifications.
4. Click **Deploy**. Vercel will automatically build the Next.js App Router project and deploy it with edge capabilities.

---

## 🔑 Creating and Managing Admins

The seed script (`prisma/seed.ts`) reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` from your environment to automatically register the initial `SUPER_ADMIN`. Passwords are encrypted using standard `bcrypt` hashing before storage.

To re-seed or create a new admin on a remote database:
```bash
DATABASE_URL="your-remote-connection-string" npm run db:seed
```

---

## 💾 Backing Up the Database

### PostgreSQL (Neon / Supabase)
To take a complete snapshot of all CRM leads, team bios, pricing tiers, and site settings:

```bash
# Using pg_dump
pg_dump "postgresql://user:pass@host/db?sslmode=require" -F c -b -v -f "ksdigital-backup-$(date +%F).dump"
```

### Restoring from Backup
```bash
pg_restore -d "postgresql://user:pass@host/db?sslmode=require" -v "ksdigital-backup-YYYY-MM-DD.dump"
```

Additionally, leads can be exported on-demand directly from the browser at `/api/leads/export` (or via the **Export Leads CSV** button inside the Admin portal).

---

## 📁 Repository Structure

```
ksdigital/
├── prisma/
│   ├── schema.prisma        # Complete database model (Users, Leads, Team, Services, Pricing)
│   └── seed.ts              # Seed script for initial team, services, and Super Admin
├── public/
│   ├── images/              # Optimized brand visuals
│   └── team/                # Optional headshot image directory
├── src/
│   ├── app/
│   │   ├── (public)/        # SSR routes: /, /about-us, /services, /pricing, /blog, /contact-us
│   │   │   ├── [service]/   # Dedicated SEO landing pages (/seo-services, /performance-marketing, etc.)
│   │   │   └── blog/[slug]/ # Dynamic blog posts with BlogPosting JSON-LD
│   │   ├── admin/           # Secure CRM and CMS dashboard (/admin/leads, /admin/team, etc.)
│   │   ├── api/             # API routes (CSV export, etc.)
│   │   ├── actions/         # Next.js Server Actions (lead submission, admin CRUD)
│   │   ├── sitemap.ts       # Dynamic search engine sitemap
│   │   └── robots.ts        # Dynamic crawler directives (blocking /admin)
│   ├── components/          # Reusable UI tokens (Header, Footer, TeamCard, ContactForm, etc.)
│   └── lib/                 # Prisma singleton, resilient data fallback, JWT auth session
├── ADMIN_GUIDE.md           # End-user guide for content editing and lead handling
├── TODO_CONTENT.md          # Verification checklist for client assets and proof metrics
├── PLAN.md                  # Phase-by-phase architectural roadmap
└── README.md                # Project documentation
```
