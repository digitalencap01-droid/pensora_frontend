# 🌟 Aura — Autonomous AI Marketing Manager & Growth Co-pilot

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1.1-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br />

**Aura** is an intelligent, full-suite AI Marketing Co-pilot and Autonomous Growth Manager tailored for modern eCommerce brands, D2C retailers, and high-growth businesses. It orchestrates end-to-end marketing operations — from autonomous website scraping, competitor benchmarking, and strategy planning to real-time ad management, content generation, SEO auto-fixing, and full-lifecycle CRM lead management.

[Explore Features](#-key-features--modules) • [Live Demo](#-getting-started) • [Design System](#-design-system--luxury-aesthetic) • [Tech Stack](#-tech-stack) • [Installation](#-getting-started)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features & Modules](#-key-features--modules)
  - [1. Marketing Landing & Showcase](#1-marketing-landing--showcase)
  - [2. Intelligent Multi-Step Onboarding](#2-intelligent-multi-step-onboarding)
  - [3. Unified Command Center / Dashboard](#3-unified-command-center--dashboard)
  - [4. Customer Lifecycle CRM (Contacts)](#4-customer-lifecycle-crm-contacts)
  - [5. Discover & Market Intelligence](#5-discover--market-intelligence)
  - [6. Growth Plan & Roadmap](#6-growth-plan--roadmap)
  - [7. Autonomous Actions Engine](#7-autonomous-actions-engine)
  - [8. AI Content Studio](#8-ai-content-studio)
  - [9. Website Health & SEO Doctor](#9-website-health--seo-doctor)
  - [10. Multi-Channel Ads Manager](#10-multi-channel-ads-manager)
  - [11. Results & Growth Analytics](#11-results--growth-analytics)
  - [12. AI Strategy Recommendations](#12-ai-strategy-recommendations)
  - [13. Persistent AI Assistant Drawer](#13-persistent-ai-assistant-drawer)
  - [14. Multi-Workspace Architecture](#14-multi-workspace-architecture)
- [Design System & Luxury Aesthetic](#-design-system--luxury-aesthetic)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Development](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Configuration & Environment](#-configuration--environment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

Modern brand founders and marketing teams often juggle 5-10 disconnected tools (analytics, ad platforms, SEO auditors, copywriters, CRMs, and spreadsheets). **Aura** replaces the fragmentation with an autonomous AI marketing agent that:

1. **Scrapes & Understands**: Ingests your store URL, catalogs, competitors, and target audience.
2. **Plans & Prioritizes**: Formulates milestone-based growth roadmaps and prioritizes highest-ROI tasks.
3. **Executes & Coordinates**: Generates multi-channel ad copy, crafts social content, fixes technical SEO issues, and monitors ad spend with human-in-the-loop approvals.
4. **Tracks & Nurtures**: Manages leads across lifecycle stages (Lead $\rightarrow$ MQL $\rightarrow$ SQL $\rightarrow$ Customer) with automated lead scoring and consent tracking.

---

## ⚡ Key Features & Modules

### 1. Marketing Landing & Showcase
- **Hero & Value Proposition**: High-converting interactive hero banner with responsive layout, video demo showcase, and direct onboarding trigger.
- **Audit Scope & Capabilities**: Visual breakdown of scopes covered (SEO, Meta/Google Ads, Content Studio, Lifecycle CRM).
- **Interactive Autonomy Controls**: Slider demonstrating full autonomy vs. human-supervised co-pilot modes.
- **Smooth Inertia Scroll**: Built-in integration with [Lenis](https://lenis.darkroom.engineering/) for silky smooth page momentum.

### 2. Intelligent Multi-Step Onboarding
- **Automated URL Scraper Simulation**: Ingests store URLs, extracts brand identity, products, and categories.
- **Business Profile Customization**: Tailor industry, brand stage, target audience demographics, and brand tone.
- **Marketing Goal & Channel Selector**: Choose growth priorities (Traffic, Conversions, Brand Awareness, Retention) across channels (Google, Meta, WhatsApp, TikTok, Email).
- **Instant Plan Generator**: Produces a customized multi-week marketing strategy before entering the workspace.

### 3. Unified Command Center / Dashboard
- **Warm Peach & Plum Luxury UI**: High-end aesthetic with organic curves (`rounded-[28px]`), peach tinted cards (`#FFF8F5`), and deep plum gradients.
- **Compact Hero Banner**: Interactive brand health score with collapsible/hoverable metrics breakdown and positioned bot companion.
- **Live Marketing Journey Stage Tracker**: Visual 6-stage lifecycle stepper (*Understand $\rightarrow$ Research $\rightarrow$ Plan $\rightarrow$ Create $\rightarrow$ Launch $\rightarrow$ Improve*).
- **Next Best Action Widget**: Context-aware AI recommender with 1-click execution (`Let AI do it`).
- **Real-Time Active Task Monitor**: Live status tracker with pulsing indicators for active AI worker processes.

### 4. Customer Lifecycle CRM (Contacts)
- **15+ Attribute Contact Records**: Name, Email, Phone, Company, Job Title, Acquisition Source, Lifecycle Stage, Lead Score (0–100), Priority Level, Owner, Messaging Consent, and Custom Tags.
- **Lifecycle Stage Pipeline**: Track and filter contacts across `Lead`, `MQL`, `SQL`, and `Customer`.
- **Smart Lead Scoring & Segmentation**: Color-coded badges for Hot ($80+$), Warm ($40-79$), and Cold ($<40$) leads.
- **Sliding Contact Details Drawer**: In-depth side panel showing full profile attributes, communication consent, and stage stepper.
- **Floating Bulk Actions Bar**: Multi-select bulk tagging, bulk segment assignment, bulk archive, and deletion.
- **Manual Modals & CSV Importer**: Complete Add/Edit modals alongside CSV drag-and-drop parser with built-in template loader.

### 5. Discover & Market Intelligence
- **Competitor Benchmarking Matrix**: Compare traffic, domain authority, keyword count, and ad spend against key rivals.
- **Search Query & Keyword Opportunities**: Identify high-intent search terms your competitors are capturing.
- **Opportunity Impact Cards**: Quantified traffic and conversion potential for identified gaps.

### 6. Growth Plan & Roadmap
- **Timeline-Based Strategy Roadmap**: Week-by-week marketing tasks categorized into SEO, Paid Ads, Social, and Email.
- **Task Status Filtering**: Switch between `All`, `Pending`, `In Progress`, and `Completed`.
- **Priority Indicators**: Urgent, High, and Medium priority task indicators with instant execution actions.

### 7. Autonomous Actions Engine
- **Human-in-the-Loop Approvals**: Review drafts, ad creatives, and SEO changes before they go live.
- **1-Click Execution**: Approve and deploy actions with instant feedback animations.
- **Detailed Execution Logs**: History of completed actions with direct links to generated outputs.

### 8. AI Content Studio
- **Multi-Platform Copy Generator**: Pre-configured formats for Instagram, LinkedIn, Meta Ads, Email Newsletters, and WhatsApp broadcasts.
- **Live Feed Previewer**: Real-time visual previews of social media posts, headlines, body text, and hashtags.
- **Tone & Persona Adaptation**: Automatic alignment with brand voice guidelines set in workspace settings.

### 9. Website Health & SEO Doctor
- **Comprehensive Health Meter**: Overall website score based on performance, SEO, mobile responsiveness, and security.
- **Issue Diagnostics**: Detailed error logs (broken links, missing meta descriptions, slow page speed, image optimization).
- **1-Click Instant AI Fixes**: Trigger automated AI repairs with live progress states.

### 10. Multi-Channel Ads Manager
- **Cross-Platform Dashboard**: Unified view for Meta Ads, Google Search, and TikTok Campaigns.
- **Key Metrics Tracking**: Real-time monitoring of ROAS, Spend, Conversions, Impressions, and CPC.
- **Budget Control**: Fast budget adjustment sliders and status toggles (Active / Paused).

### 11. Results & Growth Analytics
- **Conversion Funnel Analytics**: Track user drop-off from Visitors $\rightarrow$ Product Views $\rightarrow$ Cart Adds $\rightarrow$ Completed Orders.
- **Traffic Attribution Breakdown**: Organic Search, Paid Social, Direct, Referral, and Email campaign metrics.
- **Financial Growth Metrics**: Real-time CAC (Customer Acquisition Cost) vs. LTV (Lifetime Value) comparison.

### 12. AI Strategy Recommendations
- **Impact vs. Effort Prioritization**: High impact / low effort opportunities ranked first.
- **Rationale & Evidence**: Clear explanations of why each recommendation was generated and projected returns.

### 13. Persistent AI Assistant Drawer
- **Omnipresent Floating Assistant**: Accessible from any screen via a floating button or global shortcut (`⌘ K`).
- **Pre-set Growth Prompts**: Quick prompt chips for common queries (*"What should I do today?"*, *"Why did traffic drop?"*, *"Create a social post"*).
- **Conversational Memory**: Retains conversational context tied to the active business workspace.

### 14. Multi-Workspace Architecture
- **Workspace Switcher**: Seamlessly switch between multiple brands or client stores.
- **Independent State & Settings**: Separate API connections, branding guidelines, analytics, and contact databases per workspace.

---

## 🎨 Design System & Luxury Aesthetic

The interface is built with the **Warm Peach & Plum Luxury Design System**, delivering a tactile, editorial, and approachable experience:

| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#FAF5F0` | Main application canvas background |
| **Sidebar / Warm Light**| `#FEF9F5` | Sidebar, header backdrop, and light panels |
| **Sub-Card Canvas** | `#FFF8F5` | Tinted inner cards, drawers, and highlights |
| **Borders & Dividers** | `#F3DEC8` | Soft organic borders and clean separators |
| **Primary Plum Gradient** | `#2B0847` $\rightarrow$ `#48115B` $\rightarrow$ `#801B48` | Main action buttons, active badges, and hero titles |
| **Terracotta Accent** | `#D94A2A` | Secondary badges, links, warnings, and focus rings |
| **Ruby Accent** | `#8C1F3D` | Metric badges, ad highlights, and icons |
| **Deep Plum Typography**| `#1E122C` | Primary headers, bold titles, and heavy weights |
| **Muted Slate/Plum Text**| `#6B5E77` | Subheadings, labels, secondary metadata |
| **Success Emerald** | `#F4FDF8` / `#059669` | Positive growth rates, hot leads, and approved states |

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [React 18.2](https://react.dev/) + [TypeScript 5.2](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite 5.1](https://vitejs.dev/) with Fast Refresh
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **State Management**: React Context API (`MarketingContext`) with local persistence and workspace switching
- **Routing**: [React Router v6.22](https://reactrouter.com/) (Protected layout routes + onboarding wizard routing)
- **Animations & Micro-interactions**: [Framer Motion 13.1](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis 1.3](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React 0.344](https://lucide.dev/)

---

## 📁 Project Directory Structure

```text
ai-marketing-manager/
├── public/                     # Static assets, SVG icons, and hero illustrations
│   ├── bot-head.png
│   ├── dashboard-sidebar-wave.png
│   └── ...
├── src/
│   ├── components/
│   │   ├── ai/                 # AI Assistant drawer, Action executor, Journey stepper
│   │   │   ├── AIAction.tsx
│   │   │   ├── AIAssistant.tsx
│   │   │   ├── AIRecommendation.tsx
│   │   │   ├── AIStatus.tsx
│   │   │   └── MarketingJourney.tsx
│   │   ├── dashboard/          # Dashboard sub-components
│   │   │   ├── ActiveTasks.tsx
│   │   │   └── NextBestAction.tsx
│   │   ├── discover/           # Competitor insight cards
│   │   │   └── InsightCard.tsx
│   │   ├── landing/            # Landing page sections
│   │   │   ├── LandingHero.tsx
│   │   │   ├── LandingNavbar.tsx
│   │   │   ├── LandingServices.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout shell, Sidebar, Header, MobileNav
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── WorkspaceSwitcher.tsx
│   │   ├── onboarding/         # Onboarding wizard steps
│   │   │   ├── OnboardingLayout.tsx
│   │   │   ├── WebsiteInput.tsx
│   │   │   ├── BusinessDetailsStep.tsx
│   │   │   └── ...
│   │   ├── plan/               # Growth plan components
│   │   │   └── PlanTask.tsx
│   │   └── ui/                 # Reusable atomic UI components
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── EmptyState.tsx
│   │       └── Modal.tsx
│   ├── context/
│   │   └── MarketingContext.tsx # Central application state & business logic
│   ├── pages/                  # Top-level page views
│   │   ├── Actions.tsx
│   │   ├── Ads.tsx
│   │   ├── Contacts.tsx        # CRM & Contact management
│   │   ├── Content.tsx         # AI Content Studio
│   │   ├── Dashboard.tsx       # Main Command Center
│   │   ├── Discover.tsx
│   │   ├── Landing.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Plan.tsx
│   │   ├── Recommendations.tsx
│   │   ├── Results.tsx
│   │   ├── Settings.tsx
│   │   ├── Signup.tsx
│   │   └── Website.tsx
│   ├── services/               # Mock APIs and simulation services
│   │   └── api.ts
│   ├── types/                  # TypeScript interface declarations
│   │   └── index.ts
│   ├── App.tsx                 # Root router configuration
│   ├── index.css               # Global styling, Tailwind directives, font imports
│   └── main.tsx                # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 Getting Started & Local Development

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm** (or `pnpm` / `yarn`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-marketing-manager.git
cd ai-marketing-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Once started, open your browser and navigate to `http://localhost:5173` to explore the application.

### 4. Build for Production

```bash
npm run build
```

The optimized static production bundle will be created inside the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type checking (`tsc`) and compiles the production build into `dist/`. |
| `npm run preview` | Spawns a local web server to preview the compiled `dist/` build. |

---

## ⚙️ Configuration & Environment

- **Tailwind Configuration** (`tailwind.config.js`): Custom colors, border-radii, shadows, and luxury animations can be extended in the theme section.
- **TypeScript Settings** (`tsconfig.json`): Configured for strict type safety and JSX transform.
- **Vite Configuration** (`vite.config.ts`): Pre-configured with the `@vitejs/plugin-react` plugin.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ for modern eCommerce & digital brands.</sub>
</div>
