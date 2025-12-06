import { Helmet } from "react-helmet-async";
import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const whatsappNumber = "+12106343468";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  return (
    <>
      <Helmet>
        <title>Contact Us - StreamTV Pro</title>
        <meta name="description" content="Get in touch with our support team via live chat or WhatsApp. We're here to help 24/7." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Contact Us</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Our support team is available 24/7 to assist you. Choose your preferred way to reach us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Live Chat Card */}
              <div className="glass-card p-8 rounded-2xl text-center hover:border-primary/50 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Live Chat</h2>
                <p className="text-muted-foreground mb-6">
                  Start a conversation with our AI assistant. Get instant answers to your questions.
                </p>
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                    if (chatButton) chatButton.click();
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
              </div>

              {/* WhatsApp Card */}
              <div className="glass-card p-8 rounded-2xl text-center hover:border-green-500/50 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">WhatsApp</h2>
                <p className="text-muted-foreground mb-6">
                  Chat with us directly on WhatsApp for quick and personal support.
                </p>
                <Button 
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                  asChild
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {whatsappNumber}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
                <p className="text-muted-foreground">
                  We're available <span className="text-primary font-semibold">24/7</span> to help you with any questions about our IPTV service, subscriptions, or technical support.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
