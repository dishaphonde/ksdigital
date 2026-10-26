# KS Digital — Admin & CRM User Guide

Welcome to the KS Digital Admin Panel and lightweight CRM. This portal allows you to manage inbound client inquiries, update team profiles, modify pricing packages, and adjust site settings without writing or editing any code.

---

## 1. Accessing the Admin Portal

- **URL:** Navigate to `/admin` (e.g., `https://ksdigital.co.in/admin` or `http://localhost:3000/admin`)
- **Credentials:**
  - **Email:** `sawantketan87@gmail.com` (or the value set in your `ADMIN_EMAIL` environment variable)
  - **Password:** Provided in your `.env` configuration (default seed: `AdminKS2026!Secure`)
- **Security:** The admin portal is protected by HTTP-only secure session cookies, excluded from the search engine sitemap, and blocked in `robots.txt`.

---

## 2. Managing Inbound Leads (CRM)

All inquiries submitted through the public website's "Book a Strategy Call" or contact forms appear in real time in your CRM dashboard:

1. **Viewing Leads:** Click **CRM Leads** in the sidebar. You will see a table displaying contact name, email, phone number, company, service requested, budget range, and timestamp.
2. **Updating Lead Pipeline Status:**
   - Click **Details** next to any lead.
   - Use the **Pipeline Status** dropdown to transition leads through the stages:
     - `NEW` (default upon submission)
     - `CONTACTED` (first email/call completed)
     - `QUALIFIED` (budget & project scope confirmed)
     - `PROPOSAL_SENT` (quotation or deck delivered)
     - `WON` (deal signed / client active)
     - `LOST` (closed / non-responsive)
   - Click **Update** to save the new stage.
3. **Internal Activity & Notes:**
   - In the right-hand panel of any lead's detail page, write meeting notes, phone call logs, or follow-up tasks.
   - Click **Add Note** to append a permanent, timestamped record to the client's history.
4. **Quick Contact Triggers:**
   - One-click buttons allow you to initiate a **WhatsApp chat**, make a direct phone call, or open a pre-filled reply email to the lead.
5. **Exporting Leads:** Click **Export Leads CSV** at the top of the leads table to download an audit-ready `.csv` file for Excel or Google Sheets.

---

## 3. Managing the Team Section (CMS)

To update the "Meet Our Expertise" section on the About page and Home preview:

1. Click **Team Members** in the sidebar.
2. **Add a Member:**
   - Fill in **Full Name**, **Job Title / Role**, **Initials**, and paste the **Full Biography**.
   - If a headshot photo is ready, place it in `/public/team/` and enter the path (e.g., `/team/ketan-sawant.jpg`). If omitted, the site automatically generates an initials avatar with glow styling.
   - Enter their **LinkedIn URL** to display a clickable profile badge on their team card.
   - Click **Save Team Member**.
3. **Hide or Remove a Member:**
   - Toggle the **Visible on Website** checkbox or click the delete button.
   - The public website updates immediately via server revalidation.

---

## 4. Editing Pricing Packages

To adjust pricing tiers or feature inclusions:

1. Click **Pricing CMS** in the sidebar.
2. For each plan (Basic, Professional, Exclusive, Enterprise):
   - Update the **Price** (e.g., `₹10,000`, `₹15,000`, or `Custom`).
   - Edit the **Best For** recommendation to guide client tier selection.
   - Add, edit, or delete items in the **Features** box (one feature per line).
   - Check or uncheck **Highlight as Popular** to display the gradient "Most Popular" badge.
3. Click **Save Plan** to push changes live to `/pricing/`.

---

## 5. Updating Services & Core Copy

1. Click **Services CMS** in the sidebar.
2. Edit the **Summary Teaser**, **Detailed Approach Content**, and **Key Inclusions**.
3. Changes immediately propagate to `/services/` and the individual landing page (e.g. `/seo-services/`, `/performance-marketing/`).

---

## 6. Updating Site Settings & Contact Details

1. Click **Site Settings** in the sidebar.
2. Modify agency phone numbers, the WhatsApp chat target number, support email, or social media URLs (Instagram, LinkedIn).
3. Click **Save Settings** to update the global header, footer, and floating WhatsApp widget across all pages.
