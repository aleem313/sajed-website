# ENVIROMATE — Execution Plan

> **Source of Truth:** `Enviromate_Feature_Specification.md` (v1.0, February 2026)
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · Vercel
> **Domain:** www.enviromate.co.uk

---

## How to Read This Document

- Each **Phase** is a major workstream that can be planned as a sprint or milestone.
- Each **Sub-phase** is a logical grouping of related tasks within a phase.
- Each **checklist item** (`- [ ]`) is a discrete, implementable unit of work.
- **Edge cases** are called out inline with `⚠️ EDGE CASE:` markers.
- Phases are ordered by dependency — later phases build on earlier ones.
- Cross-references to the spec are noted as `[Spec §X.X]`.

---

## Phase Overview

| #   | Phase                              | Description                                                         | Dependencies     |
| --- | ---------------------------------- | ------------------------------------------------------------------- | ---------------- |
| 1   | Project Foundation & Design System | Folder structure, shared UI primitives, theming, layout shells      | None             |
| 2   | Static & Content Pages             | All informational pages (About, How It Works, Partners, Blog, etc.) | Phase 1          |
| 3   | Authentication System              | Sign up, sign in, password reset, session management, role model    | Phase 1          |
| 4   | Marketplace — Browse & Search      | Listings grid, search, filters, category routing, listing cards     | Phase 1, 2 (nav) |
| 5   | Listing Detail View                | Full listing page, image gallery, seller info, CTAs                 | Phase 4          |
| 6   | Post an Ad                         | Ad creation form, image upload, validation, category assignment     | Phase 3          |
| 7   | User Account Dashboard             | Profile settings, my listings, watched items, bump credits          | Phase 3, 6       |
| 8   | Watch / Save Items                 | Watchlist add/remove, guest prompts, dashboard integration          | Phase 4, 5, 7    |
| 9   | Messaging System                   | Buyer-seller direct messaging, inbox, conversation threads          | Phase 3, 5       |
| 10  | Subscription & Billing             | Stripe integration, plan tiers, upgrade/downgrade, billing portal   | Phase 3, 7       |
| 11  | Ad Bump System                     | Bump credits, monthly reset, apply bump to listings                 | Phase 7, 10      |
| 12  | Wholesaler Features                | Seller Hub, business profiles, restricted category access           | Phase 10, 6      |
| 13  | Notifications & Alerts             | In-app toasts, email notifications, notification centre             | Phase 3, 9       |
| 14  | Third-Party Integrations           | AnyVan delivery, AWS S3/CloudFront image pipeline                   | Phase 5, 6       |
| 15  | Admin Panel                        | User management, listing moderation, analytics, CMS                 | Phase 3–12       |
| 16  | Mobile Optimisation & Polish       | Responsive audit, touch UX, camera upload, GPS location             | Phase 1–14       |
| 17  | Testing, Security & Launch         | E2E tests, accessibility, GDPR, performance, deployment             | All phases       |

---

## Phase 1 — Project Foundation & Design System

> Goal: Establish the folder structure, shared primitives, theming, layout shells, and reusable UI components that every subsequent phase depends on.

### 1.1 Project Structure & Configuration

- [ ] Define and create the folder structure:
  ```
  src/
  ├── app/                    # Next.js App Router pages & layouts
  │   ├── (auth)/             # Auth route group (sign-up, sign-in)
  │   ├── (dashboard)/        # Protected dashboard route group
  │   ├── (admin)/            # Admin panel route group
  │   ├── marketplace/        # Marketplace pages
  │   ├── c/[category]/       # Category dynamic routes
  │   ├── post-ad/            # Post an ad page
  │   └── [static pages]/    # about-us, how-it-works, etc.
  ├── components/
  │   ├── ui/                 # Primitive UI components (Button, Input, Modal, etc.)
  │   ├── layout/             # Header, Footer, Navigation, Sidebar
  │   ├── marketplace/        # Listing cards, filters, search bar
  │   ├── auth/               # Auth forms, modals
  │   ├── dashboard/          # Dashboard widgets and sections
  │   └── admin/              # Admin panel components
  ├── lib/                    # Utilities, helpers, constants
  ├── hooks/                  # Custom React hooks
  ├── context/                # React context providers
  ├── types/                  # TypeScript type definitions
  ├── styles/                 # Additional CSS if needed
  └── data/                   # Static data, category definitions, plan configs
  ```
- [ ] Configure path aliases in `tsconfig.json` (verify `@/*` → `./src/*` is working)
- [ ] Set up environment variables structure (`.env.local`, `.env.example`)
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_CLOUDFRONT_URL`
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_S3_BUCKET`
  - `AWS_REGION` (eu-west-1)
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - `ANYVAN_API_KEY` (if applicable)
- [ ] Install and configure essential shared dependencies:
  - Database ORM (e.g., Prisma or Drizzle)
  - Authentication library (e.g., NextAuth.js / Auth.js)
  - Form handling (e.g., React Hook Form + Zod)
  - UI component primitives (e.g., Radix UI or Headless UI)
  - Icon library (e.g., Lucide React)
  - Date formatting (e.g., date-fns)
  - Email sending (e.g., Resend or Nodemailer)
- [ ] Configure ESLint rules and Prettier for consistent code formatting
- [ ] Set up Git hooks (husky + lint-staged) for pre-commit checks

### 1.2 Database Schema Design

- [ ] Design and create the database schema covering all entities:
  - **User** — id, firstName, lastName, email, passwordHash, postcode, occupation, accountType (FREE/PREMIUM/PREMIUM_PLUS/WHOLESALER), role (USER/ADMIN), businessName (nullable), businessType (nullable), createdAt, updatedAt, emailVerified
  - **Listing** — id, userId, title, description, price, listingType (FOR_SALE/FREE), category, location, postcode, status (ACTIVE/SOLD/EXPIRED/REMOVED), bumpedAt (nullable), createdAt, updatedAt
  - **ListingImage** — id, listingId, url, key (S3 key), order, width, height, createdAt
  - **WatchedItem** — id, userId, listingId, createdAt (composite unique: userId + listingId)
  - **Message** — id, conversationId, senderId, content, readAt (nullable), createdAt
  - **Conversation** — id, listingId, buyerId, sellerId, createdAt, updatedAt
  - **Subscription** — id, userId, plan, stripeCustomerId, stripeSubscriptionId, status (ACTIVE/CANCELLED/PAST_DUE), currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, createdAt, updatedAt
  - **AdBumpCredit** — id, userId, totalCredits, usedCredits, periodStart, periodEnd
  - **Notification** — id, userId, type, title, message, readAt (nullable), metadata (JSON), createdAt
  - **BlogPost** — id, title, slug, content, excerpt, coverImage, authorId, publishedAt (nullable), createdAt, updatedAt
  - **PressArticle** — id, title, url, source, publishedDate, coverImage, createdAt
  - **Partner** — id, name, logo, url, description, createdAt
  - **CommunityProject** — id, title, description, images, location, createdAt, updatedAt
- [ ] Create initial migration and seed script with test data
- [ ] Add database indexes for common query patterns:
  - Listings: category, status, bumpedAt, createdAt, userId, postcode
  - Users: email (unique), accountType
  - WatchedItems: userId, listingId
  - Messages: conversationId, createdAt
  - Conversations: buyerId, sellerId, listingId

> ⚠️ EDGE CASE: `postcode` must support all valid UK postcode formats (e.g., "SW1A 1AA", "M1 1AA", "B1 1BB"). Consider storing normalised (uppercase, trimmed) and display formats separately.

> ⚠️ EDGE CASE: `price` should be stored as integer pence (not float) to avoid floating-point precision issues. Display conversion happens at the UI layer.

### 1.3 Design System & Theming

- [ ] Define the colour palette in `globals.css` / Tailwind config:
  - Primary brand colour (Enviromate green — extract from brand assets)
  - Secondary colour
  - Neutral/gray scale
  - Success, warning, error, info semantic colours
  - Background and foreground variables (light and dark mode)
- [ ] Define typography scale:
  - Font family: Choose primary font (Geist or brand-appropriate alternative)
  - Heading sizes (h1–h6)
  - Body text, small text, caption
  - Font weights (regular, medium, semibold, bold)
- [ ] Define spacing and sizing tokens (consistent gap/padding/margin scale)
- [ ] Define border radius tokens (sm, md, lg, full/pill)
- [ ] Define shadow tokens (sm, md, lg for cards, modals, dropdowns)
- [ ] Define breakpoints (align with Tailwind defaults: sm 640, md 768, lg 1024, xl 1280)
- [ ] Create a dark/light mode toggle mechanism using CSS variables + Tailwind dark mode

### 1.4 Shared UI Components

