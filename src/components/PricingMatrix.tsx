import { useState } from "react";
import { Check, Sparkles, Monitor, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, trialPlan, getMonthlyRate, getSavingsPercentage } from "@/data/pricing";

interface PricingMatrixProps {
  onSelectPlan: (planId: string, price: number, duration: string, devices: number) => void;
}

export const PricingMatrix = ({ onSelectPlan }: PricingMatrixProps) => {
  const [selectedDuration, setSelectedDuration] = useState("12months");
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [showPricingTable, setShowPricingTable] = useState(false);

  const currentPlan = pricingPlans.find((p) => p.duration === selectedDuration);
  const currentDevice = currentPlan?.devices.find((d) => d.count === selectedDevices);
  const savings = getSavingsPercentage(selectedDuration, selectedDevices);
  const monthlyRate = currentDevice 
    ? getMonthlyRate(currentDevice.price, parseInt(selectedDuration) || 1)
    : 0;

  const handleCheckout = () => {
    if (currentDevice) {
      onSelectPlan(
        currentDevice.planId,
        currentDevice.price,
        currentPlan?.durationLabel || "",
        selectedDevices
      );
    }
  };


  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Flexible Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your subscription duration and number of devices.<br />
            Longer plans = bigger savings.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-5xl mx-auto">
          {/* Left Column - Selectors */}
          <div className="space-y-8">
            {/* Duration Selector */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                1. Choose Duration
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {pricingPlans.map((plan) => {
                  const isSelected = selectedDuration === plan.duration;
                  const planSavings = getSavingsPercentage(plan.duration, selectedDevices);
                  return (
                    <button
                      key={plan.duration}
                      onClick={() => setSelectedDuration(plan.duration)}
                      className={`relative px-4 py-4 rounded-xl font-medium transition-all text-center ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-card hover:bg-card/80 text-foreground border border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block text-lg font-bold">{plan.durationLabel}</span>
                      {planSavings > 0 && (
                        <span className={`block text-xs mt-1 ${isSelected ? "text-primary-foreground/80" : "text-green-500"}`}>
                          Save {planSavings}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Device Selector */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                2. Select Devices
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((count) => {
                  const isSelected = selectedDevices === count;
                  return (
                    <button
                      key={count}
                      onClick={() => setSelectedDevices(count)}
                      className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all ${
                        isSelected
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-card/50 border border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-0.5 flex-wrap">
                        {Array.from({ length: count }).map((_, i) => (
                          <Monitor key={i} className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="glass-card p-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">How to choose your plan?</h3>
                  <p className="text-sm text-muted-foreground">
                    Select duration and number of devices to see your subscription price.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Summary Card */}
          {currentDevice && (
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="pricing-card pricing-card-selected">
                <div className="flex flex-col items-center text-center">
                  <div className="w-full pb-4 mb-4 border-b border-border/50">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Your Selection</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">
                      {currentPlan?.durationLabel} • {selectedDevices} Device{selectedDevices > 1 ? "s" : ""}
                    </h3>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-bold text-foreground">${currentDevice.price}</span>
                  </div>
                  
                  <span className="text-sm text-muted-foreground mb-4">one-time payment</span>

                  {parseInt(selectedDuration) > 1 && (
                    <div className="bg-primary/10 rounded-lg px-4 py-2 mb-6">
                      <span className="text-primary font-semibold">
                        ${monthlyRate}/month
                      </span>
                      {savings > 0 && (
                        <span className="text-green-500 font-medium ml-2">
                          ({savings}% off)
                        </span>
                      )}
                    </div>
                  )}

                  <ul className="space-y-2 mb-6 w-full text-left">
                    {[
                      "30,000+ Live Channels",
                      "50,000+ VOD Content",
                      "HD & 4K Quality",
                      "EPG TV Guide",
                      "Catch-Up TV",
                      "24/7 Support",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button onClick={handleCheckout} className="btn-primary w-full text-lg py-6">
                    Subscribe Now
                  </Button>
                  
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <p className="text-xs text-muted-foreground">
                      Secure payment • Instant activation
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="bg-white rounded px-2 py-0.5 h-5 flex items-center justify-center">
                        <span className="text-[#1A1F71] font-bold text-[10px]">VISA</span>
                      </div>
                      <div className="bg-white rounded px-2 py-0.5 h-5 flex items-center justify-center gap-0">
                        <div className="w-3 h-3 rounded-full bg-[#EB001B]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5"></div>
                      </div>
                      <div className="bg-[#006FCF] rounded px-1.5 py-0.5 h-5 flex items-center justify-center">
                        <div className="flex flex-col items-center leading-none">
                          <span className="text-white font-bold text-[6px] tracking-tight">AMERICAN</span>
                          <span className="text-white font-bold text-[6px] tracking-tight">EXPRESS</span>
                        </div>
                      </div>
                      <div className="bg-[#00D632] rounded px-2 py-0.5 h-5 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">CashAPP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Pricing Table */}
        <div className="mt-12 max-w-5xl mx-auto text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm font-medium">View all pricing options</span>
            <ChevronDown className="w-4 h-4" />
          </a>
          
          {showPricingTable && (
            <div className="mt-6 overflow-x-auto glass-card p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-muted-foreground font-medium text-sm border-b border-border">Duration</th>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <th key={d} className="p-3 text-center text-muted-foreground font-medium text-sm border-b border-border">
                        {d} Device{d > 1 ? "s" : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingPlans.map((plan) => (
                    <tr key={plan.duration} className="hover:bg-card/50 transition-colors">
                      <td className="p-3 font-medium text-foreground text-sm border-b border-border/50">
                        {plan.durationLabel}
                      </td>
                      {plan.devices.map((device) => {
                        const isCurrentSelection = plan.duration === selectedDuration && device.count === selectedDevices;
                        return (
                          <td 
                            key={device.count}
                            onClick={() => {
                              setSelectedDuration(plan.duration);
                              setSelectedDevices(device.count);
                            }}
                            className={`p-3 text-center border-b border-border/50 cursor-pointer transition-colors ${
                              isCurrentSelection 
                                ? "bg-primary/20 text-primary font-bold" 
                                : "hover:bg-primary/10"
                            }`}
                          >
                            <span className="font-semibold text-sm">${device.price}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
