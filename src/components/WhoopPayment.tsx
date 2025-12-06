import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WhoopPaymentProps {
  planId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const WhoopPayment = ({ planId, onSuccess, onClose }: WhoopPaymentProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'payment_success') {
        onSuccess();
      } else if (event.data === 'payment_closed') {
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onClose]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Impossible de charger le formulaire de paiement. Veuillez réessayer plus tard.');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Paiement sécurisé</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Fermer le paiement"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-600">Chargement du formulaire de paiement sécurisé...</p>
            </div>
          )}
          
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setError(null);
                  if (iframeRef.current) {
                    iframeRef.current.src = `https://whop.com/checkout/${planId}`;
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div className="w-full" style={{ height: '80vh' }}>
              <iframe
                ref={iframeRef}
                src={`https://whop.com/checkout/${planId}`}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                title="Paiement sécurisé Whoop"
                referrerPolicy="no-referrer"
                allow="payment *"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ minHeight: '600px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
