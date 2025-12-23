import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { faqItems, faqCategories, searchFAQ } from "@/data/faq";

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>("1");

  const filteredFAQ = useMemo(() => {
    let items = faqItems;
    
    if (searchQuery) {
      items = searchFAQ(searchQuery);
    } else if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory);
    }
    
    return items;
  }, [searchQuery, selectedCategory]);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-card/30 to-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our IPTV service.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="max-w-3xl mx-auto mb-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory && !searchQuery
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              All
            </button>
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item) => {
              const isOpen = openItem === item.id;
              return (
                <div
                  key={item.id}
                  className={`glass-card overflow-hidden transition-all ${
                    isOpen ? "border-primary/30" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenItem(isOpen ? null : item.id)}
                    className="w-full flex items-start justify-between p-5 text-left gap-4"
                  >
                    <div className="flex-1">
                      <span className="text-xs font-medium text-primary mb-1 block">
                        {item.category}
                      </span>
                      <span className="text-base font-medium text-foreground">
                        {item.question}
                      </span>
                    </div>
                    <div className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${isOpen ? "bg-primary/20" : "bg-card"}`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? Our support team is here to help 24/7.
          </p>
          <a 
            href="https://wa.me/12106343468?text=Hello%20StreamMax%20Support%2C%20I%20need%20help%20with%3A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3 inline-flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.174.196-.347.223-.644.075-.297-.15-1.264-.465-2.4-1.485-.888-.795-1.484-1.76-1.66-2.055-.173-.297-.018-.458.13-.605.136-.135.296-.354.445-.531.15-.172.2-.297.3-.495.1-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.869.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.55 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.467h.006c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.26-6.19-3.548-8.464"/>
            </svg>
            Contact Support on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
