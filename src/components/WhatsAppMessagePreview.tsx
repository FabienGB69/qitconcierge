import { Check, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

interface WhatsAppMessagePreviewProps {
  message: string;
  className?: string;
}

/**
 * Small chat-bubble preview of the pre-filled WhatsApp message,
 * so the exact text can be validated before it is sent.
 */
const WhatsAppMessagePreview = ({ message, className = "" }: WhatsAppMessagePreviewProps) => {
  const { isFR } = useLanguage();

  return (
    <div
      className={`rounded-2xl border border-qit-purple/15 bg-white/80 backdrop-blur p-3 sm:p-4 max-w-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="h-3.5 w-3.5 text-qit-coral shrink-0" aria-hidden="true" />
        <span className="text-[10px] uppercase tracking-[0.18em] text-qit-purple/60 font-medium">
          {isFR ? "Aperçu du message" : "Message preview"}
        </span>
      </div>

      <div className="relative rounded-xl rounded-tl-sm bg-qit-beige px-3 py-2">
        <p className="text-sm text-qit-purple/90 leading-snug whitespace-pre-line">{message}</p>
        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-qit-purple/50">
          <span>+{WHATSAPP_NUMBER}</span>
          <Check className="h-3 w-3" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessagePreview;
