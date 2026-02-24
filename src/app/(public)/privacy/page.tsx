import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Enviromate's privacy policy — how we collect, use, store, and protect your personal data in compliance with GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: February 2026</p>

        {/* Table of Contents */}
        <nav
          className="mt-8 rounded-lg border border-border bg-card p-6"
          aria-label="Table of contents"
        >
          <h2 className="text-sm font-semibold text-foreground">Contents</h2>
          <ol className="mt-3 space-y-1 text-sm text-primary">
            <li>
              <a href="#who-we-are" className="hover:underline">
                1. Who We Are
              </a>
            </li>
            <li>
              <a href="#data-collection" className="hover:underline">
                2. Data We Collect
              </a>
            </li>
            <li>
              <a href="#how-we-use" className="hover:underline">
                3. How We Use Your Data
              </a>
            </li>
            <li>
              <a href="#legal-basis" className="hover:underline">
                4. Legal Basis for Processing
              </a>
            </li>
            <li>
              <a href="#data-sharing" className="hover:underline">
                5. Data Sharing
              </a>
            </li>
            <li>
              <a href="#data-storage" className="hover:underline">
                6. Data Storage &amp; Security
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:underline">
                7. Cookies
              </a>
            </li>
            <li>
              <a href="#your-rights" className="hover:underline">
                8. Your Rights
              </a>
            </li>
            <li>
              <a href="#data-retention" className="hover:underline">
                9. Data Retention
              </a>
            </li>
            <li>
              <a href="#children" className="hover:underline">
                10. Children&apos;s Privacy
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:underline">
                11. Changes to This Policy
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                12. Contact Us
              </a>
            </li>
          </ol>
        </nav>

        <div className="prose mt-8 text-foreground">
          <section id="who-we-are">
            <h2>1. Who We Are</h2>
            <p>
              Enviromate operates the website www.enviromate.co.uk (&quot;the Platform&quot;), a
              marketplace for buying and selling surplus building materials in the United Kingdom.
            </p>
            <p>
              For the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data
              Protection Act 2018, Enviromate is the data controller responsible for your personal
              data.
            </p>
          </section>

          <section id="data-collection">
            <h2>2. Data We Collect</h2>
            <p>We collect the following types of personal data:</p>
            <ul>
              <li>
                <strong>Account information:</strong> First name, last name, email address, password
                (hashed), postcode, occupation
              </li>
              <li>
                <strong>Business information</strong> (Wholesaler accounts only): Business name,
                business type
              </li>
              <li>
                <strong>Listing data:</strong> Item descriptions, photos, prices, and location
                information you provide when creating listings
              </li>
              <li>
                <strong>Communications:</strong> Messages sent through the Platform&apos;s messaging
                system
              </li>
              <li>
                <strong>Payment data:</strong> Subscription and billing information processed
                securely by Stripe (we do not store card details)
              </li>
              <li>
                <strong>Usage data:</strong> Pages visited, features used, and interactions with the
                Platform collected through cookies and analytics
              </li>
              <li>
                <strong>Device data:</strong> Browser type, operating system, IP address, and device
                identifiers
              </li>
            </ul>
          </section>

          <section id="how-we-use">
            <h2>3. How We Use Your Data</h2>
            <p>We use your personal data to:</p>
            <ul>
              <li>Create and manage your user account</li>
              <li>Display your listings on the marketplace</li>
              <li>Facilitate messaging between buyers and sellers</li>
              <li>Process subscription payments via Stripe</li>
              <li>Send transactional emails (password resets, subscription confirmations)</li>
              <li>Provide location-based search functionality</li>
              <li>Improve the Platform through analytics and user feedback</li>
              <li>Prevent fraud, abuse, and enforce our Terms &amp; Conditions</li>
            </ul>
          </section>

          <section id="legal-basis">
            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal data on the following legal bases:</p>
            <ul>
              <li>
                <strong>Contract:</strong> Processing necessary to provide the services you have
                signed up for (account management, listings, messaging)
              </li>
              <li>
                <strong>Legitimate interest:</strong> Platform security, fraud prevention, and
                service improvement
              </li>
              <li>
                <strong>Consent:</strong> Marketing communications and non-essential cookies (you
                may withdraw consent at any time)
              </li>
              <li>
                <strong>Legal obligation:</strong> Compliance with UK laws and regulations
              </li>
            </ul>
          </section>

          <section id="data-sharing">
            <h2>5. Data Sharing</h2>
            <p>We may share your data with the following third parties:</p>
            <ul>
              <li>
                <strong>Stripe:</strong> For payment processing (see{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
                  Stripe&apos;s Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Hosting providers:</strong> Vercel (application hosting), cloud database
                providers
              </li>
              <li>
                <strong>Email services:</strong> For sending transactional and notification emails
              </li>
              <li>
                <strong>Analytics providers:</strong> For understanding how the Platform is used
              </li>
            </ul>
            <p>
              We do not sell your personal data to third parties. We only share data with service
              providers who process it on our behalf under appropriate data processing agreements.
            </p>
          </section>

          <section id="data-storage">
            <h2>6. Data Storage &amp; Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption. Passwords are hashed
              using bcrypt and are never stored in plain text.
            </p>
            <p>
              We use HTTPS throughout the Platform and implement access controls to ensure only
              authorised personnel can access personal data. While we take all reasonable measures
              to protect your data, no system is completely secure.
            </p>
          </section>

          <section id="cookies">
            <h2>7. Cookies</h2>
            <p>We use the following types of cookies:</p>
            <ul>
              <li>
                <strong>Essential cookies:</strong> Required for the Platform to function (session
                management, authentication). These cannot be disabled.
              </li>
              <li>
                <strong>Preference cookies:</strong> Remember your settings (e.g., dark/light theme
                preference)
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how users interact with the
                Platform (can be opted out of)
              </li>
            </ul>
          </section>

          <section id="your-rights">
            <h2>8. Your Rights</h2>
            <p>Under the UK GDPR, you have the following rights:</p>
            <ul>
              <li>
                <strong>Right of access:</strong> Request a copy of the personal data we hold about
                you
              </li>
              <li>
                <strong>Right to rectification:</strong> Request correction of inaccurate data
              </li>
              <li>
                <strong>Right to erasure:</strong> Request deletion of your personal data
                (&quot;right to be forgotten&quot;)
              </li>
              <li>
                <strong>Right to restrict processing:</strong> Request limitation of how we use your
                data
              </li>
              <li>
                <strong>Right to data portability:</strong> Request your data in a structured,
                machine-readable format
              </li>
              <li>
                <strong>Right to object:</strong> Object to processing based on legitimate interests
              </li>
              <li>
                <strong>Right to withdraw consent:</strong> Withdraw consent for marketing
                communications at any time
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:hello@enviromate.co.uk">hello@enviromate.co.uk</a>. We will respond
              within 30 days.
            </p>
            <p>
              You also have the right to lodge a complaint with the Information Commissioner&apos;s
              Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section id="data-retention">
            <h2>9. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to
              provide services. If you delete your account, we will delete your personal data within
              30 days, except where we are required to retain it for legal or regulatory purposes.
            </p>
            <p>
              Listing data for completed transactions may be retained in anonymised form for
              analytics purposes.
            </p>
          </section>

          <section id="children">
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              The Platform is not intended for use by anyone under the age of 18. We do not
              knowingly collect personal data from children. If you believe a child has provided us
              with personal data, please contact us immediately.
            </p>
          </section>

          <section id="changes">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by posting a notice on the Platform or sending you an email. Your continued
              use of the Platform after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section id="contact">
            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, contact us
              at:
            </p>
            <ul>
              <li>
                Email: <a href="mailto:hello@enviromate.co.uk">hello@enviromate.co.uk</a>
              </li>
              <li>
                Contact form: <a href="/about-us#contact">About Us</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
