# KS Digital — Content Action Items & Verification Checklist

This document tracks all content, assets, credentials, and metrics that require client verification or asset provision. In accordance with strict ethical and anti-hallucination standards, all unverified claims and fake placeholder logos have been removed or placed behind toggle switches in the Admin CMS.

---

## 1. Team Headshots & Bios

| Team Member | Role | Photo Status | Bio Status | Action Needed |
|---|---|---|---|---|
| **Ketan Sawant** | Founder | ⚠️ Not in repo (rendered on live site) | ✅ Extracted from live site & preserved | Upload high-resolution photo (`/public/team/ketan-sawant.jpg` or via `/admin/team`) |
| **Saumil Shah** | Senior SEO Advisor | ⚠️ Not in repo (rendered on live site) | ✅ Extracted from live site screenshot & preserved | Upload high-resolution photo (`/public/team/saumil-shah.jpg` or via `/admin/team`) |
| **Praneeth Yamsani** | Programmatic Ads Expert | ⚠️ Not in repo (rendered on live site) | ✅ Extracted from live site screenshot & preserved | Upload high-resolution photo (`/public/team/praneeth-yamsani.jpg` or via `/admin/team`) |
| **Prajwal Thombare** | Sr Web Developer | ⚠️ Not in repo (rendered on live site) | ✅ Extracted from live site & preserved | Upload high-resolution photo (`/public/team/prajwal-thombare.jpg` or via `/admin/team`) |
| **Tanisha Shah** | Chief Finance Officer (CFO) | ❌ None provided | ⚠️ Neutral placeholder line: *"Chief Finance Officer, KS Digital"* | Provide official executive headshot and approved bio narrative |

*Note: In the visual redesign, team members without uploaded photo files display a tasteful CSS glassmorphism initials avatar badge with glow effects matching their role.*

---

## 2. Removed Unverified Claims & Placeholder Logos

The following unverified elements were identified in the legacy codebase and have been **removed from public display** to protect agency reputation and compliance:

- ❌ **Fake client logos**: `AuraMedia`, `ApexGrow`, `OptimaScale`, `VortexLabs`, `NovaSEO` (these were generic SVG icons with fictitious agency names).
- ❌ **Unverified metrics**: *"98.6% Success Rate"*, *"3X Super Growth"*, *"150+ Clients"*.
- ❌ **Empty placeholders**: Legacy text `"No content is added yet"` and `"John Doe"` on contact/about pages.

### Action Needed:
To display real client logos or real statistics, navigate to `/admin/settings` or `/admin/testimonials` and upload verified partner logos and audit-backed metrics. The public site will only render proof sections once verified data is saved.

---

## 3. Database & Deployment Credentials

To run the live production database and email automation:

1. **Neon PostgreSQL Database**:
   - Create a free project at [Neon.tech](https://neon.tech)
   - Copy the connection string (with `?sslmode=require`)
   - Add to Vercel Environment Variables as `DATABASE_URL`
   - Run `npx prisma db push` followed by `npm run db:seed`

2. **Resend Email API (Optional)**:
   - Create an account at [Resend.com](https://resend.com)
   - Add your API key to `RESEND_API_KEY`
   - Set `NOTIFICATION_EMAIL` to your destination inbox (`sawantketan87@gmail.com`)
   - *Note: If Resend is omitted, leads are still securely stored and managed in the CRM dashboard at `/admin/leads`.*

3. **Domain & Search Console**:
   - Primary canonical domain is configured as `https://ksdigital.co.in` (customizable in Site Settings).
   - Enter your GA4 Measurement ID (`G-XXXXXXXXXX`) and Google Search Console verification token in `/admin/settings`.
