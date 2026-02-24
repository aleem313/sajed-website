# ENVIROMATE — Product Feature Specification Document

> **Platform:** www.enviromate.co.uk
> **Version:** 1.0 | February 2026
> **Type:** Web-based Marketplace (Desktop & Mobile)
> **Market:** United Kingdom (Global Expansion Planned)

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [User Roles & Access Levels](#2-user-roles--access-levels)
3. [Authentication Module](#3-authentication-module)
4. [Homepage](#4-homepage)
5. [Marketplace Module](#5-marketplace-module)
6. [Post an Ad Module](#6-post-an-ad-module)
7. [Subscription Plans](#7-subscription-plans)
8. [User Account Dashboard](#8-user-account-dashboard)
9. [Product Categories](#9-product-categories)
10. [Notifications & Alerts](#10-notifications--alerts)
11. [Static & Content Pages](#11-static--content-pages)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Admin Panel (Inferred)](#13-admin-panel-inferred)
14. [Mobile Experience](#14-mobile-experience)
15. [Future / Expansion Plans](#15-stated-future-plans)

- [Appendix A: URL Structure](#appendix-a-url-structure)
- [Appendix B: Subscription Plan Matrix](#appendix-b-subscription-plan-matrix)

---

## 1. Platform Overview

Enviromate is an award-winning, closed-loop online marketplace where individuals, tradespeople, and businesses in the UK can buy, sell, or donate leftover building materials. The platform promotes a circular economy by keeping surplus construction materials in circulation, reducing landfill waste and lowering costs across the construction and DIY industry.

> **Core Mission:** The UK construction industry consumes 420 million tonnes of products and materials per annum. Enviromate aims to reduce that environmental burden by enabling reuse, resale, and redistribution of surplus building materials.

### 1.1 Platform Type

Classified ads / P2P & B2C marketplace — **no direct payment processing** between parties. Enviromate facilitates discovery and contact only; financial transactions are handled privately between buyers and sellers.

### 1.2 Tech Stack & Infrastructure (Observed)

| Layer                | Technology                                                   |
| -------------------- | ------------------------------------------------------------ |
| Frontend             | Responsive web app (desktop & mobile browser)                |
| Image CDN            | AWS CloudFront + Amazon S3 (eu-west-1)                       |
| Image Processing     | CloudFront smart-crop transformations (460x250px thumbnails) |
| Authentication       | Email + password with password reset flow                    |
| Payments/Billing     | Subscription billing (likely Stripe or similar)              |
| Delivery Integration | AnyVan (third-party delivery partner)                        |
| Development Partner  | Kit and Caboodle Media                                       |

### 1.3 Target Audience

- DIY Enthusiasts & home improvers
- Builders, tradespeople, multi-traders
- Plumbers, electricians, joiners, decorators, plasterers
- Self-builders and upcyclers
- Wholesalers and building merchants
- Landscape/garden maintenance professionals

---

## 2. User Roles & Access Levels

The platform defines five distinct access levels based on account type:

| Role            | Plan       | Price           | Key Capabilities                                                | Access Level |
| --------------- | ---------- | --------------- | --------------------------------------------------------------- | ------------ |
| Guest / Visitor | None       | Free            | Browse marketplace, view listings, search & filter              | Read-only    |
| Free User       | Free       | £0              | Browse, buy, sell, post ads, watch items, message sellers       | Basic        |
| Premium User    | Premium    | £2.99/mo        | Free features + 3 Ad Bumps/month + unlimited ads & images       | Medium       |
| Premium+ User   | Premium+   | £19.99/mo       | Premium + 6 bumps + wholesale ad access + exclusive discounts   | High         |
| Wholesaler      | Wholesaler | £29.99/mo + VAT | All features + Seller Hub + 9 bumps + sell to Premium+ audience | Full         |

---

## 3. Authentication Module

### 3.1 Sign Up — Free Quick Registration

A simplified registration modal available for quick sign-up with minimal fields. Defaults to Free plan.

| Field         | Type     | Required | Description                                                                  |
| ------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| First Name    | Text     | Yes      | User's given name                                                            |
| Last Name     | Text     | Yes      | User's family/surname                                                        |
| Postcode      | Text     | Yes      | UK postcode; used for location-based listing and search relevance            |
| Email Address | Email    | Yes      | Must be a valid email format; used as login credential and for notifications |
| Password      | Password | Yes      | Masked input; used for account authentication                                |

> **NOTE:** This quick sign-up defaults to a Free plan. Full plan selection is available in the full sign-up flow.

**Submit Button:** `sign up`
**Alternate Action:** "Already have an account? Sign in here" link

---

### 3.2 Sign Up — Full Account Registration

The full registration form includes all fields required to set up a complete account, including occupation and optional business/wholesaler details.

| Field         | Type         | Required        | Description                                                                                                                                                                                                                                     |
| ------------- | ------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First Name    | Text         | Yes             | User's given name                                                                                                                                                                                                                               |
| Last Name     | Text         | Yes             | User's family/surname                                                                                                                                                                                                                           |
| Postcode      | Text         | Yes             | UK postcode used for location filtering and nearby listings                                                                                                                                                                                     |
| Email Address | Email        | Yes             | Primary identifier and communication address; must be unique in the system                                                                                                                                                                      |
| Password      | Password     | Yes             | Secure password input; masked on entry                                                                                                                                                                                                          |
| Occupation    | Dropdown     | Yes (trade)     | Builder/Multi Trade, Landscape/Garden Maintenance, Plumbing/Heating Engineer, Electrician, Joiner/Carpenter, Maintenance, Decorator, Plasterer, Kitchen Fitter, Bathroom Fitter, Tradesman, DIY Enthusiast, Upcycler, Self Builder, Other Trade |
| Business Name | Text         | Wholesaler only | Company or trading name; visible on wholesaler listings                                                                                                                                                                                         |
| Business Type | Dropdown     | Wholesaler only | Builders Merchant, Electrical Wholesaler, Plumbers Merchant, Decorating Merchant, Tool Merchant, Reclamation Yard, Other                                                                                                                        |
| Account Type  | Radio/Select | Yes             | Free / Premium (£2.99) / Premium+ (£19.99) / Wholesalers (£29.99)                                                                                                                                                                               |

> **NOTE:** Business Name and Business Type fields are **conditionally shown** only when the Wholesaler account type is selected.

**Submit Button:** `sign up`
**Alternate Action:** "Already have an account?" link

---

### 3.3 Sign In

Returning users authenticate using email and password via a modal dialog.

| Field         | Type     | Required | Description                                  |
| ------------- | -------- | -------- | -------------------------------------------- |
| Email Address | Email    | Yes      | Registered email address used during sign-up |
| Password      | Password | Yes      | Account password; masked on entry            |

**Submit Button:** `sign in`
**On Success:** User is redirected to account dashboard or the page they were previously on.
**On Failure:** Inline error message displayed for invalid credentials.
**Alternate Action:** "I've forgotten my details" — opens password reset flow.
**Sign Up Link:** "Don't have an account?" → `/sign-up`

---

### 3.4 Forgot Password / Password Reset

Accessible from the Sign In modal via the "I've forgotten my details" link.

| Field         | Type  | Required | Description                                   |
| ------------- | ----- | -------- | --------------------------------------------- |
| Email Address | Email | Yes      | The email address associated with the account |

**Flow:**

1. User enters their registered email address
2. User clicks `reset password`
3. System displays confirmation: _"Your password has been reset, please check your email"_
4. System sends a password reset link to the provided email
5. User clicks the link in email to set a new password
6. User is redirected to Sign In

**Alternate Action:** "Don't have an account? Sign up here" link

---

## 4. Homepage

### 4.1 Navigation Bar

Persistent top navigation present on all pages.

| Element           | Type        | URL / Behaviour                                             | Visible To  |
| ----------------- | ----------- | ----------------------------------------------------------- | ----------- |
| Create an Account | Link/Button | `/sign-up`                                                  | Guests only |
| Sign In           | Button      | Opens sign-in modal overlay                                 | Guests only |
| The Marketplace   | Link        | `/marketplace`                                              | All users   |
| Post a Free Ad    | CTA Button  | `/post-ad` (requires login — redirects to sign-up if guest) | All users   |

---

### 4.2 Hero Search Bar

Prominent search section on the homepage allowing discovery without logging in.

| Field    | Type       | Required | Description                                                                                     |
| -------- | ---------- | -------- | ----------------------------------------------------------------------------------------------- |
| Keyword  | Text Input | No       | Free-text search for item names/descriptions (e.g., "bricks", "timber", "copper pipe")          |
| Location | Text Input | No       | Town, city, or UK postcode to centre the geographic search                                      |
| Distance | Dropdown   | No       | Radius filter: **5 miles / 25 miles / 50 miles / 100 miles / 100+ miles** (default: 100+ miles) |

**Search triggers:** Pressing Enter or clicking the search icon submits the query to `/marketplace` with filters applied as URL params.

---

### 4.3 Category Navigation

Horizontal tabs/links for quick category-based filtering of the marketplace.

| Category              | URL Slug                  | Description                                   |
| --------------------- | ------------------------- | --------------------------------------------- |
| Building              | `/c/building`             | General construction materials                |
| Plumbing              | `/c/plumbing`             | Pipes, fittings, boilers, radiators           |
| Carpentry             | `/c/carpentry`            | Timber, doors, skirting boards                |
| Electrical            | `/c/electrical`           | Cable, switches, sockets, lighting            |
| Painting & Decorating | `/c/paint-and-decorating` | Paints, wallpaper, brushes, fillers           |
| Tools                 | `/c/tools`                | Hand tools and power tools                    |
| Free                  | `/c/free`                 | Items listed at no cost                       |
| Other                 | `/c/other`                | Miscellaneous items                           |
| Wholesalers           | `/c/wholesalers`          | Bulk trade surplus (Premium+ access required) |

---

### 4.4 Recently Added Listings Section

A preview grid of the most recently posted listings. Each card displays:

- Item thumbnail photo (460×250px, smart-cropped via CloudFront CDN)
- Item title / name
- Price (e.g., £10.00) or badge: **Free** / **For Sale**
- Watch item shortcut (saves to account)

**CTA:** "Visit the Marketplace" button → `/marketplace`

---

### 4.5 Statistics / Mission Section

Static informational section displaying UK construction industry waste statistics in four infographic tiles, reinforcing the platform's environmental mission.

---

### 4.6 Pricing / Packages Section

Displays the four subscription tiers side-by-side with feature bullets and sign-up CTAs. See [Section 7](#7-subscription-plans) for full detail.

---

### 4.7 Footer Navigation

| Link               | URL                   | Purpose                             |
| ------------------ | --------------------- | ----------------------------------- |
| The Marketplace    | `/marketplace`        | Browse all listings                 |
| Create an Account  | `/sign-up`            | Registration page                   |
| Partners           | `/partners`           | Enviromate partner organisations    |
| How It Works       | `/how-it-works`       | Platform explainer                  |
| Our Mission        | `/about-us#mission`   | Mission statement anchor            |
| Community Projects | `/community-projects` | Charitable/community build projects |
| Video              | `/about-us#video`     | Explainer video anchor              |
| Contact Us         | `/about-us#contact`   | Contact form anchor                 |
| Our Blog           | `/blog`               | News, tips, industry content        |
| In the Press       | `/press`              | Media features and press coverage   |
| Terms              | `/terms`              | Terms and conditions                |
| Privacy            | `/privacy`            | Privacy policy                      |

---

## 5. Marketplace Module

### 5.1 Marketplace Listing Page (`/marketplace`)

The core browsing interface. Accessible to all users including guests. Displays all active listings by default, with tools to narrow results. Breadcrumb navigation shows: Home > Marketplace.

---

### 5.2 Search & Filter System

| Field                | Type       | Required | Description                                                            |
| -------------------- | ---------- | -------- | ---------------------------------------------------------------------- |
| Keyword              | Text Input | No       | Searches listing titles and descriptions. Free-text, case-insensitive. |
| Location             | Text Input | No       | UK town, city or postcode. Platform centres distance filter on this.   |
| Distance             | Dropdown   | No       | Radius: 5 miles / 25 miles / 50 miles / 100 miles / 100+ miles         |
| Category             | Tab / Link | No       | Filter by category slug (see Section 9)                                |
| Show (results count) | Dropdown   | No       | Number of listings to display per page                                 |

> **NOTE:** The Wholesalers category requires a **Premium+ or Wholesaler** account to view.

---

### 5.3 Listing Card (Grid Item)

Each listing card in the grid view displays:

- Thumbnail image (460×250px, smart-cropped)
- Listing title
- Price or **Free** badge
- Status badge: **For Sale** or **Free**
- Watch/Save button (adds to logged-in user's saved items; guests are prompted to sign in)

Clicking a listing card opens the full listing detail view.

---

### 5.4 Listing Detail View

| Field / Element     | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| Photos              | Gallery of one or more images uploaded by the seller                   |
| Title               | Name/headline of the item                                              |
| Description         | Full text: condition, quantity, dimensions, usage history, etc.        |
| Price               | Asking price in GBP, or "Free"                                         |
| Location            | Seller's location at town/city level (derived from postcode)           |
| Category            | Which category the item belongs to                                     |
| Seller Info         | Seller's display name and contact details (visible to logged-in users) |
| Watch Item Button   | Saves the listing to the logged-in user's watchlist                    |
| Message Seller      | Opens the in-platform direct messaging UI                              |
| Make an Offer       | Initiates offer/negotiation via the messaging system                   |
| Delivery via AnyVan | Link/integration to AnyVan delivery partner for large item transport   |

---

### 5.5 Watch / Save Items

- Click the Watch button on a listing card or on the detail page
- Confirmation toast/notification: _"You are now watching this item and it has been added to your account page."_
- Saved items accessible from the user's account dashboard watchlist
- Guests clicking Watch are prompted to sign in or register
- Items can be removed from the watchlist at any time

---

### 5.6 Messaging System

- Initiated from the listing detail page via **"Message Seller"** CTA
- Supports text-based direct messages between buyer and seller
- Used to: make offers, arrange collection/delivery, ask questions
- **Enviromate does NOT process payments** — all financial transactions are arranged privately between parties
- Delivery can be arranged separately via AnyVan integration

---

## 6. Post an Ad Module

### 6.1 Overview

Any registered user (any tier) can post a listing. Accessible via the **"Post a Free Ad"** CTA in the navigation bar. Unauthenticated users are redirected to the sign-up/sign-in page.

---

### 6.2 Ad Posting Form Fields

| Field                | Type              | Required    | Description                                                                                                                                 |
| -------------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Photo(s)             | Image Upload      | Recommended | Upload from device camera roll or take a new photo. Multiple images supported. Unlimited images on Premium, Premium+, and Wholesaler plans. |
| Product Name / Title | Text Input        | Yes         | Short, descriptive name for the item. Appears as the listing headline.                                                                      |
| Description          | Textarea          | Yes         | Full details: condition, quantity, dimensions, age, reason for selling, etc.                                                                |
| Price                | Number Input (£)  | Yes         | Asking price in GBP. Enter 0 or select "Free" for items being given away.                                                                   |
| Listing Type         | Toggle / Select   | Yes         | **For Sale** or **Free**                                                                                                                    |
| Location             | Text / Postcode   | Yes         | Seller's location for proximity search. Pre-filled from account postcode but can be overridden.                                             |
| Category             | Dropdown / Select | Yes         | Building / Plumbing / Carpentry / Electrical / Painting & Decorating / Tools / Free / Other / Wholesalers                                   |

> **NOTE:** The Wholesalers category is only available to users on the **Wholesaler subscription tier**.

---

### 6.3 Ad Bump Feature

Ad Bump moves an existing listing back to the top of marketplace search results, giving it renewed visibility.

| Plan       | Bumps Included/Month              | Reset Cycle |
| ---------- | --------------------------------- | ----------- |
| Free       | 0 (pay-per-bump may be available) | N/A         |
| Premium    | 3                                 | Monthly     |
| Premium+   | 6                                 | Monthly     |
| Wholesaler | 9                                 | Monthly     |

**Rules:**

- Unused bumps do **not** roll over to the next month
- Applied from the user's active listings dashboard
- When bumped, listing appears at the top of relevant search/category results

---

## 7. Subscription Plans

### 7.1 Plan Comparison

| Feature                    | Free      | Premium      | Premium+      | Wholesaler    |
| -------------------------- | --------- | ------------ | ------------- | ------------- |
| Post & browse listings     | ✅        | ✅           | ✅            | ✅            |
| No selling/commission fees | ✅        | ✅           | ✅            | ✅            |
| Watch / save items         | ✅        | ✅           | ✅            | ✅            |
| Direct messaging           | ✅        | ✅           | ✅            | ✅            |
| Ad Bumps / month           | 0         | 3            | 6             | 9             |
| Unlimited ads              | ❌        | ✅           | ✅            | ✅            |
| Unlimited images per ad    | ❌        | ✅           | ✅            | ✅            |
| Wholesale ad access        | ❌        | ❌           | ✅            | ✅            |
| Exclusive discount offers  | ❌        | ❌           | ✅            | ✅            |
| Seller Hub                 | ❌        | ❌           | ❌            | ✅            |
| List to Premium+ community | ❌        | ❌           | ❌            | ✅            |
| Business profile           | ❌        | ❌           | ❌            | ✅            |
| Cancel anytime             | N/A       | ✅           | ✅            | ✅            |
| VAT applied                | No        | No           | No            | Yes           |
| **Price**                  | **£0.00** | **£2.99/mo** | **£19.99/mo** | **£29.99/mo** |

---

### 7.2 Plan Descriptions

#### Free — £0.00

Entry-level tier. Allows basic buying and selling at no cost. Limited number of ads and images. No commission fees on any sales.

#### Premium — £2.99/month

For regular buyers and sellers. Includes unlimited ads and image uploads, plus 3 Ad Bumps per month. No lock-in — cancel at any time.

#### Premium+ — £19.99/month

Full consumer experience. Includes access to the exclusive Wholesale Ads category, 6 Ad Bumps per month, and exclusive discount offers from platform partners. Ideal for professionals who frequently buy and sell.

#### Wholesalers — £29.99/month (ex VAT)

Built for businesses — builders merchants, electrical wholesalers, plumbers merchants, decorating merchants, tool merchants, and reclamation yards. Includes the **Seller Hub** (dedicated business dashboard), ability to list to the Premium+ community, 9 Ad Bumps per month, and full exposure to Enviromate's 1M+ monthly page views.

---

## 8. User Account Dashboard

The logged-in user's personal control centre for managing all account activity.

| Section                 | Description                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------- |
| My Listings             | View, manage, and edit all ads posted by the user. Apply Ad Bumps. Mark items as sold. |
| Watched Items           | All listings the user has saved via the Watch button. Can be removed at any time.      |
| Messages / Inbox        | All conversations with buyers and sellers. Reply and negotiate deals.                  |
| Subscription Management | View current plan, upgrade, downgrade, or cancel.                                      |
| Profile Settings        | Update: name, postcode, email, password, occupation.                                   |
| Ad Bump Credits         | View remaining monthly bump credits and apply to active listings.                      |
| Notifications           | Item watched confirmations, new messages, subscription updates.                        |

> **NOTE:** Wholesaler accounts also see a **Seller Hub** section with additional business tools.

---

### 8.1 Seller Hub (Wholesaler Tier Only)

A dedicated business management interface exclusive to Wholesaler accounts:

- Manage bulk/surplus stock listings
- View sales reach and engagement analytics
- Access to the Premium+ buyer audience
- Business profile management (company name, type, contact info)
- Manage and update listings at scale

---

## 9. Product Categories

All listings are organised into the following 9 categories, each with a dedicated URL.

| Category              | URL                       | Access                      | Typical Items                                                                    |
| --------------------- | ------------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| Building              | `/c/building`             | All users                   | Bricks, blocks, sand, cement, insulation, roofing, lintels, damp proof course    |
| Plumbing              | `/c/plumbing`             | All users                   | Pipes (copper, plastic, PVC), fittings, boilers, radiators, tanks, valves, pumps |
| Carpentry             | `/c/carpentry`            | All users                   | Timber, plywood, MDF, skirting boards, architraves, doors, frames, hardwood      |
| Electrical            | `/c/electrical`           | All users                   | Cable, conduit, consumer units, sockets, switches, lighting fixtures             |
| Painting & Decorating | `/c/paint-and-decorating` | All users                   | Paint, varnish, wallpaper, paste, filler, brushes, rollers, sandpaper            |
| Tools                 | `/c/tools`                | All users                   | Hand tools, power tools, drills, saws, levels, tape measures                     |
| Free                  | `/c/free`                 | All users                   | Any category item listed at £0 — collection only, no payment required            |
| Other                 | `/c/other`                | All users                   | Miscellaneous items not fitting defined categories                               |
| Wholesalers           | `/c/wholesalers`          | **Premium+ and above only** | Bulk surplus stock from registered trade wholesalers and merchants               |

---

## 10. Notifications & Alerts

| Notification              | Channel              | Content                                                                      | Recipients            |
| ------------------------- | -------------------- | ---------------------------------------------------------------------------- | --------------------- |
| Watch Confirmation        | In-app (modal/toast) | "You are now watching this item and it has been added to your account page." | Logged-in users       |
| Password Reset Email      | Email                | Contains reset link for account password change                              | All registered users  |
| New Message Alert         | Email + In-app       | Notifies user of a new message from a buyer or seller                        | All registered users  |
| Subscription Confirmation | Email                | Sent on successful plan signup or change                                     | Paid plan subscribers |
| Ad Posted Confirmation    | In-app               | Confirms listing has been successfully posted                                | All registered users  |
| Ad Bump Applied           | In-app               | Confirms bump applied and listing moved to top                               | All registered users  |

---

## 11. Static & Content Pages

| Page               | URL                   | Content                                                      |
| ------------------ | --------------------- | ------------------------------------------------------------ |
| Homepage           | `/`                   | Hero search, recent listings, stats, pricing, footer         |
| Marketplace        | `/marketplace`        | Full listings grid with search/filter                        |
| How It Works       | `/how-it-works`       | Step-by-step guide to using the platform                     |
| Sign Up            | `/sign-up`            | Full registration page with plan selection                   |
| About Us           | `/about-us`           | Company story, mission, facts & figures, video, contact form |
| About — Mission    | `/about-us#mission`   | Mission statement section                                    |
| About — Facts      | `/about-us#facts`     | Industry statistics and impact data                          |
| About — Story      | `/about-us#story`     | Company founding story                                       |
| About — Video      | `/about-us#video`     | Embedded explainer video                                     |
| About — Contact    | `/about-us#contact`   | Contact form                                                 |
| Partners           | `/partners`           | Platform partner organisations and sponsors                  |
| Community Projects | `/community-projects` | Charitable builds supported by donated materials             |
| Blog               | `/blog`               | Industry tips, sustainability articles, DIY guides           |
| In the Press       | `/press`              | Media mentions, awards, press coverage                       |
| Terms & Conditions | `/terms`              | Legal terms of platform use                                  |
| Privacy Policy     | `/privacy`            | GDPR-compliant data handling policy                          |

---

## 12. Third-Party Integrations

| Partner                      | Type             | Function                                                                                               | Used By          |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------ | ---------------- |
| AnyVan                       | Delivery Partner | Integrated delivery booking for large/heavy items. Buyers can arrange transport from the listing page. | All users        |
| AWS S3 (eu-west-1)           | Media Storage    | All listing images stored on Amazon S3                                                                 | Backend/System   |
| AWS CloudFront               | CDN              | Images served globally with smart-crop transformations (460×250px thumbnails)                          | Backend/System   |
| Subscription/Payment Gateway | Billing          | Recurring subscription billing for Premium, Premium+, Wholesaler tiers (likely Stripe)                 | Paid subscribers |
| Kit and Caboodle Media       | Development      | Platform development and infrastructure partner                                                        | System           |

---

## 13. Admin Panel (Inferred)

> The admin panel is not publicly accessible. The following features are inferred from the platform's public-facing behaviour and standard marketplace best practices.

### 13.1 User Management

- View, search, and filter all registered users
- View user profile and account tier
- Manually upgrade, downgrade, or suspend user accounts
- Verify and approve Wholesaler account applications
- Reset user passwords / manage authentication issues
- View user activity (listings posted, messages sent, items watched)

### 13.2 Listings Management

- View all active, expired, and removed listings
- Moderate and remove listings that violate terms of use
- Edit or correct listing details where necessary
- Feature or pin listings to the homepage
- Manually apply or remove Ad Bumps

### 13.3 Subscription & Billing Management

- View all active subscriptions by tier
- Process refunds or resolve billing disputes
- Manage Ad Bump credit allocations per user
- View MRR (Monthly Recurring Revenue) by plan

### 13.4 Content Management

- Create and publish blog posts
- Manage press mentions and partner pages
- Update community projects listings
- Manage static page content (About Us, How It Works, etc.)

### 13.5 Analytics & Reporting

- Total users registered (by tier)
- Total active listings (by category)
- Page views (platform reports 1M+ per month)
- Listings posted, sold, or given away over time
- Ad Bump usage statistics
- Conversion rate from Free to paid tiers
- Geographic distribution of users and listings

### 13.6 Category & System Settings

- Add, edit, or remove marketplace categories
- Manage category slug URLs
- Restrict category access by subscription tier (e.g., Wholesalers category)
- Configure site-wide notification templates (email + in-app)
- Manage AnyVan and other third-party integration settings

---

## 14. Mobile Experience

Enviromate is a responsive web application fully accessible via mobile browser.

| Feature           | Detail                                                                |
| ----------------- | --------------------------------------------------------------------- |
| Responsive Layout | Adapts to all screen sizes (mobile, tablet, desktop)                  |
| Photo Upload      | Capture new photo via device camera OR select from camera roll        |
| Location Services | GPS/location integration for proximity-based search                   |
| Mobile Navigation | Hamburger/compact menu for mobile viewports                           |
| Touch-Friendly UI | Filter controls, category tabs, and listing cards optimised for touch |
| Listing Cards     | Condensed grid adapts to single or double column on small screens     |

> **NOTE:** A native mobile app (iOS/Android) is not publicly listed. The platform is fully functional via mobile web browser.

---

## 15. Stated Future Plans

| Initiative                    | Timeline  | Description                                                       |
| ----------------------------- | --------- | ----------------------------------------------------------------- |
| US Market Launch              | Near-term | Platform expansion to the United States                           |
| Australia Market Launch       | Near-term | Platform expansion to Australia                                   |
| Europe Market Launch          | Near-term | EU-wide marketplace rollout                                       |
| Global Marketplace            | Long-term | Goal to become a global platform for surplus building materials   |
| Continued Feature Development | Ongoing   | Platform commits to building and adding new features continuously |

---

## Appendix A: URL Structure

| URL                       | Page / Purpose                        |
| ------------------------- | ------------------------------------- |
| `/`                       | Homepage                              |
| `/marketplace`            | Full listings browse page             |
| `/c/building`             | Category: Building                    |
| `/c/plumbing`             | Category: Plumbing                    |
| `/c/carpentry`            | Category: Carpentry                   |
| `/c/electrical`           | Category: Electrical                  |
| `/c/paint-and-decorating` | Category: Painting & Decorating       |
| `/c/tools`                | Category: Tools                       |
| `/c/free`                 | Category: Free Items                  |
| `/c/other`                | Category: Other                       |
| `/c/wholesalers`          | Category: Wholesalers (Premium+ only) |
| `/sign-up`                | User registration with plan selection |
| `/post-ad`                | Post a new listing (auth required)    |
| `/how-it-works`           | Platform explainer                    |
| `/about-us`               | About, mission, video, contact        |
| `/about-us#mission`       | Mission section anchor                |
| `/about-us#facts`         | Facts & figures section anchor        |
| `/about-us#story`         | Our story section anchor              |
| `/about-us#contact`       | Contact form anchor                   |
| `/about-us#video`         | Video section anchor                  |
| `/partners`               | Partner organisations                 |
| `/community-projects`     | Community build projects              |
| `/blog`                   | Blog content hub                      |
| `/press`                  | Press & media coverage                |
| `/terms`                  | Terms and conditions                  |
| `/privacy`                | Privacy policy                        |

---

## Appendix B: Subscription Plan Matrix

> All plans carry **zero selling commission fees**. Enviromate earns revenue through subscription fees only, not per-transaction charges.

| Feature          | Free    | Premium   | Premium+                 | Wholesaler             |
| ---------------- | ------- | --------- | ------------------------ | ---------------------- |
| Price            | £0      | £2.99/mo  | £19.99/mo                | £29.99/mo + VAT        |
| Ad Bumps         | 0       | 3/month   | 6/month                  | 9/month                |
| Ads Allowed      | Limited | Unlimited | Unlimited                | Unlimited              |
| Images per Ad    | Limited | Unlimited | Unlimited                | Unlimited              |
| Wholesale Access | No      | No        | Yes                      | Yes                    |
| Discount Offers  | No      | No        | Yes                      | Yes                    |
| Seller Hub       | No      | No        | No                       | Yes                    |
| Target Audience  | General | General   | General + Wholesale view | Full Premium+ audience |
| Business Profile | No      | No        | No                       | Yes                    |
| Cancel Anytime   | N/A     | Yes       | Yes                      | Yes                    |
| VAT Applied      | No      | No        | No                       | Yes                    |

---

_Enviromate Feature Specification | v1.0 | February 2026 | enviromate.co.uk_
