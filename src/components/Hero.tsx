import { useState, useEffect } from "react";
import { Play, Check, ArrowRight, Tv, Globe, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import contentSports from "@/assets/content-sports.jpg";
import contentMovies from "@/assets/content-movies.jpg";
import contentNews from "@/assets/content-news.jpg";
import contentKids from "@/assets/content-kids.jpg";

interface HeroProps {
  onOpenPricing: () => void;
}

const carouselSlides = [
  {
    category: "LIVE SPORTS",
    title: "NFL, NBA, UFC & More",
    description: "Never miss a game with premium sports coverage",
    gradient: "from-orange-600/20 via-red-600/10 to-transparent",
    channels: ["ESPN", "Fox Sports", "NBC Sports", "beIN Sports"],
    image: contentSports,
  },
  {
    category: "PPV EVENTS",
    title: "UFC, Boxing & WWE",
    description: "All pay-per-view events included at no extra cost",
    gradient: "from-red-600/20 via-orange-600/10 to-transparent",
    channels: ["UFC", "Boxing", "WWE", "AEW"],
    image: contentSports,
  },
  {
    category: "STREAMING APPS",
    title: "All Premium Services",
    description: "Access content from all major streaming platforms",
    gradient: "from-purple-600/20 via-pink-600/10 to-transparent",
    channels: ["Netflix", "Disney+", "Apple TV+", "Prime Video"],
    image: contentMovies,
  },
  {
    category: "MOVIES & SERIES",
    title: "50,000+ On Demand",
    description: "Latest blockbusters and binge-worthy series",
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    channels: ["HBO Max", "Showtime", "Paramount+", "Hulu"],
    image: contentMovies,
  },
  {
    category: "WORLD NEWS",
    title: "Global Coverage 24/7",
    description: "Stay informed with international news channels",
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    channels: ["CNN", "BBC", "Sky News", "Al Jazeera"],
    image: contentNews,
  },
  {
    category: "KIDS & FAMILY",
    title: "Safe Entertainment",
    description: "Fun content for the whole family",
    gradient: "from-green-600/20 via-emerald-600/10 to-transparent",
    channels: ["Disney Jr", "Nickelodeon", "Cartoon Network", "PBS Kids"],
    image: contentKids,
  },
];

export const Hero = ({ onOpenPricing }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const slide = carouselSlides[currentSlide];

  const stats = [
    { icon: Tv, value: "18K+", label: "Live Channels" },
    { icon: Globe, value: "100+", label: "Countries" },
    { icon: Zap, value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://www.apple.com/105/media/us/apple-tv-plus/2022/4114721e-12d2-4260-87c4-678589d5f804/anim/supercut/large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Dynamic Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000 z-[1]`}
      />

      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-32 pb-16 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Premium IPTV Service</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              Stream <span className="text-primary">Everything</span>
              <br />
              Anytime, Anywhere
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-up delay-200">
              Access 30,000+ live channels, 50,000+ movies & series, PPV events and On Demand content in stunning HD & 4K quality.
              Compatible with all your devices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-up delay-300">
              <Button 
                asChild
                className="btn-primary text-lg px-10 py-6 group"
              >
                <a href="/channels">
                  <Tv className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Browse Channels
                </a>
              </Button>
              <Button 
                onClick={onOpenPricing}
                variant="outline"
                className="btn-secondary text-lg px-10 py-6"
              >
                View Plans
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 animate-fade-up delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-card/60 border border-border flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Animated Carousel with Images */}
          <div className="relative animate-fade-up delay-300">
            {/* Main Carousel Card */}
            <div className="relative glass-card overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isAnimating ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Category Badge on Image */}
                <div 
                  className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 border border-primary/30 transition-all duration-300 ${
                    isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-xs font-semibold text-primary-foreground tracking-wider">
                    {slide.category}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary hover:scale-110 transition-all">
                    <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Content Below Image */}
              <div className="p-6">
                <div 
                  className={`transition-all duration-300 ${
                    isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {slide.description}
                  </p>

                  {/* Channel Pills */}
                  <div className="flex flex-wrap gap-2">
                    {slide.channels.map((channel) => (
                      <span
                        key={channel}
                        className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    {carouselSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-8 bg-primary"
                            : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl blur-xl animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-2xl blur-xl animate-float delay-500" />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by thousands of users worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Secure Payment", "Instant Activation", "24/7 Support", "Money-Back Trial"].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};
