import { Link } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import { useState } from "react";

export default function FrDonate() {
  const [donationAmount, setDonationAmount] = useState(20);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const presetAmounts = [20, 50, 100, 250, 500];
  const items = [
    "Lait infantile",
    "Couches",
    "Vêtements",
    "Produits d'hygiène",
    "Couvertures",
    "Jouets",
    "Autres articles",
  ];

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-orange-400">
            <span className="text-xl">🌟</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Faire un don
        </h1>

        <div className="space-y-12">
          {/* Financial Donation Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💳</span>
              Don financier
            </h2>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Montant minimum : <span className="font-semibold text-rose-600">20 dirhams</span>
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sélectionnez un montant
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        donationAmount === amount
                          ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ou entrez un montant personnalisé
                </label>
                <input
                  type="number"
                  min="20"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(parseInt(e.target.value) || 20)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-lg"
                  placeholder="Entrez le montant en dirhams"
                />
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 font-medium">
                  Paiement sécurisé :
                </p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Carte bancaire</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">PayPal</span>
                  </label>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg">
                Continuer le paiement : {donationAmount} dirhams
              </button>
            </div>
          </div>

          {/* Material Donation Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              Don matériel
            </h2>

            {/* Form Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Vos informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nom"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Prénom"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none md:col-span-2"
                />
              </div>
            </div>

            {/* Items Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Qu'aimeriez-vous donner?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemToggle(item)}
                      className="w-5 h-5 text-rose-500 rounded"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Mode de remise</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-rose-300 transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="self"
                    checked={deliveryMethod === "self"}
                    onChange={() => setDeliveryMethod("self")}
                    className="w-4 h-4 mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Apporter le don</p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Centre Socioculturel El'Arissa Safi – Près du collège Biranzarane
                    </p>
                    <a
                      href="https://maps.app.goo.gl/xUaGTjZ3weDmfRJY6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block bg-rose-100 hover:bg-rose-200 rounded-lg p-3 text-center transition-colors"
                    >
                      <p className="text-sm font-medium text-rose-700">Voir la localisation sur Google Maps</p>
                    </a>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-rose-300 transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    className="w-4 h-4 mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Collecte par l'équipe</p>
                    {deliveryMethod === "pickup" && (
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          name="address"
                          placeholder="Adresse complète"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="Numéro de téléphone pour la coordination"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedItems.length === 0 || !formData.firstName || !formData.phone}
            >
              Confirmer le don matériel
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/fr/needs"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </Link>
        </div>
      </main>
    </div>
  );
}
