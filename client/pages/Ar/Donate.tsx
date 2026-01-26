import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import DonationConfirmationModal from "@/components/DonationConfirmationModal";

export default function ArDonate() {
  const [donationAmount, setDonationAmount] = useState(20);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    phone: "",
    address: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationType, setDonationType] = useState<"financial" | "material">(
    "financial",
  );


  const presetAmounts = [20, 50, 100, 250, 500];
  const items = [
    "حليب الرضع",
    "حفاضات",
    "ملابس",
    "منتجات نظافة",
    "أغطية",
    "ألعاب",
    "أخرى",
  ];

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendDonationNotification = async (type: "financial" | "material") => {
    try {
      const payload = {
        firstName: formData.name,
        lastName: formData.familyName,
        phone: formData.phone,
        donationType: type,
        ...(type === "financial" && { amount: donationAmount }),
        ...(type === "material" && { selectedItems }),
      };

      const response = await fetch("/api/send-donation-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Notification sent successfully");
        setDonationType(type);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50"
      dir="rtl"
    >
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden shadow-md">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fcebc20bd57884b32800f08d8a19ef8e0%2Fa86d43f3f0d3470bbe8045bf06f0e150?format=webp&width=800&height=1200"
              alt="Baby Smile Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          التبرع
        </h1>

        <div className="space-y-12">
          {/* Financial Donation Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💳</span>
              التبرع المالي
            </h2>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                الحد الأدنى:{" "}
                <span className="font-semibold text-rose-600">20 درهم</span>
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  اختر المبلغ
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
                  أو ادخل المبلغ يدويًا
                </label>
                <input
                  type="number"
                  min="20"
                  value={donationAmount}
                  onChange={(e) =>
                    setDonationAmount(parseInt(e.target.value) || 20)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none text-lg"
                  placeholder="أدخل المبلغ بالدرهم"
                />
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">طريقة الدفع الآمنة:</p>
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
                    <span className="text-gray-700">
                      بطاقة بنكية (Visa / Mastercard)
                    </span>
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

              <a
                href="https://www.paypal.com/ncp/payment/6WGLYV99Y2MDG"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg text-center"
              >
                تبرع الآن
              </a>
            </div>
          </div>

          {/* Material Donation Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              التبرع العيني
            </h2>

            {/* Form Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                معلوماتك الشخصية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="familyName"
                  placeholder="النسب"
                  value={formData.familyName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none md:col-span-2"
                />
              </div>
            </div>

            {/* Items Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                اختر ما تود تبرعه
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
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
              <h3 className="font-semibold text-gray-900 mb-4">
                طريقة التسليم
              </h3>
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
                    <p className="font-medium text-gray-900">
                      إحضار التبرع شخصيًا
                    </p>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      المركز الاجتماعي الثقافي العريسة صفي – بالقرب من مدرسة بير
                      انزران
                    </p>
                    <a
                      href="https://maps.app.goo.gl/xUaGTjZ3weDmfRJY6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block bg-rose-100 hover:bg-rose-200 rounded-lg p-3 text-center transition-colors"
                    >
                      <p className="text-sm font-medium text-rose-700">
                        فتح الموقع على Google Maps
                      </p>
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
                    <p className="font-medium text-gray-900">
                      استلام التبرع من طرف الفريق
                    </p>
                    {deliveryMethod === "pickup" && (
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          name="address"
                          placeholder="العنوان الكامل"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="رقم الهاتف للتنسيق"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={() => sendDonationNotification("material")}
              className="w-full mt-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                selectedItems.length === 0 || !formData.name || !formData.phone
              }
            >
              تأكيد التبرع العيني
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/ar/needs"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
            السابق
          </Link>
        </div>

        {/* Confirmation Modal */}
        <DonationConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          donationType={donationType}
          amount={donationAmount}
          items={selectedItems}
          donorName={`${formData.name} ${formData.familyName}`}
        />
      </main>
    </div>
  );
}
