"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
              Terms and Conditions
            </h1>
            <p className="text-gray-600">
              Effective Date: April 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-900">
              Welcome to <span className="font-semibold">CareerGraph.ai</span> ("we", "our", "us"). By accessing or using our platform, you agree to these Terms and Conditions.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Service Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                CareerGraph.ai is an AI-powered platform that provides career insights, job recommendations, skill gap analysis, and related tools to help users make informed career decisions.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. User Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to use our services.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Account Responsibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Use of Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Use the platform for unlawful purposes</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Provide false or misleading information</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Attempt to disrupt or harm the platform</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Payments
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Certain features of CareerGraph.ai may require payment. By purchasing, you agree to pay all applicable fees.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All content, branding, and technology on CareerGraph.ai are owned by us and protected by applicable laws.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Disclaimer
              </h2>
              <p className="text-gray-700 leading-relaxed">
                CareerGraph.ai provides recommendations based on data and AI models. We do not guarantee job placement, career outcomes, or earnings.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate accounts for violations of these terms.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For questions, contact: <a href="mailto:support@careergraph.ai" className="text-brand-600 hover:text-brand-700 font-medium">support@careergraph.ai</a>
              </p>
            </section>

            {/* Footer CTA */}
            <section className="mt-16 pt-12 border-t border-gray-200">
              <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Ready to get started?
                </h3>
                <p className="text-gray-700 mb-6">
                  Join CareerGraph.ai today and discover your career potential.
                </p>
                <Link
                  href="/signup"
                  className="inline-block btn-primary py-2.5 px-6 font-medium"
                >
                  Create Account
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
