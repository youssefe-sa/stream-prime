import { ArrowRight, Zap, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAProps {
  onOpenPricing: () => void;
  onOpenTrial: () => void;
}

export const CTA = ({ onOpenPricing, onOpenTrial }: CTAProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Get Started Now
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to revolutionize your{" "}
            <span className="text-primary">TV experience</span>?
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of satisfied customers and enjoy 18,000+ live channels, 
            movies and series in HD & 4K quality on all your devices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              onClick={onOpenTrial}
              className="btn-primary text-lg px-8 py-6 group"
            >
              24h Trial - Only $2
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={onOpenPricing}
              variant="outline" 
              className="text-lg px-8 py-6"
            >
              View Plans
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm">Instant Activation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Headphones className="w-5 h-5 text-primary" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
