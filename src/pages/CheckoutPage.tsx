import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { WhopCheckoutEmbed, useCheckoutEmbedControls } from "@whop/checkout/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Zap, Shield, Tv, Clock, Star, Award, Check, Loader2, ArrowRight, X } from "lucide-react";

interface PlanDetails {
  planId: string;
  price: number;
  duration: string;
  devices: number;
  monthlyRate?: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get plan details from location state or use default values
  const planDetails: PlanDetails = (location.state as { planDetails?: PlanDetails })?.planDetails || {
    planId: "12months-1",
    price: 49.99,
    duration: "12 Months",
    devices: 1,
    monthlyRate: 4.17
  };
  
  // Debug: log when showPayment changes
  useEffect(() => {
    console.log('showPayment state changed:', showPayment);
    console.log('Current planId:', planDetails.planId);
  }, [showPayment, planDetails]);

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const checkoutRef = useCheckoutEmbedControls();

  // Handle payment with Whop Checkout
  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  // Handle successful payment
  const handleSuccess = () => {
    setShowPaymentModal(false);
    toast({
      title: "Paiement réussi !",
      description: "Votre abonnement a été activé avec succès.",
      variant: "default",
    });
    navigate('/thank-you');
  };

  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  useEffect(() => {
    if (!showPaymentModal) return;
    
    const configureIframe = () => {
      const iframe = document.querySelector('iframe');
      if (!iframe) return false;
      
      try {
        // Sauvegarder les attributs existants
        const existingSandbox = iframe.getAttribute('sandbox') || '';
        const existingReferrerPolicy = iframe.getAttribute('referrerpolicy');
        
        // Ajouter les permissions nécessaires sans écraser les existantes
        const requiredPermissions = [
          'allow-forms',
          'allow-scripts',
          'allow-same-origin',
          'allow-popups',
          'allow-payment'
        ];
        
        const currentPermissions = new Set(existingSandbox.split(' ').filter(Boolean));
        requiredPermissions.forEach(perm => currentPermissions.add(perm));
        
        // Mettre à jour les attributs
        if (Array.from(currentPermissions).join(' ') !== existingSandbox) {
          iframe.setAttribute('sandbox', Array.from(currentPermissions).join(' '));
        }
        
        if (existingReferrerPolicy !== 'no-referrer') {
          iframe.setAttribute('referrerpolicy', 'no-referrer');
        }
        
        // Ajouter l'attribut allow pour les fonctionnalités spécifiques
        if (!iframe.hasAttribute('allow')) {
          iframe.setAttribute('allow', 'payment');
        }
        
        return true;
      } catch (error) {
        console.error('Erreur lors de la configuration de l\'iframe:', error);
        return false;
      }
    };
    
    // Essayer de configurer immédiatement
    if (configureIframe()) return;
    
    // Si l'iframe n'est pas encore prêt, réessayer après un délai
    const intervalId = setInterval(() => {
      if (configureIframe()) {
        clearInterval(intervalId);
      }
    }, 300);
    
    // Nettoyer l'intervalle si le composant est démonté
    return () => clearInterval(intervalId);
  }, [showPaymentModal]);

