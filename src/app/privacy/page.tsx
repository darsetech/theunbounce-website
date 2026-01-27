"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This page is the Voidbounce (Fitsii LLC) Privacy Policy — it describes the privacy practices for Voidbounce and Voidmail Manager to avoid any confusion. Fitsii LLC owns and operates Voidbounce and Voidmail Manager. This Privacy Policy explains what information we collect, how we use it, and the choices you have. Voidmail Manager is a productivity tool that helps corporate workers, developers, and individual users automate safe inbox organization, rules/filters, selective forwarding, templated outreach, and document attachment/sharing selected by the user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect the information you provide when using our services, including email addresses submitted for validation,
              account and profile information, and any content you choose to attach or share. When you connect a Google account to
              Voidmail Manager, we request OAuth permissions (scopes) necessary to perform the actions you authorize.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We also collect basic usage analytics and performance monitoring data to improve our services. We may temporarily store
              metadata or message headers required to apply or test mailbox rules; we do not access or store message bodies beyond
              what is explicitly required and authorized by you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Requested Google Scopes & How They&apos;re Used
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you connect a Google account to Voidmail Manager we request only the scopes required to provide the features you
              choose. We explain each scope at consent and use the permissions only for the stated purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                gmail.settings.basic / gmail.settings.sharing – Create or update filters and forwarding settings at your request
                (for example: label, archive, or forward messages to a designated address).
              </li>
              <li>
                gmail.modify (or gmail.readonly where possible) – Read message metadata and only the specific messages required to
                apply or test a rule; add/remove labels; move messages. Wherever possible we use readonly access for previews and only
                request modify when you confirm changes.
              </li>
              <li>
                gmail.send – Send replies or templated follow-ups as you (never as a third party), and only to recipients you specify.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We never sell your email content. OAuth tokens are used to perform actions on your behalf and are stored securely; you
              may revoke access at any time from your Google account or by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your submitted email addresses are used for validation and to provide results and analytics. For connected Google accounts
              we use granted permissions to implement the features you enable (rules, forwarding, labeling, sending templates). We use
              usage analytics to improve product quality and diagnose issues.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Actions that change your mailbox (e.g., applying rules or sending messages) are only performed with your explicit consent.
              We default to least-privilege access (readonly) for previews and request elevated permissions only when necessary and
              confirmed by you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Data Sharing, Transfer, and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, rent, trade, or otherwise share, transfer, or disclose your Google user data with any third parties
              except as strictly necessary to provide the services you authorize. Your Google data is shared only with Google servers
              through their official APIs when you connect your account, and solely for the specific purposes outlined in Section 2
              (Requested Google Scopes & How They&apos;re Used). We do not share Google user data with other companies, advertising networks,
              or other third parties for marketing, analytics, or any other use beyond service provision. You retain control over your
              data at all times, and can revoke access through your Google account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data. All data is encrypted in transit and at rest.
              OAuth tokens and sensitive credentials are stored encrypted using secure key management. Access to production systems is
              limited to authorized personnel and logged for auditing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can revoke third-party access (including our app) from your Google account security settings at any time, or contact
              support to request assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Money-Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer a 30-day money-back guarantee. If you&apos;re not satisfied with our service for any reason, contact us within
              30 days of your purchase for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Validated email addresses are not permanently stored. We retain usage analytics, account information, and any data needed
              to provide the service for as long as your account is active or as required to comply with legal obligations. OAuth tokens
              are retained only as long as necessary to provide the connected services and may be revoked by you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use third-party services for Google APIs (when you connect an account), payment processing, and analytics. These services
              have their own privacy policies; we ensure they meet our data protection standards and limit the information we share to what
              is necessary to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, or need help revoking access or deleting data, contact support email support@fitsii.com or admin@voidbounce.com.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="glow" size="lg">
              Start Validating Emails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
