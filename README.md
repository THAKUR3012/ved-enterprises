# Ved Enterprises — Professional Full-Stack Home Appliance Repair & Servicing Platform

A modern, fast, trustworthy, and conversion-focused full-stack web application built for **Ved Enterprises**, specialized in doorstep home appliance repair, servicing, and installation.

---

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Route Handlers)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Database & ORM:** MySQL 8 + [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
* **Validation:** [Zod](https://zod.dev/)
* **Containerization & Proxy:** [Docker](https://www.docker.com/), Docker Compose & [Nginx](https://nginx.org/) with Cloudflare Real-IP support

---

## 🎨 Visual Identity & Color Palette

* **Primary Trust Blue (`#0F2C59`, `#091A36`):** Communicates security, stability, and professional engineering.
* **Action Accent Orange (`#EA580C`, `#C2410C`):** Drives click-throughs, urgent calls, WhatsApp inquiries, and bookings.
* **Neutrals:** Crisp White, Clean Slate Gray (`#F8FAFC`), and Charcoal (`#0F172A`).

---

## 📁 Project Architecture

```text
ved-enterprises/
├── app/
│   ├── api/
│   │   └── bookings/
│   │       └── route.ts         # Zod validation & booking generation
│   ├── globals.css              # Theme CSS variables & utilities
│   ├── layout.tsx               # Root layout with Header, Footer & Floating CTAs
│   └── page.tsx                 # Complete 12-section conversion homepage
├── components/
│   ├── home/
│   │   ├── AboutSection.tsx      # Company story & customizable stats
│   │   ├── BookingSection.tsx    # Interactive repair booking form & confirmation
│   │   ├── ContactSection.tsx    # Phone, WhatsApp & Emergency hotline cards
│   │   ├── FeaturedServices.tsx  # Deep-dive interactive service tabs
│   │   ├── GallerySection.tsx    # Work portfolio with category filters & lightbox
│   │   ├── HeroSection.tsx       # 2-column hero with floating trust badges
│   │   ├── HowItWorks.tsx        # 4-step repair process cards
│   │   ├── ServiceAreasSection.tsx # Neighborhood search & active zones
│   │   ├── ServicesSection.tsx   # 8-service card grid with starting prices
│   │   ├── TestimonialsSection.tsx # Customer reviews with ratings
│   │   ├── TrustBar.tsx          # 4-pillar trust badge strip
│   │   └── WhyChooseUs.tsx       # 6-benefit split layout
│   ├── layout/
│   │   ├── FloatingContactButtons.tsx # Desktop floating Call & WhatsApp
│   │   ├── Footer.tsx            # Multi-column footer with services & links
│   │   ├── Header.tsx            # Sticky desktop nav & mobile drawer
│   │   └── MobileConversionBar.tsx # Mobile fixed Call | WhatsApp | Book bar
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── db/
│   ├── index.ts                 # MySQL pool & Drizzle ORM client
│   └── schema.ts                # Drizzle schema (bookings, services, users, etc.)
├── lib/
│   ├── constants.ts             # Editable business constants & services data
│   ├── utils.ts                 # cn, formatPrice, WhatsApp & Tel helpers
│   └── validations/
│       └── booking.ts           # Zod schema for bookings
├── nginx/
│   └── default.conf             # Production Nginx reverse proxy config
├── public/
│   ├── images/
│   │   ├── gallery/             # Gallery portfolio images
│   │   ├── hero/                # Technician hero photography
│   │   ├── services/            # Appliance service images
│   │   └── logo.svg             # Ved Enterprises brand logo
├── docker-compose.yml           # MySQL 8, Next.js & Nginx orchestration
├── Dockerfile                   # Multi-stage production container build
├── drizzle.config.ts            # Drizzle Kit configuration
└── .env.example                 # Environment variables template
```

---

## ⚡ Quick Start

### 1. Local Development

```bash
# Clone or navigate to the directory
cd ved-enterprises

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Production Docker Deployment

To launch the complete production stack (Next.js + MySQL 8 + Nginx):

```bash
docker compose up -d --build
```

The app will be accessible at:
* **Web (via Nginx):** `http://localhost` (or your domain with Cloudflare SSL)
* **MySQL 8 Database:** `localhost:3306`

---

### 3. Database Migrations (Drizzle Kit)

```bash
# Generate migration SQL files
npx drizzle-kit generate

# Push migrations directly to MySQL
npx drizzle-kit push
```

---

## 📞 Key Business Inquiries & Actions

* **Direct Phone:** Configurable via `NEXT_PUBLIC_CONTACT_PHONE` and `lib/constants.ts`
* **WhatsApp Chat:** Pre-filled dynamic inquiries linking straight to WhatsApp Web / Mobile
* **Online Booking:** Instant Zod-validated submission with unique reference IDs (`VE-XXXXXX`)
