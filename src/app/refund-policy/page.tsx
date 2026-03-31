"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
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
              Refund & Cancellation Policy
            </h1>
            <p className="text-gray-600">
              Effective Date: April 1, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-900">
              At <span className="font-semibold">CareerGraph.ai</span>, we want to ensure a transparent and fair refund and cancellation process for our users. Please review this policy carefully.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Subscription Services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                CareerGraph.ai may offer paid subscriptions for premium features.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Refunds
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please note the following regarding refunds:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Payments are generally non-refundable once the service has been accessed.</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Refunds may be considered in exceptional cases at our discretion.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cancellation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Regarding subscription cancellation:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Users may cancel subscriptions at any time.</span>
                </li>
                <li className="text-gray-700 flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <span>Cancellation will stop future billing but does not refund past payments.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Failed Transactions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If a transaction fails but amount is deducted, it will be refunded automatically within 5–7 business days.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For refund requests, contact:{" "}
                <a href="mailto:billing@careergraph.ai" className="text-brand-600 hover:text-brand-700 font-medium">
                  billing@careergraph.ai
                </a>
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Please allow up to 5–7 business days for refund processing after your request has been reviewed and approved.
              </p>
            </section>

            {/* Footer CTA */}
            <section className="mt-16 pt-12 border-t border-gray-200">
              <div className="bg-gradient-to-r from-brand-50 to-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Questions About Your Subscription?
                </h3>
                <p className="text-gray-700 mb-6">
                  We're here to help. Reach out to our support team if you have any concerns about your subscription or payment.
                </p>
                <a
                  href="mailto:support@careergraph.ai"
                  className="inline-block btn-primary py-2.5 px-6 font-medium"
                >
                  Contact Support
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
