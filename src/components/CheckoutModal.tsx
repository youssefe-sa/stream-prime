import { X, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  price: number;
  duration: string;
  devices: number;
}

export const CheckoutModal = ({
  isOpen,
  onClose,
  planId,
  price,
  duration,
  devices,
}: CheckoutModalProps) => {
  if (!isOpen) return null;

  const handleCheckout = () => {
    // Redirect to Whop checkout
    const checkoutUrl = `https://whop.com/checkout/${planId}`;
    window.open(checkoutUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-6 animate-fade-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-card transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Complete Your Order
          </h2>
          <p className="text-muted-foreground">
            Secure checkout powered by Whop
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl p-4 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Order Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground">Plan</span>
              <span className="text-foreground font-medium">{duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Devices</span>
              <span className="text-foreground font-medium">{devices} Connection{devices > 1 ? "s" : ""}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">${price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Secure SSL encrypted payment</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <CreditCard className="w-5 h-5 text-green-500" />
            <span>All major cards & crypto accepted</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className="btn-primary w-full text-lg py-6"
        >
          Proceed to Checkout
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          By completing this purchase, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
