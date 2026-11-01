# KS Digital — Official Website & Admin CRM

> Modern, full-stack digital marketing agency platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**. Features a high-converting visual redesign, lightweight lead management CRM, dynamic database-backed CMS, and strict SEO/performance optimization.

- **Live URL:** [https://ksdigital.co.in](https://ksdigital.co.in) (and [https://ksdigital-ecru.vercel.app](https://ksdigital-ecru.vercel.app))
- **Admin Portal:** `/admin` (disallowed in robots.txt, excluded from sitemap)

---

## 🌟 Key Architecture & Features

- **Next.js 16 App Router & Server Actions:** Zero-API-boilerplate server actions for high-performance data mutations and lead capture.
- **Server-Side Rendered (SSR) & Dynamic Revalidation:** Complete HTML rendered on the server for Google search bots; edits made in the admin panel go live in seconds via `revalidatePath()`.
- **CRM Lead Pipeline:** Captures leads with spam honeypot, phone/email validation, and UTM parameter tracking. Admin dashboard offers a 6-stage pipeline (`NEW` → `CONTACTED` → `QUALIFIED` → `PROPOSAL_SENT` → `WON` → `LOST`), internal notes timeline, and one-click CSV export.
- **Team Section (Part B):** Fully database-driven "Meet Our Expertise" section with `Person` JSON-LD schema, role descriptions, bio modal dialogs, and initial avatar fallbacks.
- **Visual Design System (Part A):** Dark/Light mode support, CSS variable design tokens, Space Grotesk & Inter typography with `font-display: swap`, responsive mobile menu, and floating WhatsApp contact widget.
- **Ethical Integrity:** Fictitious client logos and unverified statistical claims have been purged; all client metrics require CMS verification (documented in `TODO_CONTENT.md`).

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 20.9 or newer (required by Next.js 16)
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
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
NEXTAUTH_SECRET="your-32-char-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="replace-with-a-unique-strong-password"
ADMIN_NAME="Site Administrator"
NEXT_PUBLIC_SITE_URL="https://ksdigital.co.in"
```

Use the MySQL connection URL supplied by your database provider. URL-encode special characters in the username or password. Never commit your real `.env` file or credentials.

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

1. Provision a reachable MySQL database and make a backup if it already contains data.
2. Push your repository to GitHub and import it in the [Vercel Dashboard](https://vercel.com/new).
3. Add these **Environment Variables** in Vercel for Production (and Preview if needed):
   - `DATABASE_URL`: The MySQL connection URL from your database provider.
   - `NEXTAUTH_SECRET`: A unique random secret of at least 32 characters.
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: Credentials for the initial super admin. Use a unique, strong password.
   - `ADMIN_NAME`: The name shown for the initial super admin.
   - `NEXT_PUBLIC_SITE_URL`: Your canonical public URL, such as `https://ksdigital.co.in`.
   - `RESEND_API_KEY`: Optional; needed for lead email notifications.
4. Ensure the MySQL schema is created before using the app. For a new database, set `DATABASE_URL` locally to the production database and run `npx prisma db push`. Back up existing data and review any schema changes before running this against a database with data.
5. Seed the initial admin and site content once by running `npm run db:seed` with the production `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` configured. Do not put database credentials in source control.
6. Deploy from Vercel. The configured build command runs `prisma generate && next build`; deployment requires the Vercel environment variables above. If you change Vercel variables, redeploy to apply them.

---

## 🔑 Creating and Managing Admins

The seed script (`prisma/seed.ts`) reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` from your environment to automatically register the initial `SUPER_ADMIN`. Passwords are encrypted using standard `bcrypt` hashing before storage.

To seed a remote database, configure the required environment variables locally and run:
```bash
npm run db:seed
```

---

## 💾 Backing Up the Database

### MySQL
To take a complete snapshot of all CRM leads, team bios, pricing tiers, and site settings:

```bash
# Replace HOST, USER, and DATABASE with values for your MySQL server.
mysqldump --single-transaction --routines --triggers -h HOST -u USER -p DATABASE > ksdigital-backup.sql
```

### Restoring from Backup
```bash
mysql -h HOST -u USER -p DATABASE < ksdigital-backup.sql
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
