import { BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-brand-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                CareerGraph<span className="text-brand-600">.ai</span>
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Data-backed career strategy for tech professionals.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/analyze" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Get Analysis
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <a href="mailto:support@careergraph.ai" className="text-sm text-gray-600 hover:text-brand-600 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} CareerGraph.ai. All rights reserved. Built for Indian tech professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
