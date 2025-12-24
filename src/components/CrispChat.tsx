import { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

const CrispChat = () => {
  useEffect(() => {
    // Initialise le tableau $crisp s'il n'existe pas
    window.$crisp = [];
    
    // Définit l'ID du site Crisp
    window.CRISP_WEBSITE_ID = "94cc4949-ccdd-4160-b70d-55bbf9546f2e";

    // Crée et ajoute le script Crisp
    (function() {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();

    // Ajoute des styles pour corriger le positionnement sur mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .crisp-client {
          right: 20px !important;
          bottom: 20px !important;
          left: auto !important;
        }
        
        .crisp-client .cc-1qbp0 {
          margin-right: 0 !important;
        }
        
        /* Empêche le débordement horizontal */
        body {
          overflow-x: hidden !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Nettoyage lors du démontage du composant
    return () => {
      if (window.$crisp) {
        window.$crisp = [];
      }
      // Supprime les styles ajoutés
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null; // Ce composant ne rend rien dans le DOM
};

export default CrispChat;
