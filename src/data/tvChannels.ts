export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  country: string;
  isHD?: boolean;
  isLive?: boolean;
}

export const tvChannels: Channel[] = [
  // Chaînes françaises
  {
    id: 'tf1',
    name: 'TF1',
    logo: 'https://logo.clearbit.com/tf1.fr',
    category: 'Généraliste',
    country: 'France',
    isHD: true
  },
  {
    id: 'france-2',
    name: 'France 2',
    logo: 'https://logo.clearbit.com/france.tv',
    category: 'Généraliste',
    country: 'France'
  },
  {
    id: 'france-3',
    name: 'France 3',
    logo: 'https://logo.clearbit.com/france.tv',
    category: 'Généraliste',
    country: 'France'
  },
  {
    id: 'canal-plus',
    name: 'Canal+',
    logo: 'https://logo.clearbit.com/canalplus.com',
    category: 'Cinéma/Séries',
    country: 'France',
    isHD: true
  },
  {
    id: 'm6',
    name: 'M6',
    logo: 'https://logo.clearbit.com/6play.fr',
    category: 'Généraliste',
    country: 'France'
  },

  // Chaînes sportives
  {
    id: 'rmc-sport',
    name: 'RMC Sport',
    logo: 'https://logo.clearbit.com/rmcsport.bfmtv.com',
    category: 'Sport',
    country: 'France',
    isHD: true
  },
  {
    id: 'eurosport',
    name: 'Eurosport',
    logo: 'https://logo.clearbit.com/eurosport.com',
    category: 'Sport',
    country: 'International',
    isHD: true
  },

  // Chaînes d'information
  {
    id: 'bfm-tv',
    name: 'BFM TV',
    logo: 'https://logo.clearbit.com/bfmtv.com',
    category: 'Info',
    country: 'France',
    isLive: true
  },
  {
    id: 'cnn',
    name: 'CNN',
    logo: 'https://logo.clearbit.com/cnn.com',
    category: 'Info',
    country: 'International',
    isHD: true
  },

  // Chaînes cinéma
  {
    id: 'canal-cinema',
    name: 'Canal+ Cinéma',
    logo: 'https://logo.clearbit.com/canalplus.com',
    category: 'Cinéma',
    country: 'France',
    isHD: true
  },
  {
    id: 'ocs',
    name: 'OCS',
    logo: 'https://logo.clearbit.com/ocs.fr',
    category: 'Cinéma/Séries',
    country: 'France'
  },

  // Chaînes jeunesse
  {
    id: 'canal-j',
    name: 'Canal J',
    logo: 'https://logo.clearbit.com/canalj.net',
    category: 'Jeunesse',
    country: 'France'
  },
  {
    id: 'disney-channel',
    name: 'Disney Channel',
    logo: 'https://logo.clearbit.com/disney.fr',
    category: 'Jeunesse',
    country: 'International'
  }
];

export const categories = [
  'Toutes',
  'Généraliste',
  'Cinéma/Séries',
  'Sport',
  'Info',
  'Jeunesse'
];

export const countries = [
  'Tous',
  'France',
  'International'
];