- [ ] **Button** — variants: primary, secondary, outline, ghost, destructive; sizes: sm, md, lg; states: default, hover, active, disabled, loading
- [ ] **Input** — text, email, password, number; with label, placeholder, error message, helper text, disabled state
- [ ] **Textarea** — with character count, label, error state
- [ ] **Select / Dropdown** — single select with label, placeholder, options, error state
- [ ] **Checkbox** — with label, indeterminate state
- [ ] **Radio Group** — with labels, descriptions
- [ ] **Toggle / Switch** — on/off with label
- [ ] **Modal / Dialog** — overlay, close button, title, body, footer actions; trap focus; close on Escape and backdrop click
- [ ] **Toast / Notification** — success, error, warning, info variants; auto-dismiss with timer; stackable
- [ ] **Badge** — "For Sale", "Free", status badges, plan tier badges
- [ ] **Card** — generic card container with optional header, body, footer
- [ ] **Avatar** — user initials fallback, image support
- [ ] **Skeleton / Loading** — skeleton loaders for cards, text blocks, images
- [ ] **Breadcrumb** — dynamic breadcrumb trail (Home > Marketplace > Category)
- [ ] **Pagination** — page numbers, prev/next, configurable items-per-page
- [ ] **Tabs** — horizontal tab navigation for category filtering
- [ ] **Tooltip** — hover/focus triggered contextual info
- [ ] **Image component** — wrapper around Next.js Image with loading states, error fallback, aspect ratio enforcement
- [ ] **Price display** — component that formats pence to pounds, handles "Free" badge
- [ ] **Empty state** — illustration/icon + message + optional CTA for when lists are empty

> ⚠️ EDGE CASE: All interactive components must be keyboard-accessible (Tab, Enter, Space, Escape) and have appropriate ARIA attributes.

### 1.5 Layout Shells

- [ ] **Root layout** (`app/layout.tsx`) — HTML lang="en", font loading, metadata defaults, global providers (auth, theme, toast)
- [ ] **Public layout** — Header (navigation bar) + main content + Footer
- [ ] **Dashboard layout** — Header + sidebar navigation + main content area
- [ ] **Admin layout** — Admin header + admin sidebar + main content area
- [ ] **Auth layout** — Centred card layout for sign-in/sign-up pages (no full nav)

### 1.6 Navigation Bar [Spec §4.1]

- [ ] Create persistent top navigation bar present on all public pages
- [ ] **Logo** — Enviromate logo linking to `/`
- [ ] **Navigation links:**
  - "The Marketplace" → `/marketplace` (visible to all)
  - "Post a Free Ad" → `/post-ad` (visible to all; CTA button style)
- [ ] **Auth-conditional elements:**
  - **Guests see:** "Create an Account" → `/sign-up` | "Sign In" → opens sign-in modal
  - **Logged-in users see:** User avatar/name dropdown with links to Dashboard, My Listings, Messages, Settings, Sign Out
- [ ] **Mobile navigation:**
  - Hamburger menu icon on viewports < `md` breakpoint
  - Slide-out or dropdown mobile menu with all nav items
  - Close on link click, Escape key, or backdrop click
- [ ] Active link highlighting (current page indicator)

> ⚠️ EDGE CASE: "Post a Free Ad" must redirect unauthenticated users to `/sign-up` (or show sign-in modal) before proceeding to `/post-ad`. After auth, redirect back to `/post-ad`.

> ⚠️ EDGE CASE: Navigation must not cause layout shift on auth state change (reserve space for both guest and logged-in states).

### 1.7 Footer [Spec §4.7]

- [ ] Create footer component with all required links organised in columns:
  - **Marketplace column:** The Marketplace, Create an Account
  - **Company column:** Partners, How It Works, Our Mission, Community Projects
  - **Resources column:** Video, Contact Us, Our Blog, In the Press
  - **Legal column:** Terms, Privacy
- [ ] Social media links (if applicable — add placeholders)
- [ ] Copyright notice with current year
- [ ] Responsive layout: columns on desktop, stacked on mobile
- [ ] All links must point to correct URLs as defined in Appendix A

---

## Phase 2 — Static & Content Pages

> Goal: Build all informational/content pages that establish the brand and provide context. These pages have no complex interactivity but are important for SEO and user trust.

### 2.1 Homepage Shell [Spec §4]

- [ ] Create homepage route (`app/page.tsx`)
- [ ] **Hero section with search bar** [Spec §4.2]:
  - Keyword text input (placeholder: "Search for building materials...")
  - Location text input (placeholder: "Town, city, or postcode")
  - Distance dropdown: 5 miles, 25 miles, 50 miles, 100 miles, 100+ miles (default: 100+ miles)
  - Search submit button (icon + "Search")
  - On submit: navigate to `/marketplace?keyword=X&location=Y&distance=Z`
  - On Enter key press in any field: trigger search
- [ ] **Category navigation tabs** [Spec §4.3]:
  - Horizontal scrollable row of category links
  - Categories: Building, Plumbing, Carpentry, Electrical, Painting & Decorating, Tools, Free, Other, Wholesalers
  - Each links to `/c/[slug]`
  - Wholesalers tab shows a lock icon or "Premium+" badge
- [ ] **Recently added listings section** [Spec §4.4]:
  - Grid of latest listings (e.g., 8 or 12 cards)
  - Each card: thumbnail (460×250px), title, price or "Free" badge, watch button
  - "Visit the Marketplace" CTA button → `/marketplace`
  - Loading skeleton while data fetches
- [ ] **Statistics / mission section** [Spec §4.5]:
  - 4 infographic tiles with UK construction waste statistics
  - Content from Enviromate brand copy (420M tonnes stat, etc.)
  - Responsive grid: 4 columns desktop, 2 columns tablet, 1 column mobile
- [ ] **Pricing / packages section** [Spec §4.6]:
  - 4 subscription tier cards side-by-side
  - Each card: plan name, price, feature bullet list, CTA button
  - Free: "Get Started" → `/sign-up?plan=free`
  - Premium: "Subscribe" → `/sign-up?plan=premium`
  - Premium+: "Subscribe" → `/sign-up?plan=premium-plus`
  - Wholesaler: "Subscribe" → `/sign-up?plan=wholesaler`
  - Highlight "most popular" plan (if applicable)
  - Responsive: 4-col → 2-col → 1-col stacking

> ⚠️ EDGE CASE: Hero search should work for guests (no auth required). Empty keyword should still navigate to marketplace with location/distance filters.

> ⚠️ EDGE CASE: Recently added listings must handle the state where there are zero listings (empty state with encouraging message).

### 2.2 How It Works Page [Spec §11]

- [ ] Create route: `app/how-it-works/page.tsx`
- [ ] Step-by-step visual guide explaining:
  - Step 1: Create a free account
  - Step 2: Browse or post surplus building materials
  - Step 3: Contact sellers / receive enquiries
  - Step 4: Arrange collection or delivery (AnyVan)
  - Step 5: Complete the transaction privately
- [ ] Responsive layout with icons/illustrations per step
- [ ] CTA at bottom: "Get Started" → `/sign-up`
- [ ] SEO metadata: title, description, Open Graph tags

### 2.3 About Us Page [Spec §11]

- [ ] Create route: `app/about-us/page.tsx`
- [ ] **Mission section** (`#mission`) — Enviromate's environmental mission statement
- [ ] **Facts & figures section** (`#facts`) — Industry statistics and Enviromate's impact
- [ ] **Our story section** (`#story`) — Company founding narrative
- [ ] **Video section** (`#video`) — Embedded explainer video (YouTube/Vimeo iframe or HTML5 video)
- [ ] **Contact form section** (`#contact`):
  - Fields: Name, Email, Subject, Message
  - Submit sends email via API route
  - Success/error feedback
  - Basic spam protection (honeypot field or rate limiting)
- [ ] Smooth scroll to anchor sections when navigating from footer/nav links
- [ ] SEO metadata

> ⚠️ EDGE CASE: Anchor links (`#mission`, `#video`, etc.) from other pages must scroll to the correct section after page load. Handle both direct navigation and in-page scrolling.

> ⚠️ EDGE CASE: Video embed must be lazy-loaded and not block page rendering. Provide a poster/thumbnail before load.

### 2.4 Partners Page [Spec §11]

- [ ] Create route: `app/partners/page.tsx`
- [ ] Grid of partner organisation cards (logo, name, description, external link)
- [ ] Data sourced from database (Partner model) or static data file initially
- [ ] Responsive grid layout
- [ ] SEO metadata

### 2.5 Community Projects Page [Spec §11]

- [ ] Create route: `app/community-projects/page.tsx`
- [ ] List/grid of charitable build projects supported by Enviromate
- [ ] Each project: title, description, images, location
- [ ] Data sourced from database (CommunityProject model) or static initially
- [ ] SEO metadata

### 2.6 Blog — Index & Post Pages [Spec §11]

- [ ] Create route: `app/blog/page.tsx` — blog listing page
- [ ] Create route: `app/blog/[slug]/page.tsx` — individual blog post
- [ ] Blog index:
  - Grid/list of blog post cards (cover image, title, excerpt, date, read more link)
  - Pagination (configurable posts per page)
  - Empty state if no posts
- [ ] Blog post:
  - Full article rendering (rich text / markdown)
  - Cover image
  - Author name, publish date
  - Back to blog link
  - SEO metadata per post (dynamic Open Graph)
- [ ] Data sourced from database (BlogPost model)

> ⚠️ EDGE CASE: Blog posts with unpublished status (`publishedAt = null`) must not be visible on the public blog. Only published posts appear.

### 2.7 Press Page [Spec §11]

- [ ] Create route: `app/press/page.tsx`
- [ ] List/grid of press mentions and media coverage
- [ ] Each entry: title, source publication, date, cover image, external link
- [ ] Data sourced from database (PressArticle model) or static initially
- [ ] SEO metadata

### 2.8 Terms & Conditions Page [Spec §11]

