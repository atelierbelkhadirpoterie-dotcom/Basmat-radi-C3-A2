import { MessageCircle, X } from "lucide-react";

const contacts = [
  { name: "Walid", phone: "+212646610766" },
  { name: "Chahd Malak", phone: "+212609869603" },
  { name: "Adnane (Problèmes/Réclamations)", phone: "+212675202336" },
  { name: "Chef 1 (قائد 1)", phone: "" },
  { name: "Chef 2", phone: "" },
];

export default function WhatsAppDemo() {
  const formatWhatsAppUrl = (phone: string) => {
    if (!phone) return "#";
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col gap-3 items-end">
        {/* Contact List - Always open in demo */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-80 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">
              Contactez-nous via WhatsApp
            </p>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {contacts.map((contact) => {
              const url = formatWhatsAppUrl(contact.phone);
              const isDisabled = !contact.phone;

              return isDisabled ? (
                <div
                  key={contact.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 opacity-50 cursor-not-allowed"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      À venir
                    </p>
                  </div>
                </div>
              ) : (
                <a
                  key={contact.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {contact.phone}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Main FAB Button */}
        <button className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center justify-center">
          <X className="w-7 h-7" />
          <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}
