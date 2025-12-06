import { Check, Smartphone, Tv, Monitor, Tablet, Gamepad2 } from "lucide-react";
import deviceSmartTv from "@/assets/device-smarttv.jpg";
import deviceFirestick from "@/assets/device-firestick.jpg";
import deviceMobile from "@/assets/device-mobile.jpg";
import deviceLaptop from "@/assets/device-laptop.jpg";

const deviceCategories = [
  {
    id: "smarttv",
    title: "Smart TVs",
    image: deviceSmartTv,
    devices: ["Samsung Smart TV", "LG webOS", "Android TV", "Google TV", "Roku TV"],
    icon: Tv,
  },
  {
    id: "streaming",
    title: "Streaming Devices",
    image: deviceFirestick,
    devices: ["Amazon FireStick", "Fire TV Cube", "Roku", "Apple TV", "Chromecast"],
    icon: Gamepad2,
  },
  {
    id: "mobile",
    title: "Mobile Devices",
    image: deviceMobile,
    devices: ["iPhone", "iPad", "Android Phone", "Android Tablet"],
    icon: Smartphone,
  },
  {
    id: "computer",
    title: "Computers",
    image: deviceLaptop,
    devices: ["Windows PC", "MacOS", "Linux", "Chromebook"],
    icon: Monitor,
  },
];

const allDevices = [
  "Android TV",
  "Amazon FireStick",
  "Fire TV Cube",
  "Roku",
  "Apple TV",
  "Samsung Smart TV",
  "LG Smart TV",
  "MAG 254/256",
  "MAG 322/324",
  "Formuler Z8/Z10",
  "Dreamlink T2",
  "BuzzTV",
  "iPhone",
  "iPad",
  "Android Phone",
  "Android Tablet",
  "Windows PC",
  "MacOS",
  "Kodi",
  "VLC Player",
  "IPTV Smarters",
  "TiviMate",
  "Perfect Player",
  "GSE Smart IPTV",
];

export const Devices = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Universal Compatibility
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Watch On Any Device
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stream seamlessly across all your favorite devices. One subscription, unlimited access.
          </p>
        </div>

        {/* Device Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {deviceCategories.map((category) => (
            <div
              key={category.id}
              className="group glass-card overflow-hidden hover:border-primary/30 transition-all"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Device List */}
              <div className="p-4">
                <ul className="space-y-2">
                  {category.devices.map((device, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {device}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* All Supported Devices */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            All Supported Apps & Devices
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allDevices.map((device) => (
              <span
                key={device}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-default"
              >
                {device}
              </span>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Not sure if your device is supported?
            </p>
            <a href="/install" className="text-primary font-medium hover:underline">
              Check our setup guides →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