- [ ] Create route: `app/terms/page.tsx`
- [ ] Render legal content (static HTML/markdown)
- [ ] Table of contents with anchor links for sections
- [ ] Last updated date
- [ ] SEO metadata (noindex optional)

### 2.9 Privacy Policy Page [Spec §11]

- [ ] Create route: `app/privacy/page.tsx`
- [ ] GDPR-compliant privacy policy content
- [ ] Sections: data collection, usage, storage, sharing, rights, cookies, contact
- [ ] Table of contents with anchor links
- [ ] Last updated date
- [ ] SEO metadata (noindex optional)

### 2.10 404 & Error Pages

- [ ] Custom 404 page (`app/not-found.tsx`) with helpful message and link back to homepage/marketplace
- [ ] Custom error page (`app/error.tsx`) with retry action and support contact
- [ ] Consistent styling with the rest of the site

---

## Phase 3 — Authentication System

> Goal: Implement complete user authentication including registration, login, password reset, session management, and role-based access control. [Spec §3]

### 3.1 Auth Infrastructure

- [ ] Install and configure authentication library (NextAuth.js / Auth.js v5)
- [ ] Configure credentials provider (email + password)
- [ ] Set up session strategy (JWT or database sessions)
- [ ] Create auth API routes (`app/api/auth/[...nextauth]/route.ts`)
- [ ] Create auth context/provider wrapping the application
- [ ] Implement `useSession` / `useAuth` hook for client components
- [ ] Create server-side auth helpers (`getServerSession` wrappers)
- [ ] Create middleware for route protection (`middleware.ts`):
  - Protected routes: `/post-ad`, `/dashboard/*`, `/admin/*`
  - Redirect unauthenticated users to `/sign-up` (or sign-in modal trigger)
  - Admin routes restricted to users with `role = ADMIN`
- [ ] Password hashing using bcrypt (minimum 12 rounds)

> ⚠️ EDGE CASE: Session must persist across tabs. Opening a new tab should not require re-authentication.

> ⚠️ EDGE CASE: If a user's subscription changes (e.g., cancelled), their session/role should reflect the updated permissions without requiring re-login. Consider session revalidation strategy.

### 3.2 Sign Up — Quick Registration [Spec §3.1]

- [ ] Create sign-up modal component (triggered from "Create an Account" in nav)
- [ ] Form fields:
  - First Name (text, required, min 1 char, max 50 chars)
  - Last Name (text, required, min 1 char, max 50 chars)
  - Postcode (text, required, UK postcode validation regex)
  - Email Address (email, required, valid format, unique check)
  - Password (password, required, min 8 chars, strength indicator)
- [ ] Client-side validation with inline error messages per field
- [ ] Server-side validation (duplicate check, format verification)
- [ ] On submit: create user with `accountType = FREE`
- [ ] On success: auto-sign-in and redirect to dashboard or previous page
- [ ] Submit button: "sign up"
- [ ] Link: "Already have an account? Sign in here" → opens sign-in modal
- [ ] Loading/disabled state on submit button during API call
- [ ] Rate limiting on registration endpoint (prevent spam accounts)

> ⚠️ EDGE CASE: UK postcode validation must accept all valid formats: "A1 1AA", "A11 1AA", "AA1 1AA", "AA11 1AA", "A1A 1AA", "AA1A 1AA". Normalise to uppercase with single space.

> ⚠️ EDGE CASE: Email uniqueness check should be case-insensitive. Store emails in lowercase.

> ⚠️ EDGE CASE: If user navigates away mid-registration and returns, form state should be preserved (or clearly reset).

> ⚠️ EDGE CASE: Password field should have a show/hide toggle for usability.

### 3.3 Sign Up — Full Registration Page [Spec §3.2]

- [ ] Create route: `app/sign-up/page.tsx`
- [ ] All fields from quick registration PLUS:
  - Occupation dropdown (required for trade users):
    - Builder/Multi Trade, Landscape/Garden Maintenance, Plumbing/Heating Engineer, Electrician, Joiner/Carpenter, Maintenance, Decorator, Plasterer, Kitchen Fitter, Bathroom Fitter, Tradesman, DIY Enthusiast, Upcycler, Self Builder, Other Trade
  - Business Name (text, conditionally required for Wholesaler)
  - Business Type dropdown (conditionally required for Wholesaler):
    - Builders Merchant, Electrical Wholesaler, Plumbers Merchant, Decorating Merchant, Tool Merchant, Reclamation Yard, Other
  - Account Type selection (radio/card selector):
    - Free (£0) — default selected
    - Premium (£2.99/mo)
    - Premium+ (£19.99/mo)
    - Wholesalers (£29.99/mo + VAT)
- [ ] **Conditional field logic:**
  - Business Name and Business Type fields: **hidden by default**, shown only when "Wholesalers" account type is selected
  - Occupation: shown for all account types
- [ ] Plan selection cards with feature summary per tier
- [ ] If a paid plan is selected: after form submission, redirect to Stripe Checkout (Phase 10)
- [ ] Pre-fill plan selection if `?plan=` query param is present (from pricing section CTAs)
- [ ] Same validation rules as quick registration plus additional fields
- [ ] Submit button: "sign up"
- [ ] Link: "Already have an account?" → sign-in modal or `/sign-in`

> ⚠️ EDGE CASE: If user selects Wholesaler, fills business fields, then switches to Free — business fields must clear and hide. Validate that business fields are empty/null for non-wholesaler submissions.

> ⚠️ EDGE CASE: Occupation "Other Trade" may need a free-text follow-up field (check spec — not explicitly stated, so omit unless requested).

> ⚠️ EDGE CASE: If Stripe payment fails after form submission for a paid plan, the user account should still be created as Free tier with a message prompting them to retry payment in their dashboard.

### 3.4 Sign In [Spec §3.3]

- [ ] Create sign-in modal component (triggered from "Sign In" button in nav)
- [ ] Form fields:
  - Email Address (email, required)
  - Password (password, required)
- [ ] Submit button: "sign in"
- [ ] On success: close modal, update nav to logged-in state, stay on current page (or redirect to dashboard if coming from a protected route)
- [ ] On failure: inline error message — "Invalid email or password" (generic to avoid enumeration)
- [ ] Link: "I've forgotten my details" → opens forgot password flow
- [ ] Link: "Don't have an account?" → `/sign-up`
- [ ] Show/hide password toggle
- [ ] Rate limiting on login endpoint (5 attempts per 15 minutes per IP, then throttle)

> ⚠️ EDGE CASE: Error message must NOT reveal whether the email exists in the system (prevents user enumeration attacks). Always show generic "Invalid email or password".

> ⚠️ EDGE CASE: After successful sign-in, if the user was trying to access a protected resource (e.g., `/post-ad`), redirect them to that resource, not just the dashboard.

> ⚠️ EDGE CASE: If user is already logged in and navigates to sign-in, redirect to dashboard.

### 3.5 Forgot Password / Password Reset [Spec §3.4]

- [ ] Create forgot password form (modal or page):
  - Email Address field (email, required)
  - Submit button: "reset password"
- [ ] On submit: **always** show confirmation message: "Your password has been reset, please check your email" — regardless of whether email exists (prevents enumeration)
- [ ] Backend:
  - Look up user by email
  - If found: generate time-limited reset token (e.g., 1 hour expiry), store hashed token in database, send reset email
  - If not found: do nothing (but still show success message to user)
- [ ] Password reset email:
  - Subject: "Reset your Enviromate password"
  - Body: Link to `/reset-password?token=XXX`
  - Link expires after 1 hour
  - Clear branding
- [ ] Create reset password page (`app/reset-password/page.tsx`):
  - New Password field (with strength requirements)
  - Confirm Password field
  - Submit button
  - On success: redirect to sign-in with success message
  - On failure (expired/invalid token): show error with link to request new reset
- [ ] Invalidate reset token after use (single-use only)
- [ ] Invalidate all existing sessions after password change (security)
- [ ] Link: "Don't have an account? Sign up here"

> ⚠️ EDGE CASE: Reset token must be cryptographically random (use `crypto.randomBytes`), stored hashed (not plain text), and single-use.

> ⚠️ EDGE CASE: If user requests multiple resets, only the most recent token should be valid. Invalidate previous tokens.

> ⚠️ EDGE CASE: "Confirm password" must match "New password" — validate both client-side and server-side.

### 3.6 Sign Out

- [ ] Sign out action accessible from user dropdown in navigation
- [ ] Clear session (server-side) and auth cookies (client-side)
- [ ] Redirect to homepage after sign out
- [ ] Confirm sign out is complete (no stale auth state in UI)

> ⚠️ EDGE CASE: Sign out should work even if the server is unreachable (clear client-side state regardless).

### 3.7 Email Verification (Recommended Addition)

- [ ] On registration, send verification email with unique link
- [ ] Unverified users can browse but cannot post ads or message sellers
- [ ] Resend verification email option in dashboard
- [ ] Auto-verify on link click
- [ ] Display "Verify your email" banner in dashboard for unverified users

> ⚠️ EDGE CASE: Verification links should expire (e.g., 24 hours). Provide a "Resend" option.

---

## Phase 4 — Marketplace — Browse & Search

> Goal: Build the core marketplace browsing experience with search, filtering, category routing, and listing card grid. [Spec §5.1–5.3]

### 4.1 Marketplace Page [Spec §5.1]

