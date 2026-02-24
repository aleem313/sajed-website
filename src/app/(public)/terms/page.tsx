import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Enviromate platform.",
};

export default function TermsPage() {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: February 2026</p>

        {/* Table of Contents */}
        <nav
          className="mt-8 rounded-lg border border-border bg-card p-6"
          aria-label="Table of contents"
        >
          <h2 className="text-sm font-semibold text-foreground">Contents</h2>
          <ol className="mt-3 space-y-1 text-sm text-primary">
            <li>
              <a href="#introduction" className="hover:underline">
                1. Introduction
              </a>
            </li>
            <li>
              <a href="#definitions" className="hover:underline">
                2. Definitions
              </a>
            </li>
            <li>
              <a href="#accounts" className="hover:underline">
                3. User Accounts
              </a>
            </li>
            <li>
              <a href="#listings" className="hover:underline">
                4. Listing Rules
              </a>
            </li>
            <li>
              <a href="#prohibited" className="hover:underline">
                5. Prohibited Items &amp; Conduct
              </a>
            </li>
            <li>
              <a href="#transactions" className="hover:underline">
                6. Transactions
              </a>
            </li>
            <li>
              <a href="#subscriptions" className="hover:underline">
                7. Subscriptions &amp; Payments
              </a>
            </li>
            <li>
              <a href="#ip" className="hover:underline">
                8. Intellectual Property
              </a>
            </li>
            <li>
              <a href="#liability" className="hover:underline">
                9. Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#termination" className="hover:underline">
                10. Termination
              </a>
            </li>
            <li>
              <a href="#governing-law" className="hover:underline">
                11. Governing Law
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                12. Contact
              </a>
            </li>
          </ol>
        </nav>

        <div className="prose mt-8 text-foreground">
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Enviromate (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). These Terms
              and Conditions (&quot;Terms&quot;) govern your use of the Enviromate website at
              www.enviromate.co.uk (&quot;the Platform&quot;) and all related services.
            </p>
            <p>
              By creating an account or using the Platform, you agree to be bound by these Terms. If
              you do not agree, please do not use the Platform.
            </p>
          </section>

          <section id="definitions">
            <h2>2. Definitions</h2>
            <ul>
              <li>
                <strong>&quot;User&quot;</strong> means any person who registers for an account on
                the Platform.
              </li>
              <li>
                <strong>&quot;Listing&quot;</strong> means an advertisement for building materials
                posted on the Platform.
              </li>
              <li>
                <strong>&quot;Seller&quot;</strong> means a User who posts a Listing.
              </li>
              <li>
                <strong>&quot;Buyer&quot;</strong> means a User who responds to a Listing.
              </li>
              <li>
                <strong>&quot;Subscription&quot;</strong> means a paid plan providing enhanced
                features.
              </li>
            </ul>
          </section>

          <section id="accounts">
            <h2>3. User Accounts</h2>
            <p>
              To use certain features of the Platform, you must create an account. You agree to
              provide accurate, current, and complete information during registration and to keep
              your account details up to date.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your password and for all
              activities that occur under your account. You must notify us immediately of any
              unauthorised use.
            </p>
            <p>
              You must be at least 18 years old to create an account. Accounts are for individual
              use only unless you have a Wholesaler subscription.
            </p>
          </section>

          <section id="listings">
            <h2>4. Listing Rules</h2>
            <p>
              All listings must be for genuine building materials, tools, or related items. Listings
              must include accurate descriptions, fair pricing, and clear photographs where
              possible.
            </p>
            <p>
              Free-tier accounts are limited in the number of active listings they may have at any
              time. Paid subscriptions provide increased or unlimited listing allowances.
            </p>
            <p>
              We reserve the right to remove any listing that violates these Terms or that we
              consider inappropriate, misleading, or fraudulent.
            </p>
          </section>

          <section id="prohibited">
            <h2>5. Prohibited Items &amp; Conduct</h2>
            <p>You must not list or sell:</p>
            <ul>
              <li>Items that are stolen, counterfeit, or illegal to sell in the UK</li>
              <li>Hazardous materials without appropriate warnings and certifications</li>
              <li>Items unrelated to building, construction, or home improvement</li>
              <li>Services (the Platform is for physical goods only)</li>
            </ul>
            <p>You must not:</p>
            <ul>
              <li>Create multiple accounts to circumvent listing limits</li>
              <li>Post misleading, false, or deceptive listings</li>
              <li>Harass, threaten, or abuse other users</li>
              <li>Use the Platform for any unlawful purpose</li>
              <li>Attempt to circumvent any security features of the Platform</li>
            </ul>
          </section>

          <section id="transactions">
            <h2>6. Transactions</h2>
            <p>
              Enviromate is a marketplace that connects buyers and sellers. We do not process
              payments between users, handle delivery, or act as a party to any transaction.
            </p>
            <p>
              All transactions are conducted privately between the buyer and seller. We are not
              responsible for the quality, safety, legality, or delivery of items listed on the
              Platform.
            </p>
            <p>
              Users are encouraged to inspect items before completing a purchase and to use safe,
              well-lit public meeting points for collections.
            </p>
          </section>

          <section id="subscriptions">
            <h2>7. Subscriptions &amp; Payments</h2>
            <p>
              Paid subscriptions are billed monthly via Stripe. You may cancel at any time, and your
              subscription will remain active until the end of the current billing period.
            </p>
            <p>
              Prices are displayed in GBP. Wholesaler subscriptions are subject to VAT at the
              prevailing UK rate. We reserve the right to change subscription prices with 30 days
              notice.
            </p>
            <p>
              Refunds are handled on a case-by-case basis. Contact us at hello@enviromate.co.uk for
              refund enquiries.
            </p>
          </section>

          <section id="ip">
            <h2>8. Intellectual Property</h2>
            <p>
              All content, design, logos, and software on the Platform are the property of
              Enviromate or its licensors and are protected by UK and international copyright laws.
            </p>
            <p>
              By posting a listing, you grant Enviromate a non-exclusive, royalty-free licence to
              display your listing content (including images) on the Platform and in marketing
              materials.
            </p>
          </section>

          <section id="liability">
            <h2>9. Limitation of Liability</h2>
            <p>
              The Platform is provided &quot;as is&quot; without warranties of any kind. To the
              maximum extent permitted by law, Enviromate shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of the Platform.
            </p>
            <p>
              Our total liability for any claim arising from your use of the Platform shall not
              exceed the amount you paid to us in subscription fees in the 12 months preceding the
              claim.
            </p>
          </section>

          <section id="termination">
            <h2>10. Termination</h2>
            <p>
              We may suspend or terminate your account at any time if you breach these Terms. You
              may delete your account at any time through your account settings.
            </p>
            <p>
              Upon termination, your listings will be removed and your account data will be handled
              in accordance with our Privacy Policy and applicable data protection laws.
            </p>
          </section>

          <section id="governing-law">
            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of England and
              Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of
              England and Wales.
            </p>
          </section>

          <section id="contact">
            <h2>12. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:hello@enviromate.co.uk">hello@enviromate.co.uk</a> or via the contact
              form on our <a href="/about-us#contact">About Us</a> page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
