import { MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/whatsapp";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Échanger sur WhatsApp"
      className="fixed right-4 z-50 group"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <span className="absolute inset-0 rounded-full bg-qit-coral opacity-30 group-hover:animate-ping" />
      <span className="relative flex items-center gap-2 bg-qit-coral text-white px-4 py-3.5 rounded-full shadow-xl shadow-qit-coral/40 hover:bg-qit-coral/90 transition-colors">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
      </span>
    </a>
  );
};

export default WhatsAppFloat;
