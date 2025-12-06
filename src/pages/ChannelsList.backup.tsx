import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { channelsByCountry } from "@/data/channelsData";

// Composants de remplacement si les vrais ne sont pas trouvés
const Header = () => (
  <header className="bg-background border-b p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">StreamPrime</h1>
      <nav>
        <a href="/" className="ml-4 hover:underline">Accueil</a>
        <a href="/channels" className="ml-4 font-medium text-primary">Chaînes</a>
        <a href="/pricing" className="ml-4 hover:underline">Abonnements</a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-background border-t p-6 mt-8">
    <div className="container mx-auto text-center text-sm text-muted-foreground">
      {new Date().getFullYear()} StreamPrime. Tous droits réservés.
    </div>
  </footer>
);

type ViewMode = 'all' | 'by-country' | 'by-category';

const ChannelsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const navigate = useNavigate();

  // Filtrer les chaînes en fonction du terme de recherche
  const filteredChannels = channelsByCountry.flatMap(country => 
    country.channels
      .filter(channel => 
        channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(channel => ({
        ...channel,
        country: country.country,
        countryCode: country.code
      }))
  );

  const categories = [...new Set(channelsByCountry.flatMap(c => 
    c.channels.map(ch => ch.category)
  ))];
          
          {(selectedCountry === country.code) && (
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {country.channels.map((channel) => (
                  <div 
                    key={channel.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/watch/${channel.id}`)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {channel.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{channel.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{channel.category}</span>
                          {channel.isHD && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-medium">HD</span>}
                          {channel.isLive && <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-medium">LIVE</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );

  const renderAllChannels = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredCountries.flatMap(country => 
        country.channels.map(channel => (
          <Card key={channel.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {channel.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{channel.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{country.country}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{channel.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {channel.isHD && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-medium">HD</span>}
                    {channel.isLive && <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-medium">LIVE</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderChannelsByCategory = () => (
    <div className="space-y-8">
      {categories.map(category => {
        const categoryChannels = filteredCountries.flatMap(country => 
          country.channels.filter(ch => ch.category === category)
        );
        
        if (categoryChannels.length === 0) return null;
        
        return (
          <Card key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left"
            >
              <CardHeader className="bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {categoryChannels.length} channels
                  </div>
                </div>
              </CardHeader>
            </button>
            
            {(selectedCategory === category) && (
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {categoryChannels.map(channel => {
                    const country = channelsByCountry.find(c => 
                      c.channels.some(ch => ch.id === channel.id)
                    );
                    
                    return (
                      <div 
                        key={channel.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md"
                        onClick={() => navigate(`/watch/${channel.id}`)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {channel.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{channel.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{country?.country}</span>
                              {channel.isHD && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-medium">HD</span>}
                              {channel.isLive && <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-medium">LIVE</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-8 flex-1">
      <Helmet>
        <title>Channels List - StreamPrime</title>
        <meta
          name="description"
          content="Browse our complete list of TV channels from around the world. Sports, news, movies, entertainment and more."
        />
      </Helmet>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Channels List</h1>
        <p className="text-muted-foreground">
          Browse through our extensive collection of TV channels from around the world
        </p>
      </div>

      <div className="mb-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search channels..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Tabs 
            defaultValue="by-country" 
            className="w-full md:w-auto"
            onValueChange={(value) => setViewMode(value as ViewMode)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="by-country">By Country</TabsTrigger>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={searchTerm ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchTerm("")}
          >
            All Channels
          </Button>
          <Button
            variant={searchTerm === "HD" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchTerm("HD")}
          >
            HD Only
          </Button>
          <Button
            variant={searchTerm === "LIVE" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchTerm("LIVE")}
          >
            Live Now
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={searchTerm === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchTerm(searchTerm === category ? "" : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {viewMode === 'all' && renderAllChannels()}
        {viewMode === 'by-country' && renderChannelsByCountry()}
        {viewMode === 'by-category' && renderChannelsByCategory()}
        
        {filteredCountries.length === 0 && (
          <div className="text-center py-12 bg-card rounded-lg border">
            <h3 className="text-lg font-medium">No channels found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelsList;
