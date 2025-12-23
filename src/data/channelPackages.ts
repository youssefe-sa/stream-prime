export interface ChannelPackage {
  id: string;
  title: string;
  country: string;
  category: string;
  channelCount: number;
  quality: "SD" | "HD" | "4K";
  tags: string[];
  accent: string;
}

export const channelPackages: ChannelPackage[] = [
  {
    id: "ar-bein-hd",
    title: "AR | beIN SPORTS ✦ HD",
    country: "Arabic",
    category: "Sports",
    channelCount: 20,
    quality: "HD",
    tags: ["Sports", "Premium", "Football"],
    accent: "from-cyan-400 to-blue-500"
  },
  {
    id: "ar-bein-sd",
    title: "AR | beIN SPORTS ✦ SD",
    country: "Arabic",
    category: "Sports",
    channelCount: 17,
    quality: "SD",
    tags: ["Sports", "Economy"],
    accent: "from-blue-500 to-indigo-500"
  },
  {
    id: "ar-bein-vod",
    title: "AR | beIN SPORTS ✦ VOD",
    country: "Arabic",
    category: "Sports",
    channelCount: 15,
    quality: "HD",
    tags: ["Replay", "On demand"],
    accent: "from-indigo-500 to-purple-500"
  },
  {
    id: "ar-bein-raw",
    title: "AR | beIN SPORTS ✦ RAW",
    country: "Arabic",
    category: "Sports",
    channelCount: 26,
    quality: "4K",
    tags: ["Ultra HD", "Premium"],
    accent: "from-purple-500 to-pink-500"
  },
  {
    id: "us-sports",
    title: "US | Ultimate Sports Pack",
    country: "United States",
    category: "Sports",
    channelCount: 32,
    quality: "HD",
    tags: ["ESPN", "NFL", "NBA"],
    accent: "from-emerald-400 to-teal-500"
  },
  {
    id: "uk-sky",
    title: "UK | Sky Complete",
    country: "United Kingdom",
    category: "Entertainment",
    channelCount: 40,
    quality: "HD",
    tags: ["Sky", "Movies", "Series"],
    accent: "from-blue-400 to-sky-500"
  },
  {
    id: "fr-premium",
    title: "FR | Premium Pack",
    country: "France",
    category: "Entertainment",
    channelCount: 28,
    quality: "HD",
    tags: ["TF1", "Canal+", "OCS"],
    accent: "from-rose-400 to-red-500"
  },
  {
    id: "es-futbol",
    title: "ES | Fútbol Total",
    country: "Spain",
    category: "Sports",
    channelCount: 22,
    quality: "HD",
    tags: ["LaLiga", "Copa del Rey"],
    accent: "from-orange-400 to-amber-500"
  },
  {
    id: "ca-ultimate",
    title: "CA | Ultimate Mix",
    country: "Canada",
    category: "Mixed",
    channelCount: 30,
    quality: "HD",
    tags: ["Sports", "News", "Series"],
    accent: "from-teal-400 to-cyan-500"
  },
  {
    id: "4k-international",
    title: "Global | 4K Showcase",
    country: "International",
    category: "4K",
    channelCount: 18,
    quality: "4K",
    tags: ["Ultra HD", "Premium"],
    accent: "from-yellow-400 to-orange-500"
  }
];

export const channelFilterTabs = [
  "All",
  "United States",
  "United Kingdom",
  "4K",
  "Canada",
  "Spain",
  "France",
  "Arabic"
];

export const moreChannelCountries = [
  "Germany",
  "Italy",
  "Portugal",
  "Brazil",
  "Netherlands",
  "Poland",
  "Turkey",
  "Greece"
];
