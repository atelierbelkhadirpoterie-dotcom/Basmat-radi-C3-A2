import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-rose-50 px-4">
      <div className="text-center max-w-lg w-full">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 shadow-lg">
            <span className="text-4xl">🌟</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          Baby Smile
        </h1>
        <p className="text-lg text-gray-600 mb-12 font-medium">
          Basma Radi3 - Every child deserves a dignified beginning
        </p>

        {/* Language Selection Buttons */}
        <div className="space-y-4">
          <Link
            to="/ar/cause"
            className="block w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            <span className="text-lg">العربية</span>
          </Link>

          <Link
            to="/fr/cause"
            className="block w-full py-4 px-6 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            <span className="text-lg">Français</span>
          </Link>

          <Link
            to="/en/cause"
            className="block w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            <span className="text-lg">English</span>
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-12 text-sm text-gray-500">
          Every donation makes a difference. Choose your language to learn more
          and contribute.
        </p>
      </div>
    </div>
  );
}
