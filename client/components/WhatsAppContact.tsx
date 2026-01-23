import { MessageCircle } from "lucide-react";

const contacts = [
  { name: "Walid", phone: "+212646610766" },
  { name: "Chahd Malak", phone: "+212609869603" },
  { name: "Adnane (Problèmes/Réclamations)", phone: "+212675202336" },
  { name: "Chef 1 (قائد 1)", phone: "+212" },
  { name: "Chef 2", phone: "+212" },
];

export default function WhatsAppContact() {
  const formatWhatsAppUrl = (phone: string) => {
    // Remove all non-digit characters except + at the start
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col gap-3 items-end">
        {/* Contact Buttons - Show on hover/focus */}
        <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2 max-w-xs opacity-0 invisible transition-all duration-300 hover:opacity-100 hover:visible group-hover:opacity-100 group-hover:visible translate-y-2 hover:translate-y-0">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Contactez-nous via WhatsApp
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={formatWhatsAppUrl(contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors group/item"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
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
            ))}
          </div>
        </div>

        {/* Main FAB Button */}
        <button
          className="group relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          title="Contactez-nous"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Cliquez pour voir les contacts
          </div>
        </button>
      </div>
    </div>
  );
}
