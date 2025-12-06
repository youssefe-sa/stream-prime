import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Tv, Clock, Star, Award } from "lucide-react";
import { pricingPlans, trialPlan, getMonthlyRate, getSavingsPercentage } from "@/data/pricing";

interface SelectedPlanInfo {
  planId: string;
  price: number;
  duration: string;
  devices: number;
}

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState("12months");
  const [selectedDevices, setSelectedDevices] = useState(1);

  const currentPlan = pricingPlans.find(p => p.duration === selectedDuration);
  const currentDeviceOption = currentPlan?.devices.find(d => d.count === selectedDevices);
  const months = parseInt(selectedDuration) || 1;
  const monthlyRate = currentDeviceOption ? getMonthlyRate(currentDeviceOption.price, months) : 0;
  const savings = getSavingsPercentage(selectedDuration, selectedDevices);

  const handleSelectPlan = (planId: string, price: number, duration: string, devices: number) => {
    navigate('/checkout', {
      state: {
        planDetails: {
          planId,
          price,
          duration,
          devices,
          monthlyRate: getMonthlyRate(price, parseInt(duration) || 1)
        }
      }
    });
  };

  const features = [
    { icon: Tv, text: "18,000+ Live Channels" },
    { icon: Star, text: "150,000+ VOD Content" },
    { icon: Shield, text: "Anti-Freeze Technology" },
    { icon: Clock, text: "24/7 Support" },
    { icon: Zap, text: "Instant Activation" },
    { icon: Award, text: "Premium Quality" },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing Plans | StreamMax IPTV</title>
        <meta name="description" content="Choose from our flexible IPTV subscription plans. Starting from $7.50/month with access to 18,000+ channels and 150,000+ VOD content." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="section-container relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                Simple & Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Choose Your <span className="text-primary">Perfect Plan</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Flexible subscriptions designed to fit your needs. No hidden fees, cancel anytime.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/40 border border-border/50"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm text-muted-foreground text-center">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Configuration */}
        <section className="py-8 md:py-16">
          <div className="section-container">
            {/* Duration Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                1. Select Duration
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {pricingPlans.map((plan) => {
                  const planSavings = getSavingsPercentage(plan.duration, selectedDevices);
                  return (
                    <button
                      key={plan.duration}
                      onClick={() => setSelectedDuration(plan.duration)}
                      className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedDuration === plan.duration
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-card border border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {plan.durationLabel}
                      {planSavings > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-green-500 text-white rounded-full">
                          -{planSavings}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Device Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                2. Select Number of Devices
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => setSelectedDevices(count)}
                    className={`w-16 h-16 rounded-xl font-bold text-lg transition-all duration-300 ${
                      selectedDevices === count
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card border border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-3">
                Stream on {selectedDevices} device{selectedDevices > 1 ? "s" : ""} simultaneously
              </p>
            </div>

            {/* Pricing Card */}
            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8 md:p-10 glow-effect relative overflow-hidden">
                {savings > 0 && (
                  <div className="absolute top-4 right-4 px-4 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30">
                    Save {savings}%
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentPlan?.durationLabel} • {selectedDevices} Device{selectedDevices > 1 ? "s" : ""}
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-bold text-primary">
                      ${currentDeviceOption?.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">total</span>
                  </div>
                  <p className="text-lg text-muted-foreground mt-2">
                    Only <span className="text-foreground font-semibold">${monthlyRate}/month</span>
                  </p>
                </div>

                {/* Features List */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    "18,000+ Live TV Channels",
                    "150,000+ Movies & Series",
                    "All Sports Channels & PPV",
                    "4K/FHD/HD Quality",
                    "Anti-Freeze Technology",
                    "EPG TV Guide",
                    "VOD Library Access",
                    "24/7 Customer Support",
                    "Works on All Devices",
                    "Instant Activation",
                    "No Contract Required",
                    "Free Updates",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() =>
                    handleSelectPlan(
                      currentDeviceOption?.planId || "",
                      currentDeviceOption?.price || 0,
                      currentPlan?.durationLabel || "",
                      selectedDevices
                    )
                  }
                  className="btn-primary w-full text-lg py-6"
                >
                  Get Started Now
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Instant activation • Secure payment • 24/7 support
                </p>
              </div>
            </div>

            {/* Trial Option */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Not sure yet?</h4>
                  <p className="text-muted-foreground">Try our 24-hour trial for just ${trialPlan.price}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleSelectPlan(trialPlan.planId, trialPlan.price, "24 Hour Trial", 1)}
                  className="whitespace-nowrap"
                >
                  Start Trial - ${trialPlan.price}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* All Plans Table */}
        <section className="py-16 bg-card/30">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              All Subscription Plans
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left text-muted-foreground font-medium">Duration</th>
                    {[1, 2, 3, 4, 5].map((count) => (
                      <th key={count} className="py-4 px-4 text-center text-muted-foreground font-medium">
                        {count} Device{count > 1 ? "s" : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingPlans.map((plan, index) => (
                    <tr
                      key={plan.duration}
                      className={`border-b border-border/50 ${index === 3 ? "bg-primary/5" : ""}`}
                    >
                      <td className="py-4 px-4">
                        <span className="font-semibold text-foreground">{plan.durationLabel}</span>
                        {index === 3 && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                            Popular
                          </span>
                        )}
                      </td>
                      {plan.devices.map((device) => (
                        <td key={device.count} className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleSelectPlan(device.planId, device.price, plan.durationLabel, device.count)}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            ${device.price}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-16">
          <div className="section-container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out our frequently asked questions or contact our 24/7 support team.
            </p>
            <Button variant="outline" asChild>
              <a href="/faq">View FAQ</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Pricing;
