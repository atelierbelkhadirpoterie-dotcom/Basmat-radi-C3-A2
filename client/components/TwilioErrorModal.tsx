import { X, MessageCircle, AlertTriangle } from "lucide-react";

interface TwilioErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
}

const ADNANE_PHONE = "+212675202336";

export default function TwilioErrorModal({
  isOpen,
  onClose,
  errorMessage,
}: TwilioErrorModalProps) {
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
          {/* Error icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Problème de serveur
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Le serveur a mal tourné. Veuillez nous contacter via WhatsApp pour confirmer votre don.
          </p>

          {errorMessage && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-red-700 font-mono break-words">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Contact information */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Contactez Adnane Belkhadir:
            </p>
            <a
              href={formatWhatsAppUrl(ADNANE_PHONE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group bg-gray-50"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Adnane (Problèmes/Réclamations)
                </p>
                <p className="text-xs text-gray-600">{ADNANE_PHONE}</p>
              </div>
            </a>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