  // Check if it's a trial plan
  const isTrialPlan = planDetails.planId === "plan_6sH670SzLLJex";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    device: "",
    application: "",
    macAddress: "",
    adultChannels: false,
    customerType: "New Customer"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCustomerTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      customerType: value,
      // Réinitialiser les champs qui ne sont pas nécessaires pour le renouvellement
      ...(value === 'Renewal' ? {
        device: '',
        application: '',
        macAddress: '',
        adultChannels: false
      } : {})
    }));
  };

  const features = [
    { icon: Tv, text: "30,000+ Live Channels" },
    { icon: Star, text: "150,000+ VOD Content" },
    { icon: Shield, text: "Anti-Freeze Technology" },
    { icon: Clock, text: "24/7 Support" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyVR2k8iyL_PqzcUNm6HM-bEpLvzJR8Rbh8OkgITTjL3zGmVgI6mysf7ttuuSw1z6PU5Q/exec';
      const plan = `${planDetails.duration} • ${planDetails.devices} Device${planDetails.devices > 1 ? 's' : ''}`;
      
      // Prepare data to be sent
      const formDataObj = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        device: formData.device,
        application: formData.application,
        macAddress: formData.macAddress,
        plan: plan,
        price: String(planDetails.price),
        status: 'New',
        adultChannels: formData.adultChannels ? 'Yes' : 'No',
        renewal: formData.customerType === 'Renewal' ? 'Yes' : 'No',
        customerType: formData.customerType,
        timestamp: new Date().toISOString()
      };
      
      console.log('Form data before sending:', formData);
      console.log('Data to be sent:', formDataObj);

      // Create URLSearchParams object for sending
      const formBody = new URLSearchParams();
      
      // Add each key-value pair to URLSearchParams
      Object.entries(formDataObj).forEach(([key, value]) => {
        formBody.append(key, String(value));
      });
      
      // Send data to Google Sheet
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
        mode: 'cors'
      });
      
      if (response.ok) {
        console.log('Form submitted successfully, processing payment');
        // Call handlePayment directly after successful submission
        handlePayment();
      } else {
        const errorText = await response.text();
        console.error('Form submission failed:', response.status, errorText);
        throw new Error(`Failed to submit form: ${response.status} ${errorText}`);
      }
      
    } catch (error) {
      console.error('Error during submission:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while processing your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Log de débogage pour vérifier le rendu
  console.log('Rendering CheckoutPage, showPayment:', showPayment);
  console.log('Current planId:', planDetails.planId);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Checkout | StreamMax IPTV</title>
        <meta name="description" content="Complete your IPTV subscription purchase with StreamMax." />
      </Helmet>

      <Header />
      
      <main className="flex-1 container pt-48 pb-32 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Complete Your Order</h1>
              <p className="text-muted-foreground">Fill in your details to complete your purchase</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required 
                    placeholder="John Doe" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    placeholder="+1 (___) ___-____" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="your@email.com" 
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Customer Type</Label>
                  <RadioGroup 
                    value={formData.customerType}
                    className="grid grid-cols-2 gap-4"
                    onValueChange={handleCustomerTypeChange}
                    disabled={isTrialPlan}
                  >
                    <div>
                      <RadioGroupItem 
                        value="New Customer" 
                        id="new-customer" 
                        className="peer sr-only" 
                        disabled={isTrialPlan}
                      />
                      <Label
                        htmlFor="new-customer"
                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer ${isTrialPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div>New Customer</div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem 
                        value="Renewal" 
                        id="renewal" 
                        className="peer sr-only"
                        disabled={isTrialPlan}
                      />
                      <Label
                        htmlFor="renewal"
                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer ${isTrialPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div>Renewal</div>
                      </Label>
                    </div>
                  </RadioGroup>
                  {isTrialPlan && (
                    <p className="text-sm text-muted-foreground">
                      Renewal is not available for free trials.
                    </p>
                  )}
                </div>

                <div className={`space-y-2 ${formData.customerType === 'Renewal' ? 'opacity-50' : ''}`}>
                  <Label htmlFor="device">Which Device are you using? {formData.customerType !== 'Renewal' && '*'}</Label>
                  <Input 
                    id="device" 
                    name="device" 
                    value={formData.device}
                    onChange={handleInputChange}
                    required={formData.customerType !== 'Renewal'}
                    disabled={formData.customerType === 'Renewal'}
                    placeholder="e.g., Smart TV, Android Box, Firestick" 
                  />
                  {formData.customerType === 'Renewal' && (
                    <p className="text-sm text-muted-foreground">Not required for renewal</p>
                  )}
                </div>

                <div className={`space-y-2 ${formData.customerType === 'Renewal' ? 'opacity-50' : ''}`}>
                  <Label htmlFor="application">Which Application are you using? {formData.customerType !== 'Renewal' && '*'}</Label>
                  <Input 
                    id="application" 
                    name="application" 
                    value={formData.application}
                    onChange={handleInputChange}
                    required={formData.customerType !== 'Renewal'}
                    disabled={formData.customerType === 'Renewal'}
                    placeholder="e.g., Tivimate, IPTV Smarters, GSE IPTV" 
                  />
                  {formData.customerType === 'Renewal' && (
                    <p className="text-sm text-muted-foreground">Not required for renewal</p>
                  )}
                </div>

                <div className={`space-y-2 ${formData.customerType === 'Renewal' ? 'opacity-50' : ''}`}>
                  <Label htmlFor="macAddress">MAC Address {formData.customerType !== 'Renewal' && '(if applicable)'}</Label>
                  <Input 
                    id="macAddress" 
                    name="macAddress" 
                    value={formData.macAddress}
                    onChange={handleInputChange}
                    disabled={formData.customerType === 'Renewal'}
                    placeholder="00:1A:2B:3C:4D:5E" 
                  />
                  {formData.customerType === 'Renewal' && (
                    <p className="text-sm text-muted-foreground">Not required for renewal</p>
                  )}
                </div>

                <div className={`flex items-center space-x-2 p-2 border rounded-md ${formData.customerType === 'Renewal' ? 'opacity-50' : ''}`}>
                  <Checkbox 
                    id="adultChannels" 
                    checked={formData.adultChannels}
                    onCheckedChange={(checked) => setFormData({...formData, adultChannels: checked as boolean})}
                    disabled={formData.customerType === 'Renewal'}
                  />
                  <Label 
                    htmlFor="adultChannels" 
                    className={`text-sm font-medium leading-none ${formData.customerType === 'Renewal' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    Include Adult Channels (18+)
                    {formData.customerType === 'Renewal' && (
                      <span className="ml-2 text-sm text-muted-foreground">Not editable for renewal</span>
                    )}
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Complete Order'
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{planDetails.duration} • {planDetails.devices} Device{planDetails.devices > 1 ? 's' : ''} IPTV Subscription</p>
                    <p className="text-sm text-muted-foreground">
                      {planDetails.monthlyRate && `$${planDetails.monthlyRate.toFixed(2)}/month`}
                    </p>
                  </div>
                  <p className="text-lg font-bold">${planDetails.price.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${planDetails.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${planDetails.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">What's included:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-secondary p-4">
                  <h4 className="font-medium mb-2">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                  <div className="flex items-center justify-center gap-2 p-2 bg-background rounded-md border border-border">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Secure Payment</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Whop Checkout Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 flex flex-col max-h-[90vh]">
            <div className="flex-shrink-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center space-x-3">
                <a href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground fill-current">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-black">StreamMax</span>
                </a>
                <span className="text-gray-300">|</span>
                <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">Complete Your Payment</h3>
              </div>
              <button
                onClick={closePaymentModal}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 -mr-1"
                aria-label="Close payment"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div 
                className="w-full custom-scrollbar" 
                style={{ 
                  minHeight: '500px', 
                  maxHeight: '70vh', 
                  overflowY: 'auto',
                  paddingRight: '8px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#888 #f1f1f1',
                }}
              >
                <div className="w-full" style={{ minHeight: '500px', position: 'relative' }}>
                  <WhopCheckoutEmbed 
                    ref={checkoutRef}
                    planId={planDetails.planId}
                    onComplete={handleSuccess}
                    containerStyle={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'transparent',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    iframeProps={{
                      sandbox: 'allow-scripts allow-forms allow-payment allow-same-origin allow-popups',
                      referrerPolicy: 'no-referrer',
                      allow: 'payment',
                      style: {
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'transparent'
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Processing your request</h3>
            <p className="text-gray-600">Preparing secure payment window...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
