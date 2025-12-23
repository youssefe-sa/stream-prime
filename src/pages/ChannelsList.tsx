import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { channelSections } from '@/data/channelSections';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, ChevronLeft, Search, Tv } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';


// Fonction utilitaire pour trier les sections selon l'ordre spécifié
const sortSections = (a: any, b: any) => {
  const sortOrder: { [key: string]: number } = {
    'usa': 1,
    'united states': 1,
    'uk': 2,
    'united kingdom': 2,
    'canada': 3,
    'australia': 4,
    'australie': 4,
    'arabic': 5,
    'arabe': 5,
    'ar ': 5,
    'bein': 5,
    'qatar': 5,
    'uae': 5,
    'saudi': 5
  };

  const getOrder = (title: string): number => {
    const lowerTitle = title.toLowerCase();
    const matchedKey = Object.keys(sortOrder).find(key => 
      lowerTitle.includes(key)
    );
    return matchedKey ? sortOrder[matchedKey] : 999;
  };

  return getOrder(a.title) - getOrder(b.title) || a.title.localeCompare(b.title);
};

const ChannelsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(term.length > 0);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  const filteredSections = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    
    // Si pas de terme de recherche, retourner toutes les sections triées
    if (!term) {
      return [...channelSections].sort(sortSections);
    }

    // Filtrer et mapper les sections avec les entrées correspondantes
    const results = channelSections.map(section => {
      const titleMatch = section.title.toLowerCase().includes(term);
      const matchingEntries = section.entries.filter(entry => 
        entry.toLowerCase().includes(term)
      );
      
      // Si la section ou des entrées correspondent, la garder
      if (titleMatch || matchingEntries.length > 0) {
        return {
          ...section,
          // Si la section ne correspond pas au titre, ne montrer que les entrées correspondantes
          entries: titleMatch ? section.entries : matchingEntries,
          // Garder une trace des entrées correspondantes pour le décompte
          _matchingEntries: matchingEntries.length
        };
      }
      return null;
    }).filter(Boolean);

    // Trier les résultats
    return results.sort((a, b) => {
      // Si une section a un titre qui correspond, elle passe en premier
      const aTitleMatch = a.title.toLowerCase().includes(term);
      const bTitleMatch = b.title.toLowerCase().includes(term);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      // Sinon, trier par nombre de correspondances puis par ordre de section
      return (b._matchingEntries - a._matchingEntries) || sortSections(a, b);
    });
  }, [searchTerm]);


  const totalChannelEntries = channelSections.reduce((sum, section) => sum + section.entries.length, 0);

  // Toutes les sections sont fermées par défaut
  useEffect(() => {
    setOpenSections([]);
  }, [filteredSections]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050910] via-[#04060d] to-[#020409] text-white">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4 md:px-8 mt-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <Helmet>
            <title>Channel Packages | Stream Prime Hub</title>
            <meta name="description" content="Search and browse curated premium TV channel packages." />
          </Helmet>

          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Premium Channels</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-white">Ultimate Channel Catalog</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              All countries include local channels, PPV, 24/7 sports, kids' TV, news, movies, local stations, and more. Enjoy unlimited entertainment from around the world!
            </p>
            <p className="text-white/70 max-w-2xl mx-auto">
              VOD included: Latest movies & series on demand, adult content (upon request), and access to popular streaming platforms like Netflix, Apple TV+, Disney+, and more - all in one place!
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 space-y-6 shadow-[0_20px_60px_rgba(3,6,12,.65)]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for channels..."
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/60 focus-visible:ring-cyan-400/70 w-full"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_30px_80px_rgba(3,6,12,.85)]">
            <div className="border-b border-white/5 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Tv className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">Home</p>
                <p className="text-white font-medium">Channel Library</p>
              </div>
            </div>

            {isSearching ? (
              <div className="p-6">
                <button
                  onClick={resetSearch}
                  className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to all channels
                </button>
                
                <div className="space-y-4">
                  {filteredSections.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                      No channels found matching "{searchTerm}"
                    </div>
                  ) : (
                    filteredSections.map((section) => (
                      <div key={section.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h3 className="text-white font-medium mb-3 text-lg">{section.title}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.entries.map((entry, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-center gap-2 py-1">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span className="truncate">{entry}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <Accordion
                type="multiple"
                value={openSections}
                onValueChange={setOpenSections}
                className="divide-y divide-white/5"
              >
                {filteredSections.map((section, sectionIndex) => {
                  const accordionId = `${section.title}-${sectionIndex}`;
                  const isOpen = openSections.includes(accordionId);
                  return (
                    <AccordionItem key={accordionId} value={accordionId}>
                      <AccordionTrigger className="px-6 py-5 hover:bg-white/5 transition text-left">
                        <div className="flex flex-col gap-1 text-left">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-semibold text-white">{section.title}</span>
                          </div>
                          <span className="text-sm text-white/60">Click to expand the full list</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        {isOpen && (
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {section.entries.map((entry, entryIndex) => (
                                <li
                                  key={`${accordionId}-${entryIndex}`}
                                  className="text-sm text-white/80 flex items-center gap-2"
                                >
                                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                  {entry}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChannelsList;
