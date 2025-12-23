import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ContentShowcase } from "@/components/ContentShowcase";
import { Comparison } from "@/components/Comparison";
import { PricingMatrix } from "@/components/PricingMatrix";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { trialPlan } from "@/data/pricing";
import { Helmet } from "react-helmet-async";
import ChannelSearch from "@/components/ChannelSearch";

const Index = () => {
  const navigate = useNavigate();

  const handleOpenPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenTrial = () => {
    navigate('/checkout', { 
      state: { 
        planDetails: {
          ...trialPlan,
          duration: "24 Hour Trial",
          devices: 1
        } 
      } 
    });
  };

  const handleSelectPlan = (planId: string, price: number, duration: string, devices: number) => {
    navigate('/checkout', { 
      state: { 
        planDetails: {
          planId,
          price,
          duration,
          devices,
          monthlyRate: price / (duration.includes('Month') ? 1 : 12)
        } 
      } 
    });
  };

  return (
    <>
      <Helmet>
        <title>StreamMax - Premium IPTV Service | 30,000+ Live Channels</title>
        <meta 
          name="description" 
          content="Stream 30,000+ live TV channels and 50,000+ movies in HD & 4K quality. Compatible with all devices. Start your 24-hour trial for just $2." 
        />
        <meta name="keywords" content="IPTV, streaming, live TV, channels, HD, 4K, movies, sports, entertainment" />
        <link rel="canonical" href="https://streammax.tv" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "StreamMax",
            "description": "Premium IPTV streaming service with 30,000+ live channels",
            "url": "https://streammax.tv",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://streammax.tv/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main>
          <Hero onOpenPricing={handleOpenPricing} />
          <Features />
          <ChannelSearch />
          <ContentShowcase />
          <Comparison />
          <PricingMatrix onSelectPlan={handleSelectPlan} />
          <Testimonials />
          <CTA onOpenPricing={handleOpenPricing} onOpenTrial={handleOpenTrial} />
        </main>


        <Footer />
      </div>
    </>
  );
};

export default Index;
