import { Play } from "lucide-react";
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
    description: "18,000+ live TV channels worldwide",
    channels: "18,000+",
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
];

const featuredContent = [
  { title: "Breaking Bad", type: "Series", rating: "9.5", image: contentVod },
  { title: "The Dark Knight", type: "Movie", rating: "9.0", image: contentMovies },
  { title: "Game of Thrones", type: "Series", rating: "9.3", image: contentLive },
  { title: "Inception", type: "Movie", rating: "8.8", image: contentPpv },
  { title: "Stranger Things", type: "Series", rating: "8.7", image: contentKids },
  { title: "The Godfather", type: "Movie", rating: "9.2", image: contentNews },
];

export const ContentShowcase = () => {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-16">
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

        {/* Featured Content Row */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Popular Right Now
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredContent.map((content, index) => (
              <div
                key={index}
                className="group glass-card p-4 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="aspect-[2/3] rounded-lg bg-muted mb-3 overflow-hidden relative">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Play className="absolute inset-0 m-auto w-8 h-8 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-primary/90 text-primary-foreground text-xs font-bold">
                    ★ {content.rating}
                  </div>
                </div>
                <h4 className="text-sm font-medium text-foreground line-clamp-1">
                  {content.title}
                </h4>
                <p className="text-xs text-muted-foreground">{content.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
