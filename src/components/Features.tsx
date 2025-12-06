import { Zap, Globe, Tv, Clock, Film, Shield, Smartphone, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "99.9% Uptime",
    description: "Reliable streaming with redundant servers ensuring uninterrupted entertainment 24/7.",
  },
  {
    icon: Tv,
    title: "HD & 4K Quality",
    description: "Crystal clear picture quality with support for Full HD and 4K Ultra HD streams.",
  },
  {
    icon: Globe,
    title: "18,000+ Channels",
    description: "Access live TV from 100+ countries including sports, news, movies, and entertainment.",
  },
  {
    icon: Smartphone,
    title: "Multi-Device Support",
    description: "Watch on Smart TV, FireStick, Android, iOS, MAG, Formuler, and more devices.",
  },
  {
    icon: Clock,
    title: "EPG Guide",
    description: "Full electronic program guide with 7-day TV listings for easy scheduling.",
  },
  {
    icon: Film,
    title: "VOD Library",
    description: "50,000+ movies and TV series on-demand, updated weekly with latest releases.",
  },
  {
    icon: Shield,
    title: "Anti-Freeze Tech",
    description: "Advanced buffering optimization ensures smooth playback without interruptions.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support team ready to help via chat, email, or WhatsApp.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the ultimate streaming experience, all in one subscription.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
