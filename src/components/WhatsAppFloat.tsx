import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/330601777633";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Échanger sur WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-qit-coral animate-ping opacity-30" />
      <span className="relative flex items-center gap-2 bg-qit-coral text-white px-4 py-3 rounded-full shadow-lg shadow-qit-coral/40 hover:bg-qit-coral/90 transition-all">
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
      </span>
    </a>
  );
};

export default WhatsAppFloat;
