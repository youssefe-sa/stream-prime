import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from 'react';
import contentSports from "@/assets/content-sports.jpg";
import contentMovies from "@/assets/content-movies.jpg";
import contentNews from "@/assets/content-news.jpg";
import contentKids from "@/assets/content-kids.jpg";
import contentPpv from "@/assets/content-ppv.jpg";
import contentLive from "@/assets/content-live.jpg";
import contentVod from "@/assets/content-vod.jpg";

const categories = [
  {
    id: "live",
    title: "Live Channels",
    description: "30,000+ live TV channels worldwide",
    channels: "30,000+",
    image: contentLive,
    gradient: "from-cyan-600/80 to-transparent",
  },
  {
    id: "sports",
    title: "Live Sports",
    description: "NFL, NBA, UFC, Soccer & more",
    channels: "2,500+",
    image: contentSports,
    gradient: "from-orange-600/80 to-transparent",
  },
  {
    id: "ppv",
    title: "PPV Events",
    description: "UFC, Boxing, Wrestling & exclusive events",
    channels: "All PPV",
    image: contentPpv,
    gradient: "from-red-600/80 to-transparent",
  },
  {
    id: "vod",
    title: "On Demand",
    description: "50,000+ movies & series",
    channels: "Unlimited",
    image: contentVod,
    gradient: "from-purple-600/80 to-transparent",
  },
  {
    id: "movies",
    title: "Movies & Series",
    description: "Latest blockbusters & classics",
    channels: "50K+",
    image: contentMovies,
    gradient: "from-violet-600/80 to-transparent",
  },
  {
    id: "news",
    title: "World News",
    description: "24/7 global coverage",
    channels: "500+",
    image: contentNews,
    gradient: "from-blue-600/80 to-transparent",
  },
  {
    id: "kids",
    title: "Kids & Family",
    description: "Safe entertainment for all ages",
    channels: "1,000+",
    image: contentKids,
    gradient: "from-green-600/80 to-transparent",
  },
  {
    id: "music",
    title: "Music & Entertainment",
    description: "Music channels & concerts",
    channels: "800+",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop",
    gradient: "from-pink-600/80 to-transparent",
  },
];

const featuredContent = [
  { title: "Breaking Bad", type: "Series", rating: "9.5", image: contentVod },
  { title: "The Dark Knight", type: "Movie", rating: "9.0", image: contentMovies },
  { title: "Game of Thrones", type: "Series", rating: "9.3", image: contentLive },
  { title: "Inception", type: "Movie", rating: "8.8", image: contentPpv },
  { title: "Stranger Things", type: "Series", rating: "8.7", image: contentKids },
  { title: "The Godfather", type: "Movie", rating: "9.2", image: contentNews },
];

const popularContent = [
  { 
    title: "Squid Game", 
    type: "Series", 
    rating: "8.0", 
    image: contentVod,
    platform: "Netflix"
  },
  { 
    title: "Wednesday", 
    type: "Series", 
    rating: "8.1", 
    image: contentKids,
    platform: "Netflix"
  },
  { 
    title: "Top Gun: Maverick", 
    type: "Movie", 
    rating: "8.3", 
    image: contentSports,
    platform: "Paramount+"
  },
  { 
    title: "The Last of Us", 
    type: "Series", 
    rating: "8.8", 
    image: contentNews,
    platform: "HBO Max"
  },
  { 
    title: "Barbie", 
    type: "Movie", 
    rating: "7.0", 
    image: contentMovies,
    platform: "Max"
  },
  { 
    title: "Oppenheimer", 
    type: "Movie", 
    rating: "8.4", 
    image: contentPpv,
    platform: "Universal"
  },
  { 
    title: "The Bear", 
    type: "Series", 
    rating: "8.6", 
    image: contentLive,
    platform: "FX/Hulu"
  },
  { 
    title: "Avatar: The Way of Water", 
    type: "Movie", 
    rating: "7.6", 
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=600&fit=crop",
    platform: "Disney+"
  },
];

export const ContentShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === popularContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? popularContent.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === popularContent.length - 1 ? 0 : currentIndex + 1);
  };

  const getCurrentSlideItems = () => {
    const isMobile = window.innerWidth < 768;
    const itemsPerSlide = isMobile ? 3 : 6;
    const items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (currentIndex + i) % popularContent.length;
      items.push(popularContent[index]);
    }
    return items;
  };

  useEffect(() => {
    const handleResize = () => {
      // Force re-render on window resize
      setCurrentIndex(0);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTransformPercentage = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? (currentIndex * 33.33) : (currentIndex * 16.66);
  };

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Endless Entertainment
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Content For Everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From live sports to blockbuster movies, we have something for the whole family.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
                    {category.channels} Channels
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                    {category.title}
                  </h3>
                  <p className="text-sm text-white/80 drop-shadow-md">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Right Now - Carousel */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              Popular Right Now
            </h3>
            <div className="flex gap-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${getTransformPercentage()}%)` }}
            >
              {popularContent.map((content, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="px-4 md:px-0">
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {getCurrentSlideItems().map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="group glass-card p-4 hover:border-primary/30 transition-all cursor-pointer flex-shrink-0 w-40 md:w-auto"
                        >
                          <div className="aspect-[2/3] rounded-lg bg-muted mb-3 overflow-hidden relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <Play className="absolute inset-0 m-auto w-8 h-8 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-primary/90 text-primary-foreground text-xs font-bold">
                              ★ {item.rating}
                            </div>
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-background/90 text-foreground text-xs font-medium">
                              {item.platform}
                            </div>
                          </div>
                          <h4 className="text-sm font-medium text-foreground line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