- [ ] Create route: `app/marketplace/page.tsx`
- [ ] Breadcrumb: Home > Marketplace
- [ ] Page title: "Marketplace"
- [ ] Listing grid layout:
  - Desktop: 3 or 4 columns
  - Tablet: 2 columns
  - Mobile: 1 or 2 columns
- [ ] Pagination controls at bottom (or infinite scroll with "Load More")
- [ ] "Show X results" dropdown (e.g., 12, 24, 48 per page)
- [ ] Results count display: "Showing X–Y of Z results"
- [ ] Loading skeleton grid while data fetches
- [ ] Empty state when no results: "No listings found. Try adjusting your search or filters."

### 4.2 Search & Filter System [Spec §5.2]

- [ ] **Search bar** at top of marketplace page:
  - Keyword text input (searches titles and descriptions, case-insensitive)
  - Location text input (town, city, or UK postcode)
  - Distance dropdown: 5 miles, 25 miles, 50 miles, 100 miles, 100+ miles
- [ ] **Category tabs** — horizontal row:
  - All (default), Building, Plumbing, Carpentry, Electrical, Painting & Decorating, Tools, Free, Other, Wholesalers
  - Active tab highlighted
  - Wholesalers tab: show lock/badge, clicking without Premium+/Wholesaler account shows upgrade prompt
- [ ] URL-based filter state (query params for SSR + shareability):
  - `/marketplace?keyword=bricks&location=London&distance=25&category=building&page=1&show=24`
- [ ] Filters update URL on change (pushState, no full reload)
- [ ] Search triggers on:
  - Click search button
  - Press Enter in any search field
  - Select a category tab
  - Change distance dropdown
- [ ] Debounced keyword search (300ms delay to avoid excessive API calls)
- [ ] "Clear filters" option to reset all filters

> ⚠️ EDGE CASE: Location-based search requires geocoding (postcode/city → lat/lng). Implement a geocoding solution (e.g., postcodes.io API for UK postcodes — free) and store lat/lng on listings.

> ⚠️ EDGE CASE: Distance filter with "100+ miles" effectively means "nationwide" — return all results regardless of distance.

> ⚠️ EDGE CASE: If no location is entered, distance filter should be hidden or disabled (distance without a centre point is meaningless).

> ⚠️ EDGE CASE: Search should handle special characters and not be vulnerable to injection. Sanitise all inputs.

### 4.3 Category Routes [Spec §4.3, §9]

- [ ] Create dynamic route: `app/c/[category]/page.tsx`
- [ ] Validate category slug against allowed values:
  - `building`, `plumbing`, `carpentry`, `electrical`, `paint-and-decorating`, `tools`, `free`, `other`, `wholesalers`
- [ ] Invalid category slug → 404 page
- [ ] Category page reuses marketplace layout with category pre-filtered
- [ ] Breadcrumb: Home > Marketplace > [Category Name]
- [ ] SEO metadata per category (dynamic title, description)
- [ ] **Wholesalers category** (`/c/wholesalers`):
  - Require Premium+ or Wholesaler subscription to view
  - Non-qualifying users see an upgrade prompt/paywall
  - Guests see a sign-up prompt

> ⚠️ EDGE CASE: The `/c/free` category shows items with price = 0 across all categories, not just items in a "Free" category. This is a cross-cutting filter. Clarify implementation: either a virtual category that filters by price, or a real category.

### 4.4 Listing Card Component [Spec §5.3]

- [ ] Thumbnail image (460×250px aspect ratio, smart-cropped)
  - Lazy-loaded with blur placeholder
  - Fallback image if no photo uploaded
- [ ] Listing title (truncated with ellipsis if too long)
- [ ] Price display: "£XX.XX" or "Free" badge (green)
- [ ] Status badge: "For Sale" (blue) or "Free" (green)
- [ ] Watch/Save button (heart icon):
  - Logged-in: toggle watch state (filled = watching, outline = not watching)
  - Guest: clicking opens sign-in modal with message "Sign in to save items"
- [ ] Entire card is clickable → navigates to listing detail view
- [ ] Hover effect (subtle shadow/scale for desktop)
- [ ] Consistent card height in grid (image fixed aspect ratio, text area fixed height with overflow handling)

> ⚠️ EDGE CASE: Listing titles that are extremely long must be truncated gracefully. Use CSS `line-clamp` (2 lines max).

> ⚠️ EDGE CASE: Prices must format correctly: "£10.00" not "£10", "Free" not "£0.00". Handle pence conversion from integer storage.

### 4.5 Sorting

- [ ] Sort options dropdown:
  - Most Recent (default — `createdAt DESC`, with bumped items first via `bumpedAt`)
  - Price: Low to High
  - Price: High to Low
  - Distance: Nearest First (only when location is provided)
- [ ] Sort selection persists in URL params
- [ ] Bumped listings appear at the top of default sort, interleaved naturally in price/distance sorts

> ⚠️ EDGE CASE: Bumped listings should appear at the top of "Most Recent" sort but sorted by `bumpedAt` among themselves, with non-bumped listings following sorted by `createdAt`.

---

## Phase 5 — Listing Detail View

> Goal: Build the full listing detail page with image gallery, seller info, and all action CTAs. [Spec §5.4]

### 5.1 Listing Detail Page

- [ ] Create route: `app/marketplace/[id]/page.tsx` (or `app/listing/[id]/page.tsx`)
- [ ] Fetch listing data server-side (SSR for SEO)
- [ ] **Image gallery:**
  - Primary large image display
  - Thumbnail strip for multi-image listings
  - Click thumbnail to switch main image
  - Lightbox/fullscreen view on click
  - Swipe gesture support on mobile
  - Fallback placeholder if no images
- [ ] **Listing details:**
  - Title (h1)
  - Price (large, prominent) or "Free" badge
  - Description (full text, preserving line breaks)
  - Category (linked to category page)
  - Location (town/city level, not full postcode — privacy)
  - Date posted
  - Listing status badge (For Sale / Free)
- [ ] **Seller information:**
  - Seller display name (First Name + Last Initial, e.g., "John S.")
  - Member since date
  - Visible to logged-in users only
  - Guests see: "Sign in to view seller details"
- [ ] **Action buttons:**
  - "Watch Item" — add/remove from watchlist (same logic as card)
  - "Message Seller" — opens messaging UI (logged-in only; guest → sign-in prompt)
  - "Make an Offer" — opens messaging UI with pre-filled offer template (logged-in only)
  - "Delivery via AnyVan" — external link/integration (see Phase 14)
