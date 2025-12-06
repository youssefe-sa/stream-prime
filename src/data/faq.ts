export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What is IPTV and how does it work?",
    answer: "IPTV (Internet Protocol Television) delivers TV content over the internet instead of traditional cable or satellite. You simply need an internet connection and a compatible device to stream thousands of live channels and on-demand content.",
    category: "General",
  },
  {
    id: "2",
    question: "What devices are compatible with your service?",
    answer: "Our service works on virtually any device: Smart TVs (Samsung, LG, Android TV), streaming devices (FireStick, Fire TV, Roku, Apple TV), set-top boxes (MAG, Formuler), computers, smartphones, and tablets. We support apps like IPTV Smarters, TiviMate, and Perfect Player.",
    category: "Devices",
  },
  {
    id: "3",
    question: "How many channels do you offer?",
    answer: "We offer over 18,000+ live channels from 100+ countries worldwide, including sports, news, movies, entertainment, kids programming, and more. Plus access to 50,000+ movies and TV series on-demand.",
    category: "Content",
  },
  {
    id: "4",
    question: "What internet speed do I need?",
    answer: "For SD quality: 3-5 Mbps, HD quality: 10-15 Mbps, Full HD: 15-25 Mbps, 4K content: 25+ Mbps. We recommend a stable connection of at least 15 Mbps for the best experience.",
    category: "Technical",
  },
  {
    id: "5",
    question: "Can I use the service on multiple devices?",
    answer: "Yes! We offer multi-device plans supporting 1-5 simultaneous connections. Each device can stream different content at the same time. Choose the plan that fits your household needs.",
    category: "Plans",
  },
  {
    id: "6",
    question: "Do you offer a free trial?",
    answer: "We offer a 24-hour trial for just $2. This lets you test our full channel lineup, streaming quality, and app compatibility before committing to a longer subscription.",
    category: "Plans",
  },
  {
    id: "7",
    question: "How quickly will I receive my login credentials?",
    answer: "Your login credentials are delivered instantly to your email after successful payment. Check your spam folder if you don't see it within 5 minutes. Contact support if you need assistance.",
    category: "Billing",
  },
  {
    id: "8",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and cryptocurrency through our secure payment partner Whop. All transactions are encrypted and secure.",
    category: "Billing",
  },
  {
    id: "9",
    question: "Is there an EPG (Electronic Program Guide)?",
    answer: "Yes, we provide a comprehensive EPG for most channels. The TV guide shows current and upcoming programs, making it easy to plan your viewing and set reminders.",
    category: "Features",
  },
  {
    id: "10",
    question: "Do you offer VOD (Video on Demand)?",
    answer: "Absolutely! Our subscription includes access to our extensive VOD library with 50,000+ movies and TV series, updated regularly with the latest releases.",
    category: "Content",
  },
  {
    id: "11",
    question: "What is your uptime guarantee?",
    answer: "We maintain 99.9% uptime with redundant servers across multiple locations. Our technical team monitors streams 24/7 to ensure minimal interruptions.",
    category: "Technical",
  },
  {
    id: "12",
    question: "Can I get a refund?",
    answer: "Due to the digital nature of our service, we don't offer refunds after activation. We encourage using our $2 trial to test compatibility before purchasing a longer plan.",
    category: "Billing",
  },
  {
    id: "13",
    question: "How do I set up the service on my FireStick?",
    answer: "Enable 'Apps from Unknown Sources' in settings, install the Downloader app, download IPTV Smarters Pro, then enter your credentials. Full step-by-step guide available in our Tutorials section.",
    category: "Setup",
  },
  {
    id: "14",
    question: "Do you support catch-up/timeshift?",
    answer: "Yes, many channels support catch-up functionality allowing you to watch content from the past 24-72 hours. Availability varies by channel and region.",
    category: "Features",
  },
  {
    id: "15",
    question: "How do I contact customer support?",
    answer: "Use our live chat widget on this page, email us at support@example.com, or reach out via WhatsApp. Our support team is available 24/7 to assist you.",
    category: "Support",
  },
];

export const faqCategories = [...new Set(faqItems.map((item) => item.category))];

export const searchFAQ = (query: string): FAQItem[] => {
  const lowerQuery = query.toLowerCase();
  return faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery)
  );
};
