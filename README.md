# KS Digital — Official Website

> A modern, fully responsive digital marketing agency website built with **Vite + Vanilla JS**, featuring dark/light mode, animated particle backgrounds, Web3Forms integration, and a premium glassmorphism design system.

---

## 🌐 Live Pages

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about-us/` |
| Services | `/services/` |
| Pricing | `/pricing/` |
| Contact Us | `/contact-us/` |

---

## ✨ Features

- ⚡ **Vite-powered** build system for fast development and optimized production bundles
- 🌑 **Dark / Light mode** toggle with smooth transitions and `localStorage` persistence (no flash on reload)
- 🎨 **Glassmorphism design system** — frosted-glass cards, neon glow effects, gradient text
- 🌌 **Animated particle/mesh background** rendered on a `<canvas>` element across all pages
- 📱 **Fully responsive** — Desktop (1024px+), Tablet (768–1023px), Mobile (320–767px)
- 🍔 **Hamburger menu** with animated X toggle and smooth slide-in navigation on mobile/tablet
- 📬 **Web3Forms integration** — real email delivery from contact forms, no backend required
- ✅ **Client-side form validation** — email format check + 10-digit phone number enforcement
- 🔢 **Animated stat counters** triggered on scroll using IntersectionObserver
- 🎞️ **Scroll-based fade-in animations** for all sections
- ♿ **Accessibility** — all interactive elements meet minimum 44px touch targets, semantic HTML, ARIA labels
- 🔍 **SEO optimised** — unique `<title>` and `<meta description>` on every page

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure & semantic markup |
| Vanilla CSS | Styling, animations, responsive layout |
| Vanilla JavaScript (ES Modules) | Interactivity, animations, form logic |
| [Vite 8](https://vite.dev) | Dev server, hot reload, production build |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Typography (Google Fonts) |
| [Font Awesome 6](https://fontawesome.com) | Icons |
| [Web3Forms](https://web3forms.com) | Serverless form-to-email submission |

---

## 📁 Project Structure

```
Ksdigital/
├── index.html              # Home page
├── about-us/
│   └── index.html          # About Us page
├── services/
│   └── index.html          # Services page
├── pricing/
│   └── index.html          # Pricing page
├── contact-us/
│   └── index.html          # Contact Us page
├── css/
│   └── style.css           # Global design system + all styles
├── js/
│   └── main.js             # All JavaScript (navbar, animations, forms)
├── public/                 # Static assets served as-is
├── dist/                   # Production build output (git-ignored)
├── node_modules/           # Dependencies (git-ignored)
├── vite.config.js          # Vite multi-page build configuration
├── package.json            # Project metadata & npm scripts
├── .gitignore              # Git exclusions
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ksdigital.git
cd ksdigital
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser at **http://localhost:5173** — Vite hot-reloads on every file save.

### 4. Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder, ready to deploy.

### 5. Preview Production Build Locally

```bash
npm run preview
```

---

## 📬 Web3Forms Setup (Contact Form)

All contact forms submit to your email inbox via [Web3Forms](https://web3forms.com) — **no backend or database required**.

### Steps to activate:

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address → receive your free **Access Key**
3. Open `contact-us/index.html` and `pricing/index.html`
4. Find this line in each file:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
5. Replace `YOUR_ACCESS_KEY_HERE` with your actual key
6. Save and deploy — submissions will arrive in your inbox instantly

### Form Validation Rules

| Field | Rule |
|---|---|
| First Name, Last Name | Required |
| Email | Required + valid format (`user@domain.com`) |
| Phone | Required + exactly 10 digits |
| Message | Required |

---

## 🎨 Design System

### Color Palette (Dark Mode)

| Token | Value | Usage |
|---|---|---|
| `--bg-dark` | `#0A0A0F` | Page background |
| `--accent-blue` | `#00C2FF` | Primary accent, icons, borders |
| `--accent-violet` | `#7B2FFF` | Buttons, highlights, gradients |
| `--text-primary` | `#F3F4F6` | Headings, body text |
| `--text-muted` | `#9CA3AF` | Secondary text, descriptions |

### Color Palette (Light Mode)

| Token | Value | Usage |
|---|---|---|
| `--bg-dark` | `#F8F9FF` | Page background |
| `--accent-blue` | `#0070E0` | Primary accent |
| `--accent-violet` | `#6A1FE0` | Buttons, highlights |
| `--text-primary` | `#0A0A1A` | Headings, body text |

### Responsive Breakpoints

| Breakpoint | Range | Layout |
|---|---|---|
| Desktop | 1024px+ | Full multi-column layouts, horizontal navbar |
| Tablet | 768px – 1023px | 2-column grids, hamburger menu |
| Mobile | 320px – 767px | Single column, full-width elements, stacked CTAs |

---

## 🧩 JavaScript Modules (`js/main.js`)

| Function | Description |
|---|---|
| `initParticles()` | Animated canvas particle background |
| `initNavbarScroll()` | Frosted-glass effect on scroll |
| `initMobileMenu()` | Hamburger toggle with X animation |
| `initActiveLinks()` | Highlights current page nav link |
| `initScrollAnimations()` | Fade-in sections on scroll (IntersectionObserver) |
| `initCounters()` | Animated number counters on scroll |
| `initAccordions()` | FAQ expand/collapse accordion |
| `initThemeToggle()` | Dark/light mode switcher with localStorage |
| `initContactForms()` | Web3Forms submission + validation + feedback banners |

---

## 📦 npm Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Build optimised production files to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 🙈 Git Ignored Files

The `.gitignore` excludes:

- `node_modules/` — reinstall with `npm install`
- `dist/` — regenerate with `npm run build`
- `.env*` — environment variables and secrets
- `.DS_Store`, `Thumbs.db` — OS system files
- `.vscode/`, `.idea/` — editor preferences
- `*.log` — runtime log files

---

## 📄 License

This project is proprietary and owned by **KS Digital**.  
All rights reserved © 2025 KS Digital.

---

## 📞 Contact

**KS Digital — Performance Marketing Agency**  
📧 Email: [ksdigitalmarketing@gmail.com](mailto:ksdigitalmarketing@gmail.com)  
📞 Phone: +91 7276503159  
🌐 Website: [www.ksdigital.in](https://www.ksdigital.in)
