import { Header } from "@/components/Header";
import { FAQ as FAQSection } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - StreamMax | Frequently Asked Questions</title>
        <meta 
          name="description" 
          content="Find answers to common questions about our IPTV service. Pricing, devices, setup, support and more." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <FAQSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
