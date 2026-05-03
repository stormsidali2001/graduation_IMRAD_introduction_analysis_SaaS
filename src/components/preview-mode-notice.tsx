import Link from "next/link";
import { BookOpenIcon, UserIcon, ShieldCheckIcon, EyeIcon, ExternalLinkIcon, ServerIcon } from "lucide-react";
import { setPreviewRole } from "@/server/actions/set-preview-role";

const REPO_URL = "https://github.com/stormsidali2001/graduation_IMRAD_introduction_analysis_SaaS/";

export function PreviewModeNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 py-10">
      <div className="max-w-lg w-full mx-4 space-y-4">

        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-amber-100 rounded-full p-4">
              <BookOpenIcon className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <div className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Preview Mode
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Choose How to Explore</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            This app is running in Preview Mode with mock data — no database,
            Stripe, or AI services required. Choose a role to explore the platform.
          </p>
        </div>

        {/* Role selection cards */}
        <div className="grid gap-3">

          {/* Visitor */}
          <Link
            href="/"
            className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div className="bg-gray-100 rounded-lg p-2.5 group-hover:bg-gray-200 transition-colors">
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-900 text-sm">Browse Landing Page</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Explore the marketing site without logging in
              </p>
            </div>
            <span className="text-gray-400 text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full">
              Visitor
            </span>
          </Link>

          {/* Regular User */}
          <form action={setPreviewRole.bind(null, "user")}>
            <button
              type="submit"
              className="w-full flex items-center gap-4 bg-white rounded-xl shadow-sm border border-purple-100 p-5 hover:shadow-md hover:border-purple-200 transition-all group text-left"
            >
              <div className="bg-purple-100 rounded-lg p-2.5 group-hover:bg-purple-200 transition-colors">
                <UserIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Continue as Regular User</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Analyze introductions, view history, manage subscription
                </p>
              </div>
              <span className="text-purple-700 text-xs font-medium px-2 py-0.5 bg-purple-100 rounded-full whitespace-nowrap">
                Premium User
              </span>
            </button>
          </form>

          {/* Admin */}
          <form action={setPreviewRole.bind(null, "admin")}>
            <button
              type="submit"
              className="w-full flex items-center gap-4 bg-white rounded-xl shadow-sm border border-indigo-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all group text-left"
            >
              <div className="bg-indigo-100 rounded-lg p-2.5 group-hover:bg-indigo-200 transition-colors">
                <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Continue as Admin</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Access dashboard, manage users, review feedbacks and subscriptions
                </p>
              </div>
              <span className="text-indigo-700 text-xs font-medium px-2 py-0.5 bg-indigo-100 rounded-full whitespace-nowrap">
                Admin
              </span>
            </button>
          </form>
        </div>

        {/* Why mock data — microservices context */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <ServerIcon className="h-4 w-4 text-purple-500 flex-shrink-0" />
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Why mock data?</p>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            The full platform is an <span className="font-semibold text-gray-700">8-node microservices architecture</span> — including
            a fine-tuned NLP model server, a Eureka service registry, a PostgreSQL database, Stripe billing, and a Resend email service.
            Running all nodes continuously has real infrastructure costs and maintenance overhead, so this public demo
            uses simulated data to let you explore every feature without spinning up the full stack.
          </p>
          <Link
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors group"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            <span className="underline underline-offset-2">View source &amp; run locally on GitHub</span>
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400">
          All data is simulated. No real accounts, payments, or AI calls are made.
        </p>
      </div>
    </div>
  );
}
