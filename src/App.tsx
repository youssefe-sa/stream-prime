import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import CrispChat from "@/components/CrispChat";
import { useEffect } from "react";
import VisitorTracker from "@/lib/visitorTracker";
import Index from "./pages/Index";
import Install from "./pages/Install";
import ChannelsList from "./pages/ChannelsList";
import FAQPage from "./pages/FAQPage";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import DMCA from "./pages/DMCA";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import LiveVisitors from "./pages/LiveVisitors";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

const queryClient = new QueryClient();

// Composant pour le tracking automatique
const VisitorTrackingProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialiser le tracker seulement côté client
    if (typeof window !== 'undefined') {
      const tracker = new VisitorTracker();
      
      // Nettoyage lors du démontage
      return () => {
        // Le tracker se nettoie automatiquement
      };
    }
  }, []);

  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <VisitorTrackingProvider>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/install" element={<Install />} />
                <Route path="/channels" element={<ChannelsList />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/live-visitors" element={<LiveVisitors />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
              <CrispChat />
              <FloatingWhatsAppButton />
            </TooltipProvider>
          </VisitorTrackingProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
