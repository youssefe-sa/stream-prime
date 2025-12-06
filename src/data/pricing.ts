export interface PricingPlan {
  duration: string;
  durationLabel: string;
  devices: {
    count: number;
    price: number;
    planId: string;
  }[];
}

export const trialPlan = {
  label: "24 Hour Trial",
  price: 2,
  planId: "plan_6sH670SzLLJex",
};

export const pricingPlans: PricingPlan[] = [
  {
    duration: "1month",
    durationLabel: "1 Month",
    devices: [
      { count: 1, price: 19.99, planId: "plan_xbpa4DpyLg85i" },
      { count: 2, price: 29.99, planId: "plan_ernm6NfKfHdxF" },
      { count: 3, price: 39.99, planId: "plan_1AIsRQt3Efd4f" },
      { count: 4, price: 49.99, planId: "plan_xhcFAj2bPvgKi" },
      { count: 5, price: 59.99, planId: "plan_3Mt89S8M4D4S3" },
    ],
  },
  {
    duration: "3months",
    durationLabel: "3 Months",
    devices: [
      { count: 1, price: 39.99, planId: "plan_9ZTawRscu26gt" },
      { count: 2, price: 59.99, planId: "plan_yXyCwVAUKgVx5" },
      { count: 3, price: 79.99, planId: "plan_zUrHzNnKvwsqS" },
      { count: 4, price: 99.99, planId: "plan_FoNtUDFzRhMPY" },
      { count: 5, price: 119.99, planId: "plan_LIl03BdWyQq68" },
    ],
  },
  {
    duration: "6months",
    durationLabel: "6 Months",
    devices: [
      { count: 1, price: 49.99, planId: "plan_0u59QLetbINEp" },
      { count: 2, price: 74.99, planId: "plan_MliLsoB61nJQp" },
      { count: 3, price: 99.99, planId: "plan_gmKLfXcZ56rmr" },
      { count: 4, price: 124.99, planId: "plan_90GnCLye2mFQx" },
      { count: 5, price: 149.99, planId: "plan_irL2sy7OFlYBt" },
    ],
  },
  {
    duration: "12months",
    durationLabel: "12 Months",
    devices: [
      { count: 1, price: 89.99, planId: "plan_tSPGtDGkwPI28" },
      { count: 2, price: 129.99, planId: "plan_7dmhZAf2syhm7" },
      { count: 3, price: 169.99, planId: "plan_1lvPmiECkjT9r" },
      { count: 4, price: 209.99, planId: "plan_JBuXbqBxwU9C4" },
      { count: 5, price: 249.99, planId: "plan_oVqr0I7qXsat5" },
    ],
  },
  {
    duration: "24months",
    durationLabel: "24 Months",
    devices: [
      { count: 1, price: 149.99, planId: "plan_7vOQBI3UohGzp" },
      { count: 2, price: 224.99, planId: "plan_li1INjbEIX62F" },
      { count: 3, price: 299.99, planId: "plan_xTRnFzluD77e9" },
      { count: 4, price: 374.99, planId: "plan_VxexcwogzJBhL" },
      { count: 5, price: 449.99, planId: "plan_Txl9ArF475jTO" },
    ],
  },
];

export const getMonthlyRate = (price: number, months: number): number => {
  return Number((price / months).toFixed(2));
};

export const getSavingsPercentage = (duration: string, devices: number): number => {
  const baseMonthly = pricingPlans[0].devices.find(d => d.count === devices)?.price || 0;
  const plan = pricingPlans.find(p => p.duration === duration);
  const months = parseInt(duration) || 1;
  
  if (!plan || months <= 1) return 0;
  
  const currentPrice = plan.devices.find(d => d.count === devices)?.price || 0;
  const wouldCost = baseMonthly * months;
  
  return Math.round(((wouldCost - currentPrice) / wouldCost) * 100);
};
