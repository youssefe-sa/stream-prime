import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { tutorials } from "@/data/tutorials";

export const Tutorials = () => {
  const [openTutorial, setOpenTutorial] = useState<string | null>("firestick");

  return (
    <section id="tutorials" className="py-24 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Easy Setup
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Installation Guides
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step tutorials for all popular devices. Get streaming in minutes.
          </p>
        </div>

        {/* Tutorials Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {tutorials.map((tutorial) => {
            const isOpen = openTutorial === tutorial.id;
            return (
              <div
                key={tutorial.id}
                className={`glass-card overflow-hidden transition-all ${
                  isOpen ? "border-primary/30" : ""
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setOpenTutorial(isOpen ? null : tutorial.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{tutorial.icon}</span>
                    <span className="text-lg font-semibold text-foreground">
                      {tutorial.device}
                    </span>
                  </div>
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? "bg-primary/20" : "bg-card"}`}>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Content */}
                {isOpen && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="border-t border-border pt-5">
                      <ol className="space-y-4">
                        {tutorial.steps.map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-muted-foreground pt-1">{step}</p>
                          </li>
                        ))}
                      </ol>
                      
                      <div className="mt-6 p-4 rounded-lg bg-card border border-border">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Pro tip:</span> Keep your credentials from the welcome email handy during setup. If you need help, our 24/7 support team is available via chat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supported Devices Grid */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">All Supported Devices</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Android TV", "FireStick", "Fire TV", "Roku", "Apple TV",
              "Samsung Smart TV", "LG Smart TV", "MAG", "Formuler",
              "iPhone", "iPad", "Android", "Kodi", "VLC", "Perfect Player"
            ].map((device) => (
              <span
                key={device}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
              >
                {device}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
