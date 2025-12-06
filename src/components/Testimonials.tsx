import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  plan: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael R.",
    location: "Texas, USA",
    avatar: "MR",
    rating: 5,
    text: "Switched from cable and couldn't be happier. The sports coverage is incredible - I never miss a game now. Crystal clear 4K quality on my big screen.",
    plan: "12 Month Plan",
  },
  {
    id: "2",
    name: "Sarah K.",
    location: "London, UK",
    avatar: "SK",
    rating: 5,
    text: "Finally found a service that actually works! Setup took 5 minutes and the channel selection is massive. Love having access to UK and US channels.",
    plan: "6 Month Plan",
  },
  {
    id: "3",
    name: "David M.",
    location: "Toronto, Canada",
    avatar: "DM",
    rating: 5,
    text: "The VOD library is a game changer. My whole family uses it - the kids love the cartoon channels and I get all my sports. Best decision ever.",
    plan: "24 Month Plan",
  },
  {
    id: "4",
    name: "Emma L.",
    location: "Sydney, Australia",
    avatar: "EL",
    rating: 4,
    text: "Great value for money. I was skeptical at first but the $2 trial convinced me. Now streaming on 3 devices without any buffering issues.",
    plan: "3 Month Plan",
  },
  {
    id: "5",
    name: "Carlos G.",
    location: "Miami, USA",
    avatar: "CG",
    rating: 5,
    text: "As a cord-cutter, this is exactly what I needed. Spanish channels, sports packages, everything works perfectly on my FireStick. Highly recommend!",
    plan: "12 Month Plan",
  },
  {
    id: "6",
    name: "Jennifer W.",
    location: "Berlin, Germany",
    avatar: "JW",
    rating: 5,
    text: "Customer support is amazing - they helped me set up on my Samsung TV in minutes. The EPG guide makes finding shows so easy. Love it!",
    plan: "6 Month Plan",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

export const Testimonials = () => {
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            See what our customers are saying about their streaming experience.
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">{averageRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  Based on {testimonials.length * 847} reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 hover:border-primary/30 transition-all group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10">
                  {testimonial.plan}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.9★</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
