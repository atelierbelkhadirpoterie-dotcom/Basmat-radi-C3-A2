import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FrNeeds() {
  const needs = [
    "Lait infantile",
    "Couches",
    "Vêtements nourrissons",
    "Vêtements enfants",
    "Produits d'hygiène",
    "Couvertures",
    "Produits médicaux de base",
    "Jouets éducatifs",
    "Autres besoins essentiels",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            Retour à l'accueil
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Besoins essentiels
          </h1>
          <p className="text-gray-600">
            Ce dont les enfants en situation de vulnérabilité ont besoin
          </p>
        </div>

        {/* Needs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {needs.map((need, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border-t-4 border-rose-500"
            >
              <p className="text-lg font-semibold text-gray-900">{need}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Link
            to="/fr/cause"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </Link>

          <Link
            to="/fr/donate"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            Faire un don
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
