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

    // Nettoyage lors du démontage du composant
    return () => {
      if (window.$crisp) {
        window.$crisp = [];
      }
    };
  }, []);

  return null; // Ce composant ne rend rien dans le DOM
};

export default CrispChat;
