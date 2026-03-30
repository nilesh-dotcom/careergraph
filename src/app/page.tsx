import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  FileText,
  Target,
  TrendingUp,
  Zap,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  IndianRupee,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Built for Indian Tech Professionals
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Stop guessing your career.
            <br />
            <span className="gradient-text">Start optimizing it.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            See your market position, salary gap, top 3 career paths, and a 90-day execution plan based on real job data in India.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/analyze" className="btn-primary text-lg px-8 py-4">
              Get My Career Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              How It Works
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 20 min assessment
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Real job market data
            </span>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Everything you need to
              <span className="gradient-text"> make your next move</span>
            </h2>
            <p className="section-subheading mt-4 mx-auto">
              Not generic advice. Specific, data-backed insights tailored to
              your profile and the current Indian job market.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Career Positioning",
                desc: "Know your exact market level, how your salary compares, and where you rank among peers.",
              },
              {
                icon: Target,
                title: "Top 3 Career Paths",
                desc: "Discover the most logical next roles based on your skills, experience, and market demand.",
              },
              {
                icon: TrendingUp,
                title: "Skill Gap Analysis",
                desc: "See exactly which skills you're missing compared to real job postings for your target roles.",
              },
              {
                icon: Zap,
                title: "Market Insights",
                desc: "Live trends from the job market — top skills in demand, salary movements, and hiring signals.",
              },
              {
                icon: FileText,
                title: "90-Day Action Plan",
                desc: "Week-by-week plan with skills to learn, certifications to pursue, and projects to build.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Curated Job Matches",
                desc: "8-12 highly relevant open roles that match your profile, with match scores and apply links.",
              },
            ].map((feature, i) => (
              <div key={i} className="card p-6">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">
              Three simple steps to
              <span className="gradient-text"> career clarity</span>
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Upload your resume",
                desc: "Drop your PDF or DOCX resume. Our AI extracts your skills, experience, and career trajectory in seconds.",
              },
              {
                step: "02",
                title: "Add your preferences",
                desc: "Tell us your target role, salary expectations, and preferred cities. This helps us tailor the analysis.",
              },
              {
                step: "03",
                title: "Get your career report",
                desc: "Receive a comprehensive, data-backed report with career paths, skill gaps, market insights, and an actionable plan.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading mb-12">
            Built different from
            <span className="gradient-text"> generic career tools</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Uses real job postings, not guesswork",
              "Tailored for Indian tech market (Naukri, LinkedIn India)",
              "Compares your skills against actual job requirements",
              "Provides specific salary benchmarks, not ranges",
              "90-day action plan with weekly milestones",
              "No signup or account needed",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="section-heading mb-4">
            One report.
            <span className="gradient-text"> Zero fluff.</span>
          </h2>
          <p className="section-subheading mx-auto mb-8">
            Get your complete career assessment for a one-time fee.
          </p>

          <div className="card p-8">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <IndianRupee className="w-6 h-6 text-gray-900" />
              <span className="text-5xl font-extrabold text-gray-900">499</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              One-time payment. Full report access.
            </p>

            <Link href="/analyze" className="btn-primary w-full text-lg py-4">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <p className="text-xs text-gray-400 mt-4">
              Preview your results for free before paying
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your next career move starts here
          </h2>
          <p className="text-brand-200 text-lg mb-8">
            Join thousands of Indian tech professionals making smarter career
            decisions with data.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-brand-700 bg-white rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-lg"
          >
            Analyze My Career — Free Preview
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
