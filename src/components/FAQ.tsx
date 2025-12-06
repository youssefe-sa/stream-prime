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
            className="btn-primary px-8 py-3 inline-flex items-center"
          >
            Contact Support on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
