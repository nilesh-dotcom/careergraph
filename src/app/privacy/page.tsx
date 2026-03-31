"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-4 pt-20 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Effective Date: April 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-900">
              At <span className="font-semibold">CareerGraph.ai</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly, including:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span><strong>Account Information:</strong> Name, email, password, and profile details</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span><strong>Resume Data:</strong> Your resume, skills, experience, and education</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span><strong>Preferences:</strong> Job preferences, target roles, and salary expectations</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span><strong>Usage Data:</strong> Logs, analytics, and interaction patterns</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Provide and improve our services</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Generate personalized career insights and recommendations</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Communicate with you about updates and support</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Analyze usage patterns to enhance user experience</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Data Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal data. We may share information with third parties only when necessary to provide our services, comply with legal requirements, or with your explicit consent. Our service providers are bound by confidentiality agreements.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and report any suspicious activity.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have rights including:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Access to your personal data</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Request correction or deletion of your data</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Data portability</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience and understand how you use our platform. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Retention of Data
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before sharing information.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be effective immediately upon posting. Continued use of the platform signifies your acceptance of the updated policy.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:{" "}
                <a href="mailto:privacy@careergraph.ai" className="text-brand-600 hover:text-brand-700 font-medium">
                  privacy@careergraph.ai
                </a>
              </p>
            </section>

            {/* Footer CTA */}
            <section className="mt-16 pt-12 border-t border-gray-200">
              <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Your privacy matters to us
                </h3>
                <p className="text-gray-700 mb-6">
                  We're committed to being transparent about how we collect and use your data.
                </p>
                <Link
                  href="/signup"
                  className="inline-block btn-primary py-2.5 px-6 font-medium"
                >
                  Get Started With Confidence
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
