import { X, CheckCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

interface DonationConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationType: "financial" | "material";
  amount?: number;
  items?: string[];
  donorName?: string;
}

const contacts = [
  { name: "Walid", phone: "+212646610766" },
  { name: "Chahd Malak", phone: "+212609869603" },
  { name: "Adnane (Problèmes/Réclamations)", phone: "+212675202336" },
];

export default function DonationConfirmationModal({
  isOpen,
  onClose,
  donationType,
  amount,
  items,
  donorName,
}: DonationConfirmationModalProps) {
  if (!isOpen) return null;

  const formatWhatsAppUrl = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return `https://wa.me/${cleaned}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slide-up">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Success icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Merci pour votre don !
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Votre générosité aidera les enfants en situation de vulnérabilité.
          </p>

          {/* Donation Summary */}
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Récapitulatif du don:
            </p>
            {donorName && (
              <p className="text-sm text-gray-600">
                Donateur: <span className="font-semibold">{donorName}</span>
              </p>
            )}
            <p className="text-sm text-gray-600">
              Type:{" "}
              <span className="font-semibold">
                {donationType === "financial"
                  ? "Don Financier"
                  : "Don Matériel"}
              </span>
            </p>
            {donationType === "financial" && amount && (
              <p className="text-sm text-gray-600">
                Montant:{" "}
                <span className="font-semibold text-rose-600">{amount} MAD</span>
              </p>
            )}
            {donationType === "material" && items && items.length > 0 && (
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Articles:</p>
                <ul className="list-disc list-inside space-y-1">
                  {items.map((item) => (
                    <li key={item} className="text-xs">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact information */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Des questions? Contactez-nous:
            </p>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={formatWhatsAppUrl(contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-600">{contact.phone}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
