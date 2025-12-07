import { MessageCircle } from "lucide-react";

export const FloatingWhatsAppButton = () => {
  return (
    <div className="fixed bottom-24 right-6 z-50 hidden">
      <a 
        href="https://wa.me/12106343468" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};
