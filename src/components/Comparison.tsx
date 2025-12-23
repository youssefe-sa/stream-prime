import { Check, X, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  streammax: boolean | string;
  cable: boolean | string;
  others: boolean | string;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Monthly Price", streammax: "From $7.50", cable: "$100-200+", others: "$50-100+" },
  { feature: "Live TV Channels", streammax: "30,000+", cable: "200-500", others: "100-300" },
  { feature: "4K Ultra HD", streammax: true, cable: false, others: "Limited" },
  { feature: "No Contract", streammax: true, cable: false, others: true },
  { feature: "Multi-Device Support", streammax: "Up to 5", cable: "1-2", others: "1-4" },
  { feature: "VOD Library", streammax: "50,000+", cable: "Limited", others: "Varies" },
  { feature: "International Channels", streammax: "100+ Countries", cable: "Add-on $$$", others: "Limited" },
  { feature: "Sports Packages", streammax: "Included", cable: "Extra $50+", others: "Extra $15+" },
  { feature: "DVR / Catch-up", streammax: true, cable: "Extra Fee", others: "Limited" },
  { feature: "EPG TV Guide", streammax: true, cable: true, others: "Some" },
  { feature: "Works on Smart TV", streammax: true, cable: "Box Required", others: true },
  { feature: "Cancel Anytime", streammax: true, cable: "Fees Apply", others: true },
  { feature: "24/7 Support", streammax: true, cable: "Limited Hours", others: "Email Only" },
  { feature: "Setup Time", streammax: "5 Minutes", cable: "Technician Visit", others: "15-30 min" },
];

const ValueCell = ({ value }: { value: boolean | string }) => {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-500" />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
          <X className="w-4 h-4 text-destructive" />
        </div>
      </div>
    );
  }
  return <span className="text-sm">{value}</span>;
};

export const Comparison = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Switch?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Compare & Save
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how StreamMax stacks up against traditional cable and other streaming services.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-4 pt-4">
              <div className="p-4" />
              <div className="glass-card p-4 text-center border-primary/50 bg-primary/5 relative overflow-visible">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-xl font-bold text-primary mt-2">StreamMax</h3>
                <p className="text-sm text-muted-foreground">Premium IPTV</p>
              </div>
              <div className="glass-card p-4 text-center">
                <h3 className="text-xl font-bold text-foreground">Cable TV</h3>
                <p className="text-sm text-muted-foreground">Traditional</p>
              </div>
              <div className="glass-card p-4 text-center">
                <h3 className="text-xl font-bold text-foreground">Others</h3>
                <p className="text-sm text-muted-foreground">Streaming Apps</p>
              </div>
            </div>

            {/* Data Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 gap-4 ${
                  index % 2 === 0 ? "bg-card/30" : ""
                } rounded-lg`}
              >
                <div className="p-4 flex items-center">
                  <span className="text-sm font-medium text-foreground">
                    {row.feature}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-center bg-primary/5 border-x border-primary/10">
                  <span className="font-semibold text-primary">
                    <ValueCell value={row.streammax} />
                  </span>
                </div>
                <div className="p-4 flex items-center justify-center text-muted-foreground">
                  <ValueCell value={row.cable} />
                </div>
                <div className="p-4 flex items-center justify-center text-muted-foreground">
                  <ValueCell value={row.others} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 glass-card">
            <div className="text-left">
              <p className="text-lg font-semibold text-foreground">
                Ready to make the switch?
              </p>
              <p className="text-sm text-muted-foreground">
                Join 50,000+ users saving money on entertainment
              </p>
            </div>
            <a href="#pricing" className="btn-primary px-8 py-3 whitespace-nowrap">
              View Plans
            </a>
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">$1,200+</p>
            <p className="text-sm text-muted-foreground">Average yearly savings vs Cable TV</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">30x</p>
            <p className="text-sm text-muted-foreground">More channels than basic cable</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">0</p>
            <p className="text-sm text-muted-foreground">Hidden fees or equipment rentals</p>
          </div>
        </div>
      </div>
    </section>
  );
};
