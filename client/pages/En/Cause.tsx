import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function EnCause() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            Back to Home
            <ChevronRight className="w-5 h-5" />
          </Link>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-orange-400">
            <span className="text-xl">🌟</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Baby Smile
          </h1>
          <p className="text-xl text-rose-600 font-semibold">
            Every child deserves a dignified beginning
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Many infants and children grow up without stable family care, adequate supervision, or essential resources.
            </p>

            <p>
              Lack of milk, diapers, clothing, and basic healthcare makes early life extremely fragile.
            </p>

            <p className="text-rose-600 font-semibold text-xl">
              The Baby Smile initiative exists to restore dignity and hope through simple but meaningful solidarity.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/en/needs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            Essential Needs
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
