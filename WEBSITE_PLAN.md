# Sri Krishna Labels — Website Plan

> A professional company website to showcase products, build trust, and attract clients.

---

## 🎯 Goal

Build a modern, professional, and trust-building website for **Sri Krishna Labels**, a garment labels & tags manufacturing company. The site will showcase their products, services, and company values to attract clients and establish credibility.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** (App Router) | React framework with SSR support |
| **TypeScript** | Type-safe code |
| **Tailwind CSS** | Utility-first responsive styling |
| **Framer Motion** | Smooth scroll & entrance animations |
| **Lucide React** | Clean, consistent icon set |
| **Inter Font** | Professional, clean typography |

---

## 🎨 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | 🟦 Navy | `#1B2A4A` | Headers, nav, footer, CTA buttons |
| Secondary | 🟨 Gold | `#C5961A` | Accents, highlights, borders |
| Light Gold | 🟡 Soft Gold | `#F5E6C8` | Subtle backgrounds, badges |
| White | ⬜ White | `#FFFFFF` | Card backgrounds, body |
| Light Gray | 🔲 Light Gray | `#F8F9FA` | Alternating section backgrounds |
| Dark Text | ⬛ Dark | `#1A1A2E` | Body text |
| Muted Text | 🔘 Muted | `#6B7280` | Secondary text |

**Design Principles:** Clean whitespace, strong typography hierarchy, subtle gold accents to convey premium quality.

---

## 📄 Pages & Sections

### 1. 🏠 Home Page (`/`)

| Section | Description |
|---------|-------------|
| **Navigation** | Sticky header with logo (text-based for now), nav links, "Get a Quote" CTA button |
| **Hero Banner** | Full-width hero with bold headline, subtext, and CTA. Navy gradient background |
| **Key Highlights** | 4 animated stat cards ("7+ Years in Field", "25+ Clients", "10M+ Labels", "100% On-Time Delivery") |
| **Product Showcase** | Grid preview of top product categories with images |
| **Why Choose Us (Brief)** | 3–4 icon cards — Quality, Delivery, Custom Design, Pricing |
| **CTA Banner** | Full-width strip: "Ready to elevate your brand?" |
| **Footer** | Company info, quick links, contact details, social icons |

---

### 2. 📖 About Us (`/about`)

| Section | Description |
|---------|-------------|
| **Company Story** | Brief history, founding year, industry experience |
| **Mission & Vision** | Clear statements with icon accents |
| **Our Values** | Grid of core values — Quality, Innovation, Reliability, Customer Focus |
| **Team / Leadership** | Placeholder section for team members (optional) |

---

### 3. 🏷 Products & Services (`/products`)

| Section | Description |
|---------|-------------|
| **Page Header** | Title + brief introduction |
| **Product Grid** | Card layout for each product category |
| **Card Details** | Image, name, description, "Enquire" CTA |

**Product categories to feature:**

| # | Product | Description |
|---|---------|-------------|
| 1 | Satin Labels | Smooth, premium feel for high-end garments |
| 2 | Cotton Tape Labels | Soft, skin-friendly labels for comfort wear |
| 3 | Polyester Tape Labels | Durable, long-lasting labels for all garment types |
| 4 | Multi Colour Rotary Printed | Vibrant, full-color printed labels |
| 5 | Care / Wash Care Labels | Essential garment care instruction labels |
| 6 | Custom / Specialty Labels | Bespoke labels tailored to unique needs |

---

### 4. ⭐ Why Choose Us (`/why-us`)

| Section | Description |
|---------|-------------|
| **Differentiators** | Detailed cards — Quality Control, Modern Machinery, Custom Design, Fast Turnaround, Competitive Pricing, Eco-Friendly Options |
| **Our Process** | Visual step-by-step: Consultation → Design → Production → Quality Check → Delivery |
| **Certifications** | Placeholder for quality certifications & standards |

---

### 5. 📞 Contact Us (`/contact`)

| Section | Description |
|---------|-------------|
| **Contact Form** | Fields: Name, Email, Phone, Company, Message, Product Interest dropdown |
| **Contact Details** | Phone, Email, Address with icons |
| **Embedded Map** | Google Maps embed (placeholder location) |
| **Business Hours** | Operating hours display |

---

## 📁 Project Structure

```
sri-krishna-labels/
├── public/
│   └── images/                  # Placeholder product & hero images
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (nav + footer)
│   │   ├── page.tsx             # Home page
│   │   ├── about/page.tsx       # About Us
│   │   ├── products/page.tsx    # Products & Services
│   │   ├── why-us/page.tsx      # Why Choose Us
│   │   ├── contact/page.tsx     # Contact Us
│   │   └── globals.css          # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Sticky navigation bar
│   │   │   └── Footer.tsx       # Site-wide footer
│   │   ├── home/
│   │   │   ├── Hero.tsx         # Hero banner section
│   │   │   ├── Highlights.tsx   # Stats/highlights cards
│   │   │   ├── ProductShowcase.tsx
│   │   │   ├── WhyChooseBrief.tsx
│   │   │   └── CTABanner.tsx
│   │   ├── about/
│   │   │   ├── CompanyStory.tsx
│   │   │   ├── MissionVision.tsx
│   │   │   └── Values.tsx
│   │   ├── products/
│   │   │   └── ProductCard.tsx
│   │   ├── why-us/
│   │   │   ├── Differentiators.tsx
│   │   │   └── ProcessSteps.tsx
│   │   ├── contact/
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── Button.tsx       # Reusable button component
│   │       ├── SectionHeader.tsx
│   │       └── AnimatedSection.tsx
│   └── lib/
│       └── constants.ts         # Company data, product list, colors
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| **Desktop** (1024px+) | Full multi-column layouts, large hero |
| **Tablet** (768px–1023px) | 2-column product grids, adjusted spacing |
| **Mobile** (<768px) | Single-column, hamburger nav, touch-friendly CTAs |

---

## ✅ Key Features

- ✅ Fully responsive across all devices
- ✅ Smooth scroll animations on section entry (Framer Motion)
- ✅ SEO-optimized with proper meta tags & Open Graph
- ✅ Fast loading with Next.js image & code optimizations
- ✅ Accessible (semantic HTML, ARIA labels, keyboard navigation)
- ✅ Contact form with client-side validation
- ✅ Professional placeholder content — ready to swap with real data
- ✅ Text-based logo (swappable when professional logo is ready)

---

## ❓ Open Questions (To Fill In)

| Question | Your Answer |
|----------|-------------|
| Company address? | 35/4, Geetha Complex, Near Dheivam Theatre, Subash School Road, Murugampalayam, Tirupur - 641 687 |
| Phone number? | Mr. Manimaran: +91 70106 58326 / Mr. Chiranjeevi: +91 76038 05054 |
| Email address? | srikrishnalabels19@gmail.com |
| GSTIN? | 33DUBPM6359A1ZV |
| Years in business? | 7+ Years in Field |
| Preferred tagline? | "Crafting Quality Labels for the Garment Industry" |
| Any notable clients or milestones? | 25+ Clients, 10M+ Labels Delivered |

> 💡 **Tip:** Fill in the answers above and I can update the website content accordingly. Placeholders will be used in the meantime.

---

## 🚀 Next Steps

1. **Review** this plan and suggest any changes
2. **Approve** to start building
3. **Provide** company details / images whenever ready (can be done later)
4. **Launch** — the site will be ready to deploy!