- [ ] Breadcrumb: Home > Marketplace > [Category] > [Listing Title]
- [ ] SEO metadata: dynamic title, description, Open Graph image (listing's first photo)
- [ ] Related/similar listings section at bottom (same category, nearby location)

> ⚠️ EDGE CASE: Listing not found (deleted, expired, invalid ID) → 404 page with helpful message.

> ⚠️ EDGE CASE: Seller viewing their own listing should see "Edit Listing" and "Delete Listing" buttons instead of "Message Seller" and "Make an Offer".

> ⚠️ EDGE CASE: Sold/removed listings should show a "This item is no longer available" banner but still render the page (for bookmarked URLs). Do not show action buttons.

> ⚠️ EDGE CASE: Location should display as town/city only (e.g., "Manchester"), never the seller's full postcode — privacy protection.

> ⚠️ EDGE CASE: If a listing belongs to the Wholesalers category, non-Premium+/Wholesaler users should not be able to view it. Redirect to upgrade prompt.

### 5.2 Share Listing

- [ ] Share button with options: Copy Link, share via native Web Share API (mobile)
- [ ] Open Graph meta tags for rich link previews on social platforms

---

## Phase 6 — Post an Ad

> Goal: Build the complete ad posting flow with form validation, image upload, and listing creation. [Spec §6]

### 6.1 Post Ad Page [Spec §6.1, §6.2]

- [ ] Create route: `app/post-ad/page.tsx`
- [ ] **Auth gate:** redirect unauthenticated users to `/sign-up` with return URL
- [ ] **Form fields:**
  - Photo(s) upload:
    - Drag-and-drop zone + click to browse
    - Camera capture option on mobile devices
    - Multiple image selection
    - Image preview with reorder (drag to rearrange) and delete
    - Client-side image compression/resize before upload (max 5MB per image)
    - Upload to S3 via presigned URL (see Phase 14)
    - **Free plan:** limited number of images (e.g., 3–5, confirm limit)
    - **Premium/Premium+/Wholesaler:** unlimited images
    - Progress indicator per image during upload
  - Product Name / Title (text, required, max 100 chars)
  - Description (textarea, required, max 2000 chars, character count display)
  - Price (number input in £, required, min 0, max 999999.99)
    - When price = 0 or "Free" toggle selected: listing type auto-set to "Free"
  - Listing Type toggle: "For Sale" / "Free"
    - If "Free" selected: price field disabled and set to 0
    - If "For Sale" selected: price field required, must be > 0
  - Location (text/postcode, required):
    - Pre-filled from user's account postcode
    - Editable — user can override with different postcode
    - Validate as UK postcode
    - Geocode to lat/lng for distance search
  - Category (dropdown, required):
    - Building, Plumbing, Carpentry, Electrical, Painting & Decorating, Tools, Free, Other, Wholesalers
    - **Wholesalers category only available to Wholesaler-tier users**
    - If non-Wholesaler selects it (shouldn't be possible if hidden): reject on server
- [ ] **Form validation:**
  - Client-side: real-time validation with inline error messages
  - Server-side: full re-validation of all fields
  - Sanitise all text inputs (strip HTML, prevent XSS)
- [ ] **Submit flow:**
  - Show loading state on submit button
  - Create listing in database
  - Associate uploaded images with listing
  - On success: redirect to the new listing detail page with success toast
  - On failure: show error message, preserve form state
- [ ] **Draft saving** (optional/nice-to-have):
  - Auto-save form state to localStorage
  - Restore on page revisit
  - Clear on successful submission

> ⚠️ EDGE CASE: If a user has hit their ad limit (Free plan), show a message with upgrade CTA instead of the form. Check ad count server-side before rendering form.

> ⚠️ EDGE CASE: Image upload failures should be handled gracefully — retry mechanism, skip failed images, show which uploads failed.

> ⚠️ EDGE CASE: User navigating away from a partially filled form should see a browser "unsaved changes" confirmation dialog.

> ⚠️ EDGE CASE: Extremely large descriptions or titles with only whitespace should be rejected. Trim and validate minimum meaningful content.

> ⚠️ EDGE CASE: Price input must not accept negative numbers. Must handle locale-specific decimal separators (UK uses "." — enforce this).

### 6.2 Edit Listing

- [ ] Create route: `app/post-ad/[id]/edit/page.tsx` (or similar)
- [ ] Pre-fill form with existing listing data
- [ ] Allow all fields to be modified
- [ ] Allow adding/removing images
- [ ] Only the listing owner can edit (server-side ownership check)
- [ ] On submit: update listing in database
- [ ] Redirect to updated listing detail page

> ⚠️ EDGE CASE: If a listing has been sold/removed, it should not be editable. Show appropriate message.

### 6.3 Delete Listing

- [ ] Confirmation dialog before deletion ("Are you sure? This cannot be undone.")
- [ ] Soft delete (set status to REMOVED) rather than hard delete — preserves data for admin/audit
- [ ] Remove associated images from S3 (or mark for cleanup)
- [ ] Redirect to dashboard after deletion with success toast
- [ ] Only the listing owner or admin can delete

### 6.4 Mark as Sold

- [ ] "Mark as Sold" button on listing detail page (owner only) and dashboard
- [ ] Sets listing status to SOLD
- [ ] Listing remains visible in search with "SOLD" overlay/badge but action buttons disabled
- [ ] Confirmation dialog before marking as sold

> ⚠️ EDGE CASE: Allow "Unmark as Sold" in case seller marks it accidentally. Toggle between ACTIVE and SOLD.

---

## Phase 7 — User Account Dashboard

> Goal: Build the logged-in user's personal dashboard for managing all account activity. [Spec §8]

### 7.1 Dashboard Layout & Navigation

- [ ] Create route group: `app/(dashboard)/dashboard/`
- [ ] Sidebar navigation with sections:
  - My Listings
  - Watched Items
  - Messages
  - Subscription
  - Profile Settings
  - Ad Bump Credits
  - Notifications
  - Seller Hub (Wholesaler only — conditionally shown)
- [ ] Mobile: sidebar collapses to top tabs or hamburger
- [ ] Dashboard home/overview page with summary cards:
  - Active listings count
  - Watched items count
  - Unread messages count
  - Current plan + bump credits remaining

### 7.2 My Listings [Spec §8]

- [ ] List/grid of all ads posted by the user
- [ ] Each listing shows: thumbnail, title, price, status (Active/Sold/Expired), date posted, views (if tracked)
- [ ] Actions per listing:
  - Edit → navigate to edit form
  - Delete → confirmation dialog + soft delete
  - Mark as Sold / Unmark as Sold
  - Apply Ad Bump (if credits available — see Phase 11)
- [ ] Filter by status: All, Active, Sold, Expired
- [ ] Sort by: Date posted, Price
- [ ] Empty state: "You haven't posted any ads yet. Post your first ad!" with CTA
- [ ] Pagination for users with many listings

### 7.3 Watched Items [Spec §8]

- [ ] List/grid of all listings the user has saved
- [ ] Each item shows: thumbnail, title, price, status, seller
- [ ] "Remove from watchlist" button per item
- [ ] Click item → navigate to listing detail page
- [ ] Empty state: "You're not watching any items. Browse the marketplace!" with CTA
- [ ] Handle case where a watched listing has been deleted/sold (show with "No longer available" badge, allow removal)

> ⚠️ EDGE CASE: Watched items that have been sold or removed should still appear in the watchlist but with a visual indicator (dimmed, "Sold" badge, or "Removed" badge). User can remove them.

### 7.4 Profile Settings [Spec §8]

- [ ] Editable fields:
  - First Name
  - Last Name
  - Postcode (with UK validation)
  - Email (with re-verification if changed)
  - Password (change password form: current password + new password + confirm)
  - Occupation (dropdown, same options as registration)
- [ ] Wholesaler users additionally:
  - Business Name
  - Business Type
- [ ] Save button with success/error feedback
- [ ] Require current password to change email or password

> ⚠️ EDGE CASE: Changing email should require re-verification of the new email. Old email should receive a notification that email was changed (security).

> ⚠️ EDGE CASE: Changing postcode should update the geocoded lat/lng for the user's default location.

### 7.5 Notifications Section [Spec §8]

- [ ] List of all notifications (newest first)
- [ ] Each notification: icon, title, message, timestamp, read/unread indicator
- [ ] Mark as read on click/view
- [ ] "Mark all as read" bulk action
- [ ] Notification types: watch confirmation, new message, subscription update, ad posted, bump applied
- [ ] Empty state: "No notifications yet."

---

## Phase 8 — Watch / Save Items

> Goal: Implement the complete watchlist system. [Spec §5.5]

### 8.1 Watch Button Logic

- [ ] Watch button appears on:
  - Listing cards in grid (marketplace, homepage, category pages)
  - Listing detail page
- [ ] **Logged-in user:**
  - Click to toggle watch/unwatch
  - Visual state change (filled heart = watching, outline = not watching)
  - Optimistic UI update (instant visual feedback, API call in background)
  - On watch: show toast "You are now watching this item and it has been added to your account page."
  - On unwatch: show toast "Item removed from your watchlist."
- [ ] **Guest user:**
  - Click shows sign-in modal with message "Sign in to save items to your watchlist"
  - After sign-in, automatically watch the item they clicked on (store intent in sessionStorage)
- [ ] Prevent duplicate watch entries (database unique constraint on userId + listingId)

> ⚠️ EDGE CASE: If the API call to watch/unwatch fails, revert the optimistic UI and show an error toast.

> ⚠️ EDGE CASE: Race condition — user rapidly clicking watch/unwatch. Debounce clicks and use the latest intended state.

> ⚠️ EDGE CASE: User watching their own listing — allow it (useful for tracking).

### 8.2 Watchlist Data

- [ ] API endpoint: `POST /api/watch` (toggle watch)
- [ ] API endpoint: `GET /api/watch` (get user's watched items)
- [ ] Include watch state in listing card data when user is logged in (to show filled/outline heart)
- [ ] Batch fetch watch states for listing grids (avoid N+1 queries)

---

## Phase 9 — Messaging System

> Goal: Build the in-platform direct messaging system between buyers and sellers. [Spec §5.6]

### 9.1 Messaging Infrastructure

- [ ] Conversation model: groups messages between two users about a specific listing
- [ ] Messages stored in database with sender, content, timestamp, read status
- [ ] API routes:
  - `POST /api/messages` — send a message (creates conversation if new)
  - `GET /api/conversations` — list user's conversations
  - `GET /api/conversations/[id]` — get conversation with messages
  - `PATCH /api/messages/[id]/read` — mark message as read

### 9.2 Initiate Conversation [Spec §5.4]

- [ ] "Message Seller" button on listing detail page:
  - Opens message compose UI (modal or inline)
  - Pre-fills: listing reference (title + thumbnail)
  - Text area for message
  - Send button
- [ ] "Make an Offer" button:
  - Same as "Message Seller" but with pre-filled template: "Hi, I'd like to make an offer of £\_\_\_ for [Item Title]."
  - User fills in offer amount and optional message
- [ ] Only logged-in users can message (guest → sign-in prompt)
- [ ] Cannot message yourself (hide buttons on own listings)

> ⚠️ EDGE CASE: If a conversation already exists between the buyer and seller for the same listing, open the existing conversation instead of creating a new one.

> ⚠️ EDGE CASE: Listing reference in the conversation should remain even if the listing is later deleted (store snapshot of title/image).

### 9.3 Inbox / Messages Dashboard [Spec §8]

- [ ] Create route: `app/(dashboard)/dashboard/messages/page.tsx`
- [ ] Conversation list:
  - Each row: other user's name, listing thumbnail + title, last message preview, timestamp, unread count badge
  - Sorted by most recent message
  - Unread conversations highlighted
- [ ] Conversation detail view (click a conversation):
  - Message thread with sender alignment (own messages right, other's left)
  - Message bubbles with timestamp
  - Text input + send button at bottom
  - Auto-scroll to latest message
  - Mark messages as read on view
- [ ] Empty state: "No messages yet. Browse the marketplace and contact a seller!"
- [ ] Real-time updates (options):
  - Polling (every 30 seconds) — simpler
  - OR Server-Sent Events / WebSocket — better UX, more complex
  - Start with polling, upgrade later if needed

> ⚠️ EDGE CASE: Very long conversations should paginate messages (load older messages on scroll up).

> ⚠️ EDGE CASE: Deleted users' messages should still display (show "Deleted User" as name).

> ⚠️ EDGE CASE: Spam/abuse: consider message rate limiting and a "Report" button per conversation.

> ⚠️ EDGE CASE: Message content should be sanitised (no HTML/script injection). Plain text only.

### 9.4 Unread Message Indicator

- [ ] Unread count badge in navigation bar (next to user avatar/messages icon)
- [ ] Unread count badge in dashboard sidebar next to "Messages"
- [ ] Update count on new message (via polling or real-time)

---

## Phase 10 — Subscription & Billing

> Goal: Implement subscription plans with Stripe integration for recurring billing. [Spec §7]

### 10.1 Stripe Setup

- [ ] Create Stripe account and configure for GBP
- [ ] Create Stripe Products and Prices:
  - Premium: £2.99/month recurring
  - Premium+: £19.99/month recurring
  - Wholesaler: £29.99/month recurring + VAT (configure Stripe Tax or manual VAT)
- [ ] Install Stripe SDK (`stripe` + `@stripe/stripe-js`)
- [ ] Create Stripe webhook endpoint: `app/api/webhooks/stripe/route.ts`
- [ ] Handle webhook events:
  - `checkout.session.completed` — activate subscription
  - `invoice.paid` — confirm renewal
  - `invoice.payment_failed` — mark subscription as past_due
  - `customer.subscription.updated` — handle plan changes
  - `customer.subscription.deleted` — handle cancellation
- [ ] Webhook signature verification (prevent spoofing)
- [ ] Idempotency handling for duplicate webhook events

> ⚠️ EDGE CASE: Webhook events can arrive out of order. Handle gracefully by checking current state before applying changes.

> ⚠️ EDGE CASE: Failed webhook delivery — Stripe retries. Ensure handlers are idempotent.

### 10.2 Checkout Flow

- [ ] From sign-up (paid plan selected): create Stripe Checkout Session and redirect
- [ ] From dashboard upgrade: create Stripe Checkout Session and redirect
- [ ] Checkout success page: `app/subscription/success/page.tsx`
  - Confirm subscription activated
  - Link to dashboard
- [ ] Checkout cancel page: `app/subscription/cancel/page.tsx`
  - Message: "Your subscription was not completed"
  - Link to retry or continue as free user
- [ ] Pass user ID and plan in Checkout Session metadata for webhook processing

> ⚠️ EDGE CASE: User completes checkout but webhook hasn't fired yet — show "Processing your subscription..." state. Poll for status or use Checkout Session retrieval.

> ⚠️ EDGE CASE: User opens checkout in multiple tabs — ensure only one subscription is created.

### 10.3 Subscription Management Dashboard [Spec §8]

- [ ] Create route: `app/(dashboard)/dashboard/subscription/page.tsx`
- [ ] Display:
  - Current plan name and price
  - Status (Active, Past Due, Cancelled)
  - Next billing date
  - Payment method (last 4 digits of card)
- [ ] Actions:
  - **Upgrade:** show available higher plans, create Stripe Checkout for upgrade
  - **Downgrade:** show available lower plans, apply at end of current period
  - **Cancel:** cancel subscription (effective at end of current billing period)
  - **Reactivate:** if cancelled but still in active period, reactivate
  - **Update payment method:** redirect to Stripe Customer Portal
- [ ] Stripe Customer Portal integration for self-service billing management
- [ ] Cancellation confirmation dialog: "Your plan will remain active until [date]. After that, you'll be downgraded to the Free plan."

> ⚠️ EDGE CASE: Downgrade to Free should not delete existing listings, but enforce Free-tier limits on new actions (e.g., limited new ads, limited images on new ads).

> ⚠️ EDGE CASE: Past-due subscription — allow a grace period (e.g., 3 days) before restricting features. Show warning banner.

> ⚠️ EDGE CASE: User with active Wholesaler listings who downgrades to Premium — existing Wholesaler listings should remain visible but user cannot create new ones in that category.

> ⚠️ EDGE CASE: VAT on Wholesaler plan — ensure Stripe handles VAT correctly for UK businesses. May need to collect VAT number.

### 10.4 Plan-Based Access Control

- [ ] Create a helper/middleware that checks user's subscription tier
- [ ] Enforce limits:
  - **Free:** limited ads (e.g., 3 active), limited images per ad (e.g., 3)
  - **Premium:** unlimited ads, unlimited images, 3 bumps/month
  - **Premium+:** all Premium features + Wholesale category access + 6 bumps/month
  - **Wholesaler:** all Premium+ features + Seller Hub + 9 bumps/month + Business profile
- [ ] Show upgrade prompts when users hit limits
- [ ] Server-side enforcement (never rely only on client-side checks)

> ⚠️ EDGE CASE: Cache subscription status in session/JWT to avoid database lookups on every request, but ensure it refreshes within a reasonable window (e.g., revalidate every 5 minutes or on critical actions).

---

## Phase 11 — Ad Bump System

> Goal: Implement the ad bump feature that moves listings to the top of search results. [Spec §6.3]

### 11.1 Bump Credit Management

- [ ] Ad bump credits allocated per plan per month:
  - Free: 0
  - Premium: 3/month
  - Premium+: 6/month
  - Wholesaler: 9/month
- [ ] Credits reset on subscription renewal (monthly billing cycle)
- [ ] Track in `AdBumpCredit` table: userId, totalCredits, usedCredits, periodStart, periodEnd
- [ ] On subscription renewal webhook: reset `usedCredits = 0`, update period dates
- [ ] Credits do **NOT** roll over — unused credits expire at period end
- [ ] Display remaining credits in dashboard

> ⚠️ EDGE CASE: If a user upgrades mid-cycle (e.g., Premium → Premium+), credit allocation should increase for the current period. Calculate prorated credits or grant full new allocation.

> ⚠️ EDGE CASE: If a user downgrades mid-cycle, do not claw back already-used credits. New allocation applies at next renewal.

### 11.2 Apply Bump

- [ ] "Bump" button on each active listing in My Listings dashboard
- [ ] Disabled/hidden if no credits remaining (show "No bump credits remaining. Upgrade your plan for more bumps.")
- [ ] Confirmation dialog: "Use 1 bump credit to move this listing to the top? You have X credits remaining."
- [ ] On confirm:
  - Decrement available credits
  - Set `bumpedAt = NOW()` on the listing
  - Success toast: "Your listing has been bumped to the top!"
- [ ] Bumped listings appear at the top of marketplace results (default sort)
- [ ] Multiple bumps on the same listing: update `bumpedAt` to current timestamp each time

> ⚠️ EDGE CASE: User rapidly clicking bump button — prevent double-spend with optimistic UI + server-side check.

> ⚠️ EDGE CASE: Bumping a listing that is already at the top (recently bumped) should still work (updates timestamp), but warn the user: "This listing was already recently bumped."

---

## Phase 12 — Wholesaler Features

> Goal: Build the Wholesaler-exclusive features including Seller Hub, business profiles, and category restrictions. [Spec §8.1]

### 12.1 Wholesaler Category Access Control [Spec §9]

- [ ] `/c/wholesalers` route:
  - Premium+ and Wholesaler users: show listings normally
  - Free/Premium users: show upgrade paywall page:
    - "Wholesale listings are exclusive to Premium+ and Wholesaler members"
    - Plan comparison with upgrade CTAs
  - Guests: show sign-up prompt
- [ ] Wholesaler category in Post Ad form:
  - Only visible to Wholesaler-tier users
  - Hidden for all other tiers
  - Server-side validation: reject non-Wholesaler submissions to this category

### 12.2 Business Profile [Spec §7, §8.1]

- [ ] Wholesaler users have additional profile fields:
  - Business Name (displayed on their listings)
  - Business Type (Builders Merchant, Electrical Wholesaler, etc.)
  - Business description (optional)
  - Business logo/image (optional)
- [ ] Business name displayed on listing cards and detail pages for Wholesaler listings
- [ ] Editable in Profile Settings (Wholesaler section)

### 12.3 Seller Hub [Spec §8.1]

- [ ] Create route: `app/(dashboard)/dashboard/seller-hub/page.tsx`
- [ ] Only accessible to Wholesaler-tier users
- [ ] Non-Wholesaler users accessing this route: redirect to upgrade page
- [ ] Features:
  - **Bulk listing management:**
    - Table view of all listings with bulk actions (select multiple → mark sold, delete, bump)
    - Quick edit inline for price and status
  - **Engagement analytics:**
    - Views per listing (requires view tracking — add to Phase 5)
    - Watch count per listing
    - Message/enquiry count per listing
    - Trend over time (weekly/monthly charts)
  - **Audience reach:**
    - "Your listings are visible to X Premium+ members"
    - Geographic distribution of viewers (if location data available)
  - **Business profile management:**
    - Edit business name, type, description, logo
    - Preview how business profile appears on listings

> ⚠️ EDGE CASE: If a Wholesaler downgrades, they lose access to Seller Hub. Their existing Wholesaler-category listings remain visible but they cannot create new ones or access the hub.

> ⚠️ EDGE CASE: Analytics data should be retained even after downgrade (in case they re-upgrade).

---

## Phase 13 — Notifications & Alerts

> Goal: Implement the complete notification system covering in-app and email channels. [Spec §10]

### 13.1 In-App Notifications

- [ ] **Toast notifications** (transient, auto-dismiss after 5 seconds):
  - Watch confirmation: "You are now watching this item and it has been added to your account page."
  - Ad posted confirmation: "Your listing has been successfully posted!"
  - Ad bump applied: "Your listing has been bumped to the top!"
  - Generic success/error messages for form submissions
- [ ] **Persistent notifications** (stored in database, shown in notification centre):
  - New message received
  - Subscription change confirmation
  - Listing status changes
- [ ] **Notification bell icon** in navigation bar:
  - Unread count badge (red dot with number)
  - Dropdown panel showing recent notifications
  - "View all" link to full notifications page in dashboard
- [ ] Mark as read: on click, on viewing notification centre, or bulk "mark all read"

### 13.2 Email Notifications

- [ ] **Password reset email** [Spec §3.4]:
  - Subject: "Reset your Enviromate password"
  - Body: branded template with reset link
  - Link expires after 1 hour
- [ ] **New message alert** [Spec §10]:
  - Sent when a user receives a new message
  - Subject: "You have a new message on Enviromate"
  - Body: sender name, listing title, message preview, link to conversation
  - Throttle: don't send email for every message in rapid conversation — batch or delay (e.g., send if no email sent in last 15 minutes)
- [ ] **Subscription confirmation** [Spec §10]:
  - Sent on successful plan signup or change
  - Subject: "Welcome to Enviromate [Plan Name]!" or "Your plan has been updated"
  - Body: plan details, features, billing info
- [ ] **Welcome email** (on registration):
  - Subject: "Welcome to Enviromate!"
  - Body: getting started guide, link to marketplace, link to post first ad
- [ ] **Email verification** (if implemented in Phase 3.7):
  - Subject: "Verify your Enviromate email"
  - Body: verification link
- [ ] Email templates:
  - Consistent branding (logo, colours, footer)
  - Unsubscribe link (GDPR requirement)
  - Plain text fallback
  - Mobile-responsive HTML

> ⚠️ EDGE CASE: Email sending failures should be queued for retry (use a job queue or Resend's built-in retry).

> ⚠️ EDGE CASE: Users should be able to manage email notification preferences (opt out of marketing emails but not transactional ones like password reset).

> ⚠️ EDGE CASE: Email throttling for messages — if a buyer sends 10 messages in 5 minutes, the seller should receive at most 1 email notification, not 10.

---

## Phase 14 — Third-Party Integrations

> Goal: Integrate external services for image hosting, delivery, and other platform needs. [Spec §12]

### 14.1 AWS S3 Image Upload [Spec §12]

- [ ] Configure AWS S3 bucket (eu-west-1 region)
- [ ] Bucket policy: private by default, served via CloudFront
- [ ] Implement presigned URL generation for direct browser-to-S3 uploads:
  - API route: `POST /api/upload/presign` — returns presigned PUT URL
  - Client uploads directly to S3 (avoids server bottleneck)
  - Validate file type (JPEG, PNG, WebP only) and size (max 5MB) in presign request
- [ ] Image processing pipeline:
  - On upload: generate thumbnail (460×250px smart-crop)
  - Options: AWS Lambda trigger, Sharp.js on server, or CloudFront Functions
  - Store original + thumbnail
  - Generate responsive sizes (e.g., 300w, 600w, 1200w) for srcset
- [ ] Image deletion: when listing is deleted, queue S3 object deletion
- [ ] Image URL structure: `https://[cloudfront-domain]/listings/[listing-id]/[image-id]-[size].jpg`

> ⚠️ EDGE CASE: Presigned URLs expire (e.g., 15 minutes). If upload is slow or delayed, the URL may expire — handle with retry and new presigned URL.

> ⚠️ EDGE CASE: Orphaned images — if user uploads images but never submits the form, images exist in S3 without a listing. Implement a cleanup job (e.g., delete unlinked images older than 24 hours).

> ⚠️ EDGE CASE: File type spoofing — validate MIME type and magic bytes server-side, not just file extension.

### 14.2 AWS CloudFront CDN [Spec §12]

- [ ] Configure CloudFront distribution pointing to S3 bucket
- [ ] Enable smart-crop image transformations (CloudFront Functions or Lambda@Edge)
- [ ] Cache policy: long TTL for immutable images, cache busting via unique keys
- [ ] HTTPS-only delivery
- [ ] Custom domain (e.g., `images.enviromate.co.uk`)

### 14.3 AnyVan Delivery Integration [Spec §12]

- [ ] Research AnyVan API or affiliate/partner program:
  - If API available: deep integration (quote, booking)
  - If affiliate link only: simple external link
- [ ] On listing detail page: "Arrange delivery with AnyVan" button
  - Opens AnyVan with pre-filled pickup location (seller's town/city) and item details
  - OR shows delivery quote widget
- [ ] Track AnyVan referral clicks (for partnership metrics)

> ⚠️ EDGE CASE: AnyVan may not serve all UK locations. If the API returns no availability, show a fallback message: "Delivery not available for this area. Please arrange collection with the seller."

### 14.4 UK Postcode Geocoding

- [ ] Integrate postcodes.io API (free, no key required):
  - `GET https://api.postcodes.io/postcodes/{postcode}` → returns lat, lng, admin_district (city/town)
- [ ] Geocode user postcodes on registration and listing creation
- [ ] Store lat/lng on User and Listing models
- [ ] Use Haversine formula or PostGIS for distance-based queries
- [ ] Cache geocoding results (postcodes don't change)

> ⚠️ EDGE CASE: Invalid postcodes should be caught at form validation. postcodes.io returns 404 for invalid postcodes — use the validation endpoint first.

> ⚠️ EDGE CASE: Some postcodes (e.g., new developments) may not be in the postcodes.io database. Provide fallback or manual location entry.

---

## Phase 15 — Admin Panel

> Goal: Build the internal administration interface for platform management. [Spec §13]

### 15.1 Admin Auth & Layout

- [ ] Admin role check in middleware — only `role = ADMIN` users can access `/admin/*`
- [ ] Admin layout: separate from public site (different nav, sidebar, no footer)
- [ ] Admin dashboard home: summary stats (total users, total listings, MRR, etc.)
- [ ] Create first admin user via database seed or CLI command (not self-registration)

### 15.2 User Management [Spec §13.1]

- [ ] List all users with:
  - Search by name or email
  - Filter by account type/tier
  - Filter by status (active, suspended)
  - Sort by registration date, name, tier
  - Pagination
- [ ] User detail view:
  - Profile information
  - Account tier and subscription status
  - Listings posted (with links)
  - Activity log (sign-ins, actions)
- [ ] Actions:
  - Manually change subscription tier
  - Suspend/unsuspend account
  - Reset password (send reset email)
  - Delete account (with data handling per GDPR)
  - Verify/approve Wholesaler applications (if manual approval is needed)

> ⚠️ EDGE CASE: Suspending a user should hide all their active listings from the marketplace but not delete them. Unsuspending restores visibility.

### 15.3 Listing Management [Spec §13.2]

- [ ] List all listings with:
  - Search by title, description
  - Filter by category, status (Active, Sold, Expired, Removed)
  - Filter by date range
  - Sort by date, price, category
  - Pagination
- [ ] Listing detail view (admin):
  - All listing data + seller info
  - Moderation actions: remove listing (violates terms), edit details, add admin notes
- [ ] Actions:
  - Remove/restore listings
  - Feature/pin listing to homepage
  - Apply/remove Ad Bumps manually
  - View listing analytics (views, watches, messages)

### 15.4 Subscription & Billing [Spec §13.3]

- [ ] Overview dashboard:
  - Total subscribers by tier
  - MRR (Monthly Recurring Revenue)
  - Churn rate
  - Recent subscription events
- [ ] Individual subscription management (linked from user detail)
- [ ] Ad Bump credit management per user

### 15.5 Content Management [Spec §13.4]

- [ ] **Blog post CRUD:**
  - List all posts (published + drafts)
  - Create new post (title, slug, content rich editor, excerpt, cover image, publish date)
  - Edit existing post
  - Delete post
  - Publish / unpublish toggle
- [ ] **Press articles CRUD:**
  - Add/edit/delete press mentions
- [ ] **Partners CRUD:**
  - Add/edit/delete partner organisations
- [ ] **Community projects CRUD:**
  - Add/edit/delete projects
- [ ] **Static page content:**
  - Edit content for About Us sections, How It Works steps, homepage stats
  - Consider a simple key-value CMS or markdown editor

### 15.6 Analytics & Reporting [Spec §13.5]

- [ ] Dashboard with charts/graphs:
  - User registrations over time (by tier)
  - Listings posted over time (by category)
  - Total page views (integrate analytics — e.g., Plausible, PostHog, or custom)
  - Conversion rates: Free → Premium → Premium+ → Wholesaler
  - Geographic distribution of users (heatmap or top cities)
  - Ad Bump usage statistics
  - Listings sold/given away over time
- [ ] Date range filters for all reports
- [ ] Export to CSV (optional)

### 15.7 System Settings [Spec §13.6]

- [ ] Category management: add, edit, remove, reorder categories
- [ ] Category slug management
- [ ] Category access restrictions (tie to subscription tiers)
- [ ] Notification template management (email + in-app)
- [ ] Site-wide settings (maintenance mode, announcement banner)
- [ ] Third-party integration settings (API keys, feature flags)

---

## Phase 16 — Mobile Optimisation & Polish

> Goal: Ensure the platform is fully responsive and provides an excellent mobile experience. [Spec §14]

### 16.1 Responsive Audit

- [ ] Test every page at breakpoints: 320px, 375px, 414px, 768px, 1024px, 1280px, 1440px
- [ ] Fix any layout issues, overflow, or unreadable text
- [ ] Ensure all interactive elements have minimum 44×44px touch targets
- [ ] Verify form inputs are usable on mobile (appropriate keyboard types, no tiny dropdowns)

### 16.2 Mobile Navigation [Spec §14]

- [ ] Hamburger menu icon on viewports < `md`
- [ ] Full-screen or slide-out mobile menu
- [ ] All navigation links accessible
- [ ] Close on: link click, X button, Escape key, swipe, backdrop click
- [ ] Smooth open/close animation

### 16.3 Mobile Listing Experience

- [ ] Listing cards: single column on small screens, 2 columns on larger phones
- [ ] Category tabs: horizontally scrollable with scroll indicators (fade edges)
- [ ] Search/filter: collapsible filter panel (expand/collapse toggle)
- [ ] Listing detail: image gallery with swipe gestures, full-width images

### 16.4 Photo Upload on Mobile [Spec §14]

- [ ] File input `accept="image/*"` with `capture="environment"` option for camera
- [ ] Detect mobile device → show "Take Photo" and "Choose from Library" options
- [ ] Image compression before upload (mobile photos can be 5–15MB)
- [ ] Touch-friendly drag-to-reorder for multiple images

### 16.5 Location Services [Spec §14]

- [ ] Browser Geolocation API integration:
  - "Use my location" button next to location input
  - Request permission → reverse geocode coordinates to postcode
  - Fallback to manual entry if permission denied
- [ ] Permission denied handling: show helpful message, don't block functionality

> ⚠️ EDGE CASE: Geolocation may be inaccurate (especially on desktop). Use as a convenience, not a requirement. Always allow manual override.

### 16.6 Performance Optimisation

- [ ] Image optimisation: Next.js Image component with responsive sizes, WebP format, lazy loading
- [ ] Code splitting: dynamic imports for heavy components (image gallery, rich text editor)
- [ ] Bundle size analysis and optimisation
- [ ] Server components where possible (reduce client-side JS)
- [ ] Database query optimisation (N+1 prevention, proper indexing)
- [ ] API response caching (ISR for listing pages, SWR for client data)
- [ ] Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 16.7 Progressive Enhancement

- [ ] Site must be functional without JavaScript for core browsing (SSR)
- [ ] Forms should work without JS (progressive enhancement with JS for better UX)
- [ ] Graceful degradation for older browsers

---

## Phase 17 — Testing, Security & Launch

> Goal: Comprehensive testing, security hardening, and production deployment.

### 17.1 Testing Strategy

- [ ] **Unit tests:**
  - Utility functions, helpers, formatters
  - Database query functions
  - Auth logic (password hashing, token generation)
  - Price formatting (pence to pounds, "Free" display)
  - Postcode validation
- [ ] **Component tests (React Testing Library):**
  - All shared UI components (Button, Input, Modal, etc.)
  - Listing card rendering with various states
  - Auth forms (validation, error display)
  - Navigation (guest vs logged-in states)
- [ ] **Integration tests:**
  - Auth flows: sign up → sign in → sign out
  - Listing flows: create → view → edit → delete
  - Watch flow: add → view in dashboard → remove
  - Messaging: send message → view in inbox → reply
  - Subscription: checkout → activate → manage → cancel
- [ ] **End-to-end tests (Playwright or Cypress):**
  - Complete user journey: register → post ad → browse → message seller
  - Guest browsing journey: homepage → search → category → listing detail
  - Subscription upgrade journey
  - Password reset journey
  - Mobile viewport E2E tests
- [ ] **API tests:**
  - All API routes: valid inputs, invalid inputs, auth requirements
  - Rate limiting verification
  - Webhook handling tests (mock Stripe webhooks)

### 17.2 Security Hardening

- [ ] **Input sanitisation:** all user inputs sanitised before database write and before render
- [ ] **XSS prevention:** no `dangerouslySetInnerHTML` with user content; use DOMPurify if needed for rich text
- [ ] **CSRF protection:** verify Next.js built-in CSRF handling; add custom tokens if needed
- [ ] **SQL injection:** parameterised queries only (enforced by ORM)
- [ ] **Authentication security:**
  - Passwords: bcrypt with 12+ rounds
  - Session tokens: cryptographically random, HTTP-only cookies
  - Rate limiting on auth endpoints
  - Account lockout after repeated failures (temporary, not permanent)
- [ ] **Authorization:**
  - Every API route validates user identity AND permissions
  - Users can only modify their own resources (listings, profile, messages)
  - Admin routes doubly protected (middleware + per-route check)
  - Subscription tier checks on restricted features (server-side)
- [ ] **Data privacy (GDPR):**
  - Privacy policy covering all data processing
  - Cookie consent banner
  - Right to data export (user can download their data)
  - Right to deletion (user can delete their account and all data)
  - Data retention policy
  - Email unsubscribe mechanisms
- [ ] **Headers:**
  - Content-Security-Policy
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy (disable unused browser features)
- [ ] **Dependency security:** `npm audit`, Dependabot or Snyk integration
- [ ] **Environment variables:** none committed to git, all in `.env.local` and Vercel env config

### 17.3 Accessibility (WCAG 2.1 AA)

- [ ] Semantic HTML throughout (proper heading hierarchy, landmarks, lists)
- [ ] All images have alt text (listing images: title as alt; decorative images: empty alt)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible on all focusable elements
- [ ] Modal focus trapping and restoration
- [ ] ARIA labels for icon-only buttons
- [ ] Colour contrast ratios meet AA standard (4.5:1 for text, 3:1 for large text)
- [ ] Form error messages associated with inputs via `aria-describedby`
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Skip to main content link

### 17.4 SEO

- [ ] Dynamic metadata for all pages (title, description, Open Graph, Twitter cards)
- [ ] Structured data / JSON-LD:
  - Organization (Enviromate)
  - Product (individual listings)
  - BreadcrumbList (navigation breadcrumbs)
  - FAQ (How It Works page)
- [ ] Sitemap.xml generation (dynamic for listings)
- [ ] Robots.txt configuration
- [ ] Canonical URLs on all pages
- [ ] Proper heading hierarchy (single h1 per page)
- [ ] Image alt text and descriptive filenames
- [ ] Internal linking strategy
- [ ] 301 redirects for any URL changes

### 17.5 Deployment & Infrastructure

- [ ] Vercel production deployment configuration:
  - Environment variables set in Vercel dashboard
  - Custom domain: www.enviromate.co.uk
  - SSL certificate (automatic via Vercel)
  - Preview deployments for PRs
- [ ] Database hosting (e.g., PlanetScale, Neon, Supabase, or AWS RDS)
- [ ] S3 + CloudFront configuration for production
- [ ] Stripe production mode (live keys)
- [ ] Email service production configuration
- [ ] Monitoring and error tracking (e.g., Sentry)
- [ ] Uptime monitoring (e.g., Better Uptime)
- [ ] Analytics integration (privacy-friendly: Plausible or PostHog)
- [ ] Logging infrastructure for debugging
- [ ] Backup strategy for database
- [ ] CI/CD pipeline: lint → type-check → test → build → deploy

### 17.6 Pre-Launch Checklist

- [ ] All Phase 1–16 items completed and verified
- [ ] Cross-browser testing: Chrome, Safari, Firefox, Edge (latest versions)
- [ ] Mobile testing: iOS Safari, Android Chrome
- [ ] Load testing: verify the platform handles expected traffic
- [ ] Lighthouse scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- [ ] Legal review: Terms & Conditions, Privacy Policy approved
- [ ] GDPR compliance verified
- [ ] Stripe test transactions completed successfully
- [ ] Email deliverability tested (check spam scores)
- [ ] 404 and error pages working correctly
- [ ] Favicon and app icons configured
- [ ] Open Graph images for social sharing
- [ ] Google Search Console verified and sitemap submitted
- [ ] Analytics tracking verified
- [ ] Error monitoring active and alerting configured
- [ ] Database backups verified
- [ ] Team access and credentials documented securely
- [ ] Launch announcement prepared

---

## Appendix: Implementation Priority Matrix

> Use this to decide what to build first if time is constrained.

| Priority                 | Phases                                         | Rationale                                                                                         |
| ------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **P0 — Must Have** (MVP) | 1, 3, 4, 5, 6, 7 (partial), 8, 14.1, 14.4      | Core marketplace: browse, search, post, auth, images, watchlist                                   |
| **P1 — Should Have**     | 2, 9, 10, 11, 13, 16                           | Full user experience: static pages, messaging, subscriptions, bumps, notifications, mobile polish |
| **P2 — Nice to Have**    | 12, 14.3, 15                                   | Business features: Wholesaler hub, AnyVan, admin panel                                            |
| **P3 — Future**          | 17.6 (load testing), 15.6 (advanced analytics) | Scale and optimisation                                                                            |

---

_Enviromate Execution Plan | Generated February 2026 | Based on Feature Specification v1.0_
