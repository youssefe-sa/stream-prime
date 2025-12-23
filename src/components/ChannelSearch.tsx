import { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Tv, X } from 'lucide-react';
import { channelSections } from '@/data/channelSections';
import { cn } from '@/lib/utils';

interface SearchResult {
  section: string;
  channel: string;
}

const ChannelSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Fermer les résultats quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchResultsRef.current && 
          !searchResultsRef.current.contains(event.target as Node) &&
          searchInputRef.current &&
          !searchInputRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    searchInputRef.current?.focus();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(term.length > 0);
  };

  const filteredResults = useMemo<SearchResult[]>(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.trim().toLowerCase();
    const results: SearchResult[] = [];
    
    channelSections.forEach(section => {
      section.entries.forEach(entry => {
        if (entry.toLowerCase().includes(term)) {
          results.push({
            section: section.title,
            channel: entry
          });
        }
      });
    });
    
    return results;
  }, [searchTerm]);

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background relative overflow-visible pb-24 sm:pb-32" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/15 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-3 mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Channel Search</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Find Your Favorite Channels</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All countries include local channels, PPV, 24/7 sports, kids' TV, news, movies, local stations, and more. Enjoy unlimited entertainment from around the world!
          </p>
          <p className="text-primary/80 text-sm max-w-2xl mx-auto mt-2">
            VOD included: Latest movies & series on demand, adult content (upon request), and access to popular streaming platforms like Netflix, Apple TV+, Disney+, and more - all in one place!
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="relative z-50">
            <div className="rounded-2xl border border-border/50 bg-card shadow-lg relative z-50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => setIsSearching(true)}
                  placeholder="Search for channels..."
                  className={cn(
                    "pl-12 pr-10 w-full h-14 text-base",
                    "bg-background text-foreground border border-input",
                    "focus-visible:ring-2 focus-visible:ring-primary/70"
                  )}
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
            
            {isSearching && (
              <div 
                ref={searchResultsRef}
                className="absolute w-full mt-2 bg-card rounded-xl shadow-2xl border border-border overflow-hidden transition-all duration-200"
                style={{
                  maxHeight: 'min(400px, calc(100vh - 450px))',
                  overflowY: 'auto',
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                {searchTerm.trim() === '' ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Start typing to search for channels
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No channels found matching "{searchTerm}"
                  </div>
                ) : (
                  <div>
                    <div className="overflow-y-auto" style={{
                      maxHeight: 'calc(100% - 40px)'
                    }}>
                      {filteredResults.map((result, index) => (
                        <div 
                          key={`${result.section}-${index}`}
                          className="p-4 hover:bg-accent/50 border-b border-border/50 last:border-0 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                              <Tv className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-foreground font-medium">{result.channel}</p>
                              <p className="text-xs text-muted-foreground mt-1">{result.section}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="sticky bottom-0 left-0 right-0 p-2 text-center text-xs text-muted-foreground bg-accent/80 backdrop-blur-sm border-t border-border/50">
                      {filteredResults.length} {filteredResults.length === 1 ? 'channel' : 'channels'} found
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelSearch;
