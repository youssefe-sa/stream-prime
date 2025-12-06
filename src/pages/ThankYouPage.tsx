import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Thank You | StreamMax IPTV</title>
        <meta name="description" content="Thank you for your order with StreamMax IPTV" />
      </Helmet>

      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 mt-16 md:mt-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">Thank You for Your Order!</h1>
          
          <p className="text-lg text-muted-foreground">
            We've received your order and will process it shortly. You'll receive an email with the next steps.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-lg space-y-4 text-left max-w-lg mx-auto">
            <h2 className="font-semibold text-lg">What's Next?</h2>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent you an email with your order confirmation and next steps.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Check Your WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you on WhatsApp with payment details and setup instructions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Activation Time</h3>
                <p className="text-sm text-muted-foreground">
                  Your account will be activated within 1-2 hours after payment confirmation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 space-x-4">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYouPage;
