import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { channelsByCountry } from "@/data/channelsData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ChannelsList = () => {
  const filteredCountries = channelsByCountry.map(country => ({
    ...country,
    uniqueCategories: [...new Set(country.channels.map(c => c.category))]
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-8 px-4 md:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <Helmet>
            <title>Countries List | Stream Prime Hub</title>
            <meta name="description" content="Browse available countries with their TV channels" />
          </Helmet>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Available Countries</h1>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-muted-foreground">
                All countries include local channels, PPV, 24/7 sports, kids' TV, news, movies, local stations, and more. Enjoy unlimited entertainment from around the world!
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">VOD included:</span> Latest movies & series on demand, adult content (upon request), and access to popular streaming platforms like Netflix, Apple TV+, Disney+, and more - all in one place!
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCountries.map((country) => (
              <Card key={`${country.code}-${country.country}`} className="overflow-hidden hover:shadow-md transition-shadow border">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://flagcdn.com/24x18/${country.code}.png`} 
                      alt={country.country}
                      className="h-4 w-6 object-cover rounded-sm shadow"
                      loading="lazy"
                    />
                    <CardTitle className="text-lg font-semibold">{country.country}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No countries found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChannelsList;
