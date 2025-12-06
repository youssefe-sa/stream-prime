// List of countries with their channels
export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  isHD?: boolean;
  isLive?: boolean;
}

export interface CountryChannels {
  country: string;
  code: string; // ISO country code or custom code
  channels: Channel[];
}

// Helper function to create channel objects from a list of channel names
const createChannels = (countryCode: string, channelNames: string[], category: string = 'General'): Channel[] => {
  return channelNames.map((name, index) => ({
    id: `${countryCode.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: name.trim(),
    logo: `/flags/${countryCode.toLowerCase()}.png`,
    category,
    isHD: /(UHD|FHD|HD|4K)/i.test(name),
    isLive: /(LIVE|DIRECT)/i.test(name)
  }));
};

// Helper function to generate sample channels for each country
const generateChannels = (countryCode: string, count: number = 10): Channel[] => {
  const categories = [
    'General', 'News', 'Sports', 'Entertainment', 'Movies', 'Music', 'Kids', 'Documentary',
    'Lifestyle', 'Fashion', 'Technology', 'Business', 'Education', 'Gaming', 'Travel', 'Food',
    'Comedy', 'Drama', 'Reality', 'Science', 'History', 'Nature', 'Crime', 'Health',
    'Fitness', 'Religion', 'Shopping', 'Local', 'Regional', 'International', 'Culture', 'Art'
  ];
  
  // Common channel suffixes for more realistic names
  const suffixes = [
    'TV', 'Channel', 'Network', 'Plus', 'HD', 'Live', '1', '2', '3', '4', '5',
    'News', 'Entertainment', 'Cinema', 'Sports', 'Music', 'Kids', 'Drama', 'Life', 'World'
  ];
  const channels = [];
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const isHD = Math.random() > 0.5;
    const isLive = Math.random() > 0.7;
    
    // Generate more realistic channel names
    const channelName = (() => {
      const prefix = countryCode.toUpperCase();
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const nameType = Math.random();
      
      if (nameType < 0.3) return `${prefix} ${suffix}`;
      if (nameType < 0.6) return `${prefix} ${suffix} ${Math.ceil(Math.random() * 5)}`;
      if (nameType < 0.8) return `${prefix} ${category} ${suffix}`;
      return `${prefix} ${suffix} ${category}`;
    })();
    
    channels.push({
      id: `${countryCode.toLowerCase()}-channel-${i}`,
      name: channelName,
      logo: `/flags/${countryCode.toLowerCase()}.png`,
      category,
      isHD: Math.random() > 0.4, // 60% chance of being HD
      isLive: Math.random() > 0.7 // 30% chance of being live
    });
  }
  
  return channels;
};

// Helper function to combine UK channels
const combineUKChannels = () => {
  const ukChannels = [
    ...generateChannels('gb-sports', 12),
    ...generateChannels('gb-world-sports', 10),
    ...generateChannels('gb-epl', 8),
    ...generateChannels('gb-efl', 8),
    ...generateChannels('gb-national', 6),
    ...generateChannels('gb-scottish', 6),
    ...generateChannels('gb-viplay', 5),
    ...generateChannels('gb-prime', 5),
    ...generateChannels('gb-general', 10),
    ...generateChannels('gb-news', 8),
    ...generateChannels('gb-movies', 8),
    ...generateChannels('gb-entertainment', 8),
    ...generateChannels('gb-kids', 6),
    ...generateChannels('gb-documentary', 6),
    ...generateChannels('gb-discovery', 5),
    ...generateChannels('gb-music', 5),
    ...generateChannels('gb-ppv', 4),
    ...generateChannels('gb-flex', 4)
  ];
  
  // Remove duplicates by ID
  const uniqueChannels = [];
  const channelIds = new Set();
  
  for (const channel of ukChannels) {
    if (!channelIds.has(channel.id)) {
      channelIds.add(channel.id);
      uniqueChannels.push(channel);
    }
  }
  
  return uniqueChannels;
};

// Helper function to get unique countries
const getUniqueCountries = (): CountryChannels[] => {
  const countries: CountryChannels[] = [];
  const countryCodes = new Set<string>();
  
  // Define the base list of countries with their order
  const baseCountries: CountryChannels[] = [
    // Europe
    { 
      country: "FRANCE", 
      code: "fr", 
      channels: [
        // General HD
        ...createChannels('fr', [
          'TF1 FHD', 'FRANCE 2 FHD', 'FRANCE 3 FHD', 'FRANCE 3 NOA FHD', 'FRANCE 4 FHD',
          'FRANCE 5 FHD', 'FRANCE Ô FHD', 'ARTE FHD', 'M6 FHD', '6TER FHD', 'C8 FHD',
          'W9 FHD', 'RTS UN FHD', 'RTS DEUX FHD', 'AB1 FHD', 'AB3 FHD', 'TV BREIZH FHD',
          'TV5 MONDE FHD', '13EME RUE FHD', 'TFX FHD', 'TF1 SERIES-FILMS FHD', 'LFM TV FHD',
          'TVM3 FHD', 'BET FHD', 'C STAR FHD', 'CANAL 31 FHD', 'CLIQUE TV FHD', 'COMEDIE FHD',
          'GAME ONE 1 FHD', 'GAME ONE FHD', 'IDF 1 FHD', 'J ONE FHD', 'MY CUISINE FHD',
          'NOVELAS TV FHD', 'PARIS PREMIERE FHD', 'RTL 9 FHD', 'TEVA FHD', 'CHERIE 25 FHD'
        ], 'General HD'),
        
        // Entertainment HD
        ...createChannels('fr', [
          'M6 MUSIC FHD', 'TRACE URBAN FHD', 'MCM FHD', 'MCM TOP FHD', 'MELODY FHD',
          'NRJ HITS FHD', 'RFM TV FHD', 'MTV FHD', 'MTV LIVE FHD', 'NRJ 12 FHD',
          'C STAR HIT FHD', 'C STAR HITS FRANCE FHD', 'DJAZZ FHD', 'USHUAIA FHD',
          'VICELAND FHD', 'ANIMAUX FHD', 'DISCOVERY ID FHD', 'DISCOVERY FHD',
          'DISCOVERY FAMILY FHD', 'DISCOVERY INVESTIGATION FHD', 'DISCOVERY SCIENCE FHD',
          'CRIME DISTRICT FHD', 'HISTOIRE FHD', 'NAT GEO WILD FHD', 'NATIONAL GEO FHD',
          'CHASSE&PECHE FHD', 'PLANETE A&E FHD', 'PLANETE CI FHD', 'PLANETE FHD',
          'RMC DECOUVERTE FHD', 'RMC STORY FHD', 'E! ENTERTAINMENT FHD',
          'SCIENCE&VIE FHD', 'SEASONS FHD', 'MUSEUM FHD', 'TOUTE L', 'VOYAGE FHD'
        ], 'Entertainment HD'),
        
        // News HD
        ...createChannels('fr', [
          'FRANCE 24 FHD', 'FRANCE INFO FHD', 'NON STOP PEOPLE FHD',
          'LA CHAINE METEO FHD', 'EURONEWS FRENCH FHD', 'C NEWS FHD',
          'I24 NEWS FHD', 'LCI FHD', 'LCP FHD', 'CANAL NEWS FHD',
          'BFM TV FHD', 'RT France', 'BFM PARIS FHD', 'BFM BUSINESS FHD'
        ], 'News HD'),
        
        // Kids HD
        ...createChannels('fr', [
          'NICKELODEON FHD', 'Disney+ FHD', 'DISNEY CHANNEL FHD',
          'DISNEY JUNIOR FHD', 'C DISNEY CHANNEL 1 FHD', 'CANAL J FHD',
          'PIWI + FHD', 'BABY TV FHD', 'GULLI FHD', 'MANGAS FHD',
          'TIJI FHD', 'TELE TOON FHD', 'TELE TOON +1 FHD',
          'BOOMERANG FHD', 'BOING FHD', 'CARTOON NETWORK FHD',
          'NICKELODEON 4 TEEN FHD', 'NICKELODEON JUNIOR FHD', 'TOONAMI FHD'
        ], 'Kids HD'),
        
        // Cinema HD
        ...createChannels('fr', [
          'CANAL + FHD', 'CANAL CINEMA FHD', 'CANAL DECALE FHD',
          'CANAL FAMILY FHD', 'CANAL SERIES FHD', 'CINE CLASSIC FHD',
          'CINE CLUB FHD', 'CINE EMOTION FHD', 'CINE FAMIZ FHD',
          'CINE FRISSON FHD', 'CINE PREMIER FHD', 'CANALPLAY 1 FHD',
          'CANALPLAY 2 FHD', 'CANALPLAY 3 FHD', 'CANALPLAY 4 FHD',
          'CANALPLAY 5 FHD', 'ORANGE CINEMA 1 FHD', 'ORANGE CINEMA 2 FHD',
          'ORANGE CINEMA 3 FHD', 'ORANGE CINEMA 4 FHD', 'ORANGE CINEMA 5 FHD',
          'ORANGE CINEMA AVENTURE FHD', 'A LA CARTE 1 FHD', 'A LA CARTE 2 FHD',
          'A LA CARTE 3 FHD', 'A LA CARTE 4 FHD', 'A LA CARTE 5 FHD',
          'A LA CARTE 6 FHD', 'A LA CARTE 7 FHD', 'OCS GO CINEMA 1 FHD',
          'OCS GO CINEMA 2 FHD', 'OCS GO CINEMA 3 FHD', 'OCS GO CINEMA 4 FHD',
          'OCS GO CINEMA 5 FHD', 'OCS CITY FHD', 'OCS GEANTS FHD',
          'OCS MAX FHD', 'OCS CHOC FHD', 'ACTION FHD', 'ALTICE STUDIO FHD',
          'COMEDY CENTRAL FHD', 'SYFY FHD', 'TCM CINEMA FHD',
          'WARNER TV FHD', 'TMC FHD', 'POLAR FHD', 'PARAMOUNT CHANNEL FHD',
          'PARAMOUNT DECALE FHD', 'SERIE CLUB FHD'
        ], 'Cinema HD'),
        
        // Sports HD
        ...createChannels('fr', [
          'TELEFOOT FHD', 'TELEFOOT FHD [Backup]', 'TELEFOOT STADIUM 1 FHD',
          'TELEFOOT STADIUM 2 FHD', 'TELEFOOT STADIUM 3 FHD', 'TELEFOOT STADIUM 4 FHD',
          'TELEFOOT STADIUM 5 FHD', 'TELEFOOT STADIUM 6 FHD', 'TELEFOOT STADIUM 7 FHD',
          'TELEFOOT STADIUM 8 FHD', 'TELEFOOT 4k HDR [TEST Only]', 'RMC SPORT UHD',
          'RMC SPORT 1 FHD', 'RMC SPORT 1 FHD [Backup]', 'RMC SPORT 2 FHD',
          'RMC SPORT 3 FHD', 'RMC SPORT 4 FHD', 'RMC SPORT 5 FHD', 'RMC SPORT 6 FHD',
          'RMC SPORT 7 FHD', 'RMC SPORT 8 FHD', 'RMC SPORT 9 FHD', 'RMC SPORT 10 FHD',
          'RMC SPORT 11 FHD', 'RMC SPORT 12 FHD', 'RMC SPORT 13 FHD', 'RMC SPORT 14 FHD',
          'RMC SPORT 15 FHD', 'RMC SPORT NEWS FHD', 'BEIN SPORTS 1 FHD',
          'BEIN SPORTS 2 FHD', 'BEIN SPORTS 3 FHD', 'BEIN SPORTS MAX 4 FHD',
          'BEIN SPORTS MAX 5 FHD', 'BEIN SPORT MAX 6 FHD', 'BEIN SPORTS MAX 7 FHD',
          'BEIN SPORTS MAX 8 FHD', 'BEIN SPORTS MAX 9 FHD', 'EUROSPORT 1 FHD',
          'EUROSPORT 2 FHD', 'MULTI SPORTS 1 FHD', 'MULTI SPORTS 2 FHD',
          'MULTI SPORTS 3 FHD', 'MULTI SPORTS 4 FHD', 'MULTI SPORTS 5 FHD',
          'MULTI SPORTS 6 FHD', 'NEUTRAL FHD', 'TELECLUB ZOOM FHD',
          'CANAL SPORT FHD', 'OL TV FHD', 'EQUIDIA FHD', 'Equipe 21 FHD',
          'INFO SPORT FHD', 'EXTREME SPORTS FHD', 'MOTORSPORT TV FHD',
          'AUTO MOTO FHD', 'FOOT 24/24 FHD', 'GOLF+ FHD', 'OLYMPIA FHD'
        ], 'Sports HD')
      ]
    },
    
    { 
      country: "GERMANY", 
      code: "de", 
      channels: [
        // FTA
        ...createChannels('de', [
          'DAS ERSTE HD (ARD)', 'DAS ERSTE (ARD)', 'ARTE HD', '3 SAT', 'ZDF HD',
          'ZDF NEO', 'RTL', 'RTLII HD', 'RTL TELEVISION', 'RTL2', 'RTL PLUS',
          'RTL NITRO', 'SIXX HD', 'PROSIEBEN HD', 'SAT 1 HD', 'SAT 1 GOLD HD',
          'VOX HD', 'VOX', 'PHOENIX HD', 'KABEL EINS HD', 'KABEL 1 CLASSICS HD',
          'TELE 5 HD', 'ANIXE HD', 'DMAX HD', 'ZDF INFO HD'
        ], 'Free-to-Air'),
        
        // Sports
        ...createChannels('de', [
          'SKY SPORT NEWS HD', 'SKY SPORT 1', 'SKY SPORT 1 HD', 'SKY SPORT 2',
          'SKY SPORT 2 HD', 'SKY SPORT 3 HD', 'SKY SPORT 4 HD', 'SKY SPORT 5 HD',
          'SKY SPORT 6 HD', 'SKY SPORT 7 HD', 'SKY SPORT 8 HD', 'SKY SPORT 9 HD',
          'SKY SPORT 10 HD', 'SKY SPORT 11 HD', 'SKY BUNDESLIGA 1 HD',
          'SKY BUNDESLIGA 2 HD (ON MATCH TIME)', 'SKY BUNDESLIGA 3 HD (ON MATCH TIME)',
          'SKY BUNDESLIGA 4 HD (ON MATCH TIME)', 'SKY BUNDESLIGA 5 HD (ON MATCH TIME)',
          'SKY BUNDESLIGA 6 HD (ON MATCH TIME)', 'SKY BUNDESLIGA 7 HD (ON MATCH TIME)',
          'SKY BUNDESLIGA 8 HD (ON MATCH TIME)', 'SKY BUNDESLIGA 9 HD (ON MATCH TIME)',
          'SKY BUNDESLIGA 10 HD (ON MATCH TIME)', 'EUROSPORT 1 HD',
          'EUROSPORT 2 XTRA HD', 'EUROSPORT 2 HD', 'MOTORVISION', 'SPORT 1 HD'
        ], 'Sports'),
        
        // Music
        ...createChannels('de', [
          'JUKEBOX', 'CLASSICA', 'MTV HD', 'DELUXE MUSIC HD', 'VH1'
        ], 'Music'),
        
        // Documentaries
        ...createChannels('de', [
          'DISCOVERY HD', 'E! ENTERTAINMENT HD', 'HISTORY CHANNEL',
          'HISTORY HD', 'NGC', 'NGC HD', 'NGC WILD HD', 'NGC WILD', 'TLC HD',
          'RTL LIVING', 'SPIEGEL GESCHICHTE'
        ], 'Documentaries'),
        
        // Other
        ...createChannels('de', [
          '123TV HD', 'HSE 24 EXTRA HD', 'HSE 24 HD', 'JUWELO HD', 'MDR S-ANHALT HD',
          'MDR CRINGEN HD', 'MDR SACHSEN HD', 'NDR FS HH HD', 'NDR FS MV HD',
          'NDR FS NDS HD', 'NDR FS SH HD', 'NITRO', 'PEARL TV HD', 'QVC HD',
          'QVC2 HD', 'RBB BERLIN HD', 'RBB BRANDEN BURG', 'SONNENKLAR HD',
          'SWR FERNSEHEN BW', 'WDR AACHEN HD', 'WDR BONN HD', 'WDR DUISBURG HD',
          'WDR WUPPERTAL HD'
        ], 'Other'),
        
        // Kids
        ...createChannels('de', [
          'BOOMERANG', 'SUPER RTL', 'CARTOON NETWORK', 'DISNEY CHANNEL HD',
          'KIKA', 'DISNEY CINEMAGIC', 'DISNEY JUNIOR HD', 'VIVA/COMEDY CENTRAL',
          'NICK /MTV'
        ], 'Kids'),
        
        // News
        ...createChannels('de', [
          'N TV', 'EURONEWS', 'N24', 'WELT HD'
        ], 'News'),
        
        // Entertainment
        ...createChannels('de', [
          'SYFY HD', 'TNT SERIE HD', '13TH STREET', '13TH STREET HD', 'FOX HD',
          'HEIMAT KANAL', 'KINOWELT TV', 'RTL CRIME HD', 'RTL PASSION HD',
          'ROMANCE TV', 'ZEE ONE', 'ZEE ONE HD'
        ], 'Entertainment'),
        
        // Cinema
        ...createChannels('de', [
          'SKY 1 HD', 'SKY ATLANTIC HD', 'SKY ATLANTIC', 'SKY CINEMA 1 HD [HEVC]',
          'SKY CINEMA 24 HD', 'SKY CINEMA ACTION HD', 'SKY CINEMA FUN',
          'SKY CINEMA EMOTION', 'SKY CINEMA FAMILY HD', 'SKY CINEMA HD',
          'SKY CINEMA HITS HD', 'SKY CINEMA NOSTALGIE', 'SKY KRIMI',
          'SKY ONE HD', 'TNT COMEDY HD', 'TNT FILM', 'SKY CINEMA PREMIEREN +24 HD',
          'SKY CINEMA CLASSIC'
        ], 'Cinema'),
        
        // Sky Select
        ...createChannels('de', [
          'SKY SELECT 1 HD', 'SKY SELECT 2 HD', 'SKY SELECT 3 HD',
          'SKY SELECT 4 HD', 'SKY SELECT 5 HD', 'SKY SELECT 6 HD',
          'SKY SELECT 7 HD', 'SKY SELECT 8 HD', 'SKY SELECT 9 HD'
        ], 'Sky Select')
      ]
    },
    
    // Europe - Ireland
    { 
      country: "IRELAND", 
      code: "ie", 
      channels: [
        // General
        ...createChannels('ie', [
          'RTE ONE HD', 'RTE2 HD', 'RTE JUNIOR', 'RTE NEWS NOW', 'RTE ONE +1',
          'RTE2 +1', 'VIRGIN MEDIA ONE', 'VIRGIN MEDIA TWO', 'VIRGIN MEDIA THREE',
          'VIRGIN MEDIA ONE +1', 'TG4 HD', 'TG4 +1', 'OIREACHTAS TV', 'CULA4'
        ], 'General'),
        
        // Entertainment
        ...createChannels('ie', [
          'VIRGIN MEDIA MORE', 'VIRGIN MEDIA FOUR', 'EIR SPORT 1 HD',
          'EIR SPORT 2 HD', 'EIR SPORT 1', 'EIR SPORT 2', 'EIR SPORT 1 +1',
          'EIR SPORT 2 +1', 'EIR SPORT 1 HD +1', 'EIR SPORT 2 HD +1',
          'EIR SPORT 1 HD +2', 'EIR SPORT 2 HD +2', 'EIR SPORT 1 HD +3',
          'EIR SPORT 2 HD +3', 'EIR SPORT 1 HD +4', 'EIR SPORT 2 HD +4',
          'EIR SPORT 1 HD +5', 'EIR SPORT 2 HD +5', 'EIR SPORT 1 HD +6',
          'EIR SPORT 2 HD +6', 'EIR SPORT 1 HD +7', 'EIR SPORT 2 HD +7',
          'EIR SPORT 1 HD +8', 'EIR SPORT 2 HD +8', 'EIR SPORT 1 HD +9',
          'EIR SPORT 2 HD +9', 'EIR SPORT 1 HD +10', 'EIR SPORT 2 HD +10'
        ], 'Entertainment'),
        
        // News
        ...createChannels('ie', [
          'SKY NEWS IRELAND', 'BBC NEWS', 'CNN', 'FRANCE 24', 'AL JAZEERA',
          'RT NEWS', 'BLOOMBERG', 'CNBC', 'EURONEWS', 'FRANCE 24 ENGLISH',
          'GERMANY DW', 'RTE NEWS NOW', 'IRISH TV', 'IRELAND AM', 'BREAKING NEWS',
          'NEWSTALK', 'TALK RADIO', 'TODAY FM', 'NEWSTALK 106-108', 'NEWSTALK 106-108 FM'
        ], 'News'),
        
        // Kids
        ...createChannels('ie', [
          'CARTOON NETWORK', 'BOOMERANG', 'NICKELODEON', 'NICK JR', 'CARTOONITO',
          'DISNEY CHANNEL', 'DISNEY JUNIOR', 'DISNEY XD', 'BABY TV', 'POP',
          'TINY POP', 'POP MAX', 'TINY POP +1', 'POP +1', 'POP MAX +1',
          'TINY POP +2', 'POP +2', 'POP MAX +2', 'TINY POP +3', 'POP +3',
          'POP MAX +3', 'TINY POP +4', 'POP +4', 'POP MAX +4', 'TINY POP +5',
          'POP +5', 'POP MAX +5', 'TINY POP +6', 'POP +6', 'POP MAX +6'
        ], 'Kids')
      ]
    },
    
    // Europe - Spain
    { 
      country: "SPAIN", 
      code: "es", 
      channels: [
        // General
        ...createChannels('es', [
          'LA 1 HD', 'LA 2 HD', 'ANTENA 3 HD', 'CUATRO HD', 'TELECINCO HD',
          'LA SEXTA HD', 'LA 1 HD', 'LA 2 HD', 'ANTENA 3 HD', 'CUATRO HD',
          'TELECINCO HD', 'LA SEXTA HD', 'LA 1', 'LA 2', 'ANTENA 3',
          'CUATRO', 'TELECINCO', 'LA SEXTA', 'LA 1 +24', 'LA 2 +24',
          'ANTENA 3 +24', 'CUATRO +24', 'TELECINCO +24', 'LA SEXTA +24',
          'LA 1 +48', 'LA 2 +48', 'ANTENA 3 +48', 'CUATRO +48',
          'TELECINCO +48', 'LA SEXTA +48'
        ], 'General'),
        
        // Movies & Series
        ...createChannels('es', [
          'AXN HD', 'AXN WHITE HD', 'AXN NOW', 'AXN WHITE NOW', 'AXN +24',
          'AXN WHITE +24', 'AXN NOW +24', 'AXN WHITE NOW +24', 'AXN +48',
          'AXN WHITE +48', 'AXN NOW +48', 'AXN WHITE NOW +48', 'AXN +72',
          'AXN WHITE +72', 'AXN NOW +72', 'AXN WHITE NOW +72', 'AXN +96',
          'AXN WHITE +96', 'AXN NOW +96', 'AXN WHITE NOW +96', 'AXN +120',
          'AXN WHITE +120', 'AXN NOW +120', 'AXN WHITE NOW +120', 'AXN +144',
          'AXN WHITE +144', 'AXN NOW +144', 'AXN WHITE NOW +144', 'AXN +168',
          'AXN WHITE +168', 'AXN NOW +168', 'AXN WHITE NOW +168'
        ], 'Movies & Series'),
        
        // Sports
        ...createChannels('es', [
          'M. LALIGA HD', 'M. LALIGA 1 HD', 'M. LALIGA 2 HD', 'M. LALIGA 3 HD',
          'M. LALIGA 4 HD', 'M. LALIGA 5 HD', 'M. LALIGA 6 HD', 'M. LALIGA 7 HD',
          'M. LALIGA 8 HD', 'M. LALIGA 9 HD', 'M. LALIGA 10 HD', 'M. LALIGA 11 HD',
          'M. LALIGA 12 HD', 'M. LALIGA 13 HD', 'M. LALIGA 14 HD', 'M. LALIGA 15 HD',
          'M. LALIGA 16 HD', 'M. LALIGA 17 HD', 'M. LALIGA 18 HD', 'M. LALIGA 19 HD',
          'M. LALIGA 20 HD', 'M. LALIGA 21 HD', 'M. LALIGA 22 HD', 'M. LALIGA 23 HD',
          'M. LALIGA 24 HD', 'M. LALIGA 25 HD', 'M. LALIGA 26 HD', 'M. LALIGA 27 HD',
          'M. LALIGA 28 HD', 'M. LALIGA 29 HD', 'M. LALIGA 30 HD'
        ], 'Sports')
      ]
    },
    
    // Europe - Italy
    { 
      country: "ITALY", 
      code: "it", 
      channels: [
        // General
        ...createChannels('it', [
          'RAI 1 HD', 'RAI 2 HD', 'RAI 3 HD', 'RAI 4 HD', 'RAI 5 HD',
          'RAI GULP', 'RAI MOVIE', 'RAI PREMIUM', 'RAI SCUOLA', 'RAI STORIA',
          'RAI YOYO', 'RAI SPORT + HD', 'RAI SPORT', 'RAI NEWS 24', 'RAI MED',
          'RAI 1', 'RAI 2', 'RAI 3', 'RAI 4', 'RAI 5', 'RAI GAP', 'RAI ISC',
          'RAI LADINIA', 'RAI SUD TIR', 'RAI SUD TIR 2', 'RAI SUD TIR 3',
          'RAI SUD TIR 4', 'RAI SUD TIR 5', 'RAI SUD TIR 6', 'RAI SUD TIR 7',
          'RAI SUD TIR 8', 'RAI SUD TIR 9', 'RAI SUD TIR 10'
        ], 'General'),
        
        // Entertainment
        ...createChannels('it', [
          'CANALE 5 HD', 'ITALIA 1 HD', 'RETE 4 HD', 'LA 7 HD', 'LA 7D HD',
          'NOVE', '20', 'IRIS', 'TOP CRIME', 'GIALLO', 'DMAX', 'FOOD NETWORK',
          'FOCUS', 'MEDIASET EXTRA', 'ITALIA 2', 'LA 5', 'ITALIA 1 +1',
          'RETE 4 +1', 'CANALE 5 +1', 'LA 7 +1', 'LA 7D +1', 'NOVE +1',
          '20 +1', 'IRIS +1', 'TOP CRIME +1', 'GIALLO +1', 'DMAX +1',
          'FOOD NETWORK +1', 'FOCUS +1', 'MEDIASET EXTRA +1', 'ITALIA 2 +1',
          'LA 5 +1'
        ], 'Entertainment'),
        
        // Sports
        ...createChannels('it', [
          'SKY SPORT 24 HD', 'SKY SPORT FOOTBALL HD', 'SKY SPORT SERIE A HD',
          'SKY SPORT SERIE B HD', 'SKY SPORT CALCIO HD', 'SKY SPORT NBA HD',
          'SKY SPORT F1 HD', 'SKY SPORT MOTOGP HD', 'SKY SPORT MOTO2 HD',
          'SKY SPORT MOTO3 HD', 'SKY SPORT MOTO4 HD', 'SKY SPORT MOTO5 HD',
          'SKY SPORT MOTO6 HD', 'SKY SPORT MOTO7 HD', 'SKY SPORT MOTO8 HD',
          'SKY SPORT MOTO9 HD', 'SKY SPORT MOTO10 HD', 'SKY SPORT MOTO11 HD',
          'SKY SPORT MOTO12 HD', 'SKY SPORT MOTO13 HD', 'SKY SPORT MOTO14 HD',
          'SKY SPORT MOTO15 HD', 'SKY SPORT MOTO16 HD', 'SKY SPORT MOTO17 HD',
          'SKY SPORT MOTO18 HD', 'SKY SPORT MOTO19 HD', 'SKY SPORT MOTO20 HD',
          'SKY SPORT MOTO21 HD', 'SKY SPORT MOTO22 HD', 'SKY SPORT MOTO23 HD',
          'SKY SPORT MOTO24 HD', 'SKY SPORT MOTO25 HD'
        ], 'Sports')
      ]
    },
    
    // Europe - Netherlands
    { 
      country: "NETHERLANDS", 
      code: "nl", 
      channels: [
        // General
        ...createChannels('nl', [
          'NPO 1 HD', 'NPO 2 HD', 'NPO 3 HD', 'RTL 4 HD', 'RTL 5 HD',
          'SBS 6 HD', 'RTL 7 HD', 'VERONICA HD', 'NET 5 HD', 'RTL 8 HD',
          'NPO 1', 'NPO 2', 'NPO 3', 'RTL 4', 'RTL 5',
          'SBS 6', 'RTL 7', 'VERONICA', 'NET 5', 'RTL 8',
          'NPO 1 +1', 'NPO 2 +1', 'NPO 3 +1', 'RTL 4 +1', 'RTL 5 +1',
          'SBS 6 +1', 'RTL 7 +1', 'VERONICA +1', 'NET 5 +1', 'RTL 8 +1'
        ], 'General'),
        
        // Entertainment
        ...createChannels('nl', [
          'COMEDY CENTRAL HD', 'NICKELODEON HD', 'NICK JR. HD', 'NICKELODEON', 'NICK JR.',
          'COMEDY CENTRAL +1', 'NICKELODEON +1', 'NICK JR. +1', 'COMEDY CENTRAL', 'NICKELODEON +2',
          'NICK JR. +2', 'COMEDY CENTRAL +2', 'NICKELODEON +3', 'NICK JR. +3', 'COMEDY CENTRAL +3',
          'NICKELODEON +4', 'NICK JR. +4', 'COMEDY CENTRAL +4', 'NICKELODEON +5', 'NICK JR. +5'
        ], 'Entertainment'),
        
        // News & Radio
        ...createChannels('nl', [
          'NOS JOURNAAL 24', 'RTL NIEUWS', 'NIEUWS 365', 'BNR NIEUWS RADIO', 'NPO RADIO 1',
          'NPO RADIO 2', 'NPO 3FM', 'Q-MUSIC', 'SKY RADIO', 'VERONICA',
          '100% NL', 'SLAM!', 'DANCE DEPT.', 'SLAM! NONSTOP', 'SLAM! DANCE',
          'SLAM! HITS', 'SLAM! 90S', 'SLAM! 00S', 'SLAM! 10S', 'SLAM! 80S'
        ], 'News & Radio'),
        
        // Sports
        ...createChannels('nl', [
          'ZIGGO SPORT SELECT HD', 'ZIGGO SPORT VOETBAL HD', 'ZIGGO SPORT RACING HD',
          'ZIGGO SPORT GOLF HD', 'ZIGGO SPORT DOCU HD', 'ZIGGO SPORT VOETBAL 1 HD',
          'ZIGGO SPORT VOETBAL 2 HD', 'ZIGGO SPORT VOETBAL 3 HD', 'ZIGGO SPORT VOETBAL 4 HD',
          'ZIGGO SPORT VOETBAL 5 HD', 'ZIGGO SPORT VOETBAL 6 HD', 'ZIGGO SPORT VOETBAL 7 HD',
          'ZIGGO SPORT VOETBAL 8 HD', 'ZIGGO SPORT VOETBAL 9 HD', 'ZIGGO SPORT VOETBAL 10 HD',
          'ZIGGO SPORT VOETBAL 11 HD', 'ZIGGO SPORT VOETBAL 12 HD', 'ZIGGO SPORT VOETBAL 13 HD',
          'ZIGGO SPORT VOETBAL 14 HD', 'ZIGGO SPORT VOETBAL 15 HD', 'ZIGGO SPORT VOETBAL 16 HD',
          'ZIGGO SPORT VOETBAL 17 HD', 'ZIGGO SPORT VOETBAL 18 HD', 'ZIGGO SPORT VOETBAL 19 HD',
          'ZIGGO SPORT VOETBAL 20 HD', 'ZIGGO SPORT VOETBAL 21 HD', 'ZIGGO SPORT VOETBAL 22 HD',
          'ZIGGO SPORT VOETBAL 23 HD', 'ZIGGO SPORT VOETBAL 24 HD', 'ZIGGO SPORT VOETBAL 25 HD'
        ], 'Sports')
      ]
    },
    
    // Europe - Greece
    { 
      country: "GREECE", 
      code: "gr", 
      channels: [
        // General
        ...createChannels('gr', [
          'ERT1 HD', 'ERT2 HD', 'ERT3 HD', 'ERT SPORTS HD', 'ERT NEWS HD',
          'ANT1 HD', 'ALPHA HD', 'STAR HD', 'MEGA HD', 'SKAI HD',
          'OPEN BEYOND HD', 'CONTACT TV HD', 'E TV HD', 'ACTION 24 HD', 'ATTICA TV HD',
          'BLUE SKY HD', 'CINEMA 1 HD', 'CINEMA 2 HD', 'CINEMA 3 HD', 'CINEMA 4 HD',
          'COSMOTE CINEMA 1 HD', 'COSMOTE CINEMA 2 HD', 'COSMOTE CINEMA 3 HD', 'COSMOTE CINEMA 4 HD', 'COSMOTE CINEMA 5 HD',
          'COSMOTE CINEMA 6 HD', 'COSMOTE CINEMA 7 HD', 'COSMOTE CINEMA 8 HD', 'COSMOTE CINEMA 9 HD', 'COSMOTE CINEMA 10 HD'
        ], 'General'),
        
        // Sports
        ...createChannels('gr', [
          'COSMOTE SPORT 1 HD', 'COSMOTE SPORT 2 HD', 'COSMOTE SPORT 3 HD', 'COSMOTE SPORT 4 HD', 'COSMOTE SPORT 5 HD',
          'COSMOTE SPORT 6 HD', 'COSMOTE SPORT 7 HD', 'COSMOTE SPORT 8 HD', 'COSMOTE SPORT 9 HD', 'COSMOTE SPORT 10 HD',
          'NOVA SPORTS 1 HD', 'NOVA SPORTS 2 HD', 'NOVA SPORTS 3 HD', 'NOVA SPORTS 4 HD', 'NOVA SPORTS 5 HD',
          'NOVA SPORTS 6 HD', 'NOVA SPORTS 7 HD', 'NOVA SPORTS 8 HD', 'NOVA SPORTS 9 HD', 'NOVA SPORTS 10 HD',
          'NOVA SPORTS 11 HD', 'NOVA SPORTS 12 HD', 'NOVA SPORTS 13 HD', 'NOVA SPORTS 14 HD', 'NOVA SPORTS 15 HD',
          'NOVA SPORTS 16 HD', 'NOVA SPORTS 17 HD', 'NOVA SPORTS 18 HD', 'NOVA SPORTS 19 HD', 'NOVA SPORTS 20 HD'
        ], 'Sports'),
        
        // Movies & Series
        ...createChannels('gr', [
          'NOVA CINEMA 1 HD', 'NOVA CINEMA 2 HD', 'NOVA CINEMA 3 HD', 'NOVA CINEMA 4 HD', 'NOVA CINEMA 5 HD',
          'NOVA CINEMA 6 HD', 'NOVA CINEMA 7 HD', 'NOVA CINEMA 8 HD', 'NOVA CINEMA 9 HD', 'NOVA CINEMA 10 HD',
          'FOX LIFE HD', 'FOX HD', 'FOX+ HD', 'FOX+ 2 HD', 'FOX+ 3 HD',
          'FOX+ 4 HD', 'FOX+ 5 HD', 'FOX+ 6 HD', 'FOX+ 7 HD', 'FOX+ 8 HD',
          'NOVA CINEMA 1', 'NOVA CINEMA 2', 'NOVA CINEMA 3', 'NOVA CINEMA 4', 'NOVA CINEMA 5',
          'NOVA CINEMA 6', 'NOVA CINEMA 7', 'NOVA CINEMA 8', 'NOVA CINEMA 9', 'NOVA CINEMA 10'
        ], 'Movies & Series'),
        
        // Kids & Music
        ...createChannels('gr', [
          'NOVA KIDS 1 HD', 'NOVA KIDS 2 HD', 'NOVA KIDS 3 HD', 'NOVA KIDS 4 HD', 'NOVA KIDS 5 HD',
          'DISNEY CHANNEL HD', 'DISNEY JUNIOR HD', 'DISNEY XD HD', 'CARTOON NETWORK HD', 'NICKELODEON HD',
          'NICK JR. HD', 'BOOMERANG HD', 'KIDSCO HD', 'JIM JAM HD', 'BABY TV HD',
          'MAD GREEK RADIO', 'RADIO CITY', 'RADIO DIEKPLO', 'RADIO VIBE', 'RADIO VIRGIN',
          'RADIO DEEJAY', 'RADIO GOLD', 'RADIO KISS', 'RADIO MELODIA', 'RADIO ZOO',
          'RADIO 9', 'RADIO 9.84', 'RADIO 9.88', 'RADIO 9.9', 'RADIO 9.92'
        ], 'Kids & Music')
      ]
    },
    
    // Europe - Armenia
    { 
      country: "ARMENIA", 
      code: "am", 
      channels: [
        // General
        ...createChannels('am', [
          'Armenia TV', 'Armenia Premium', 'Shant TV', 'Shant Premium', 'Yerevan TV',
          'ATV', 'ArmNews', 'Armenia TV USA', 'Shant TV USA', 'Armenia TV Russia',
          'Shant TV Russia', 'ATV Armenia', 'ATV USA', 'ATV Russia', 'ATV Europe',
          'ATV Middle East', 'Armenia TV Europe', 'Armenia TV Middle East', 'Shant TV Europe', 'Shant TV Middle East',
          'Yerkir Media', 'Kentron TV', 'Yerkir Media USA', 'Yerkir Media Russia', 'Yerkir Media Europe',
          'Yerkir Media Middle East', 'Kentron TV USA', 'Kentron TV Russia', 'Kentron TV Europe', 'Kentron TV Middle East'
        ], 'General'),
        
        // News
        ...createChannels('am', [
          'ArmNews 24/7', 'ArmNews HD', 'ArmNews Russia', 'ArmNews Europe', 'ArmNews USA',
          'ArmNews Middle East', 'ArmNews English', 'ArmNews Russian', 'ArmNews French', 'ArmNews Arabic',
          'ArmNews 1', 'ArmNews 2', 'ArmNews 3', 'ArmNews 4', 'ArmNews 5',
          'ArmNews 6', 'ArmNews 7', 'ArmNews 8', 'ArmNews 9', 'ArmNews 10',
          'ArmNews 11', 'ArmNews 12', 'ArmNews 13', 'ArmNews 14', 'ArmNews 15',
          'ArmNews 16', 'ArmNews 17', 'ArmNews 18', 'ArmNews 19', 'ArmNews 20'
        ], 'News'),
        
        // Sports
        ...createChannels('am', [
          'Armenia Sport', 'Armenia Sport HD', 'Armenia Sport 1', 'Armenia Sport 2', 'Armenia Sport 3',
          'Armenia Sport 4', 'Armenia Sport 5', 'Armenia Sport 6', 'Armenia Sport 7', 'Armenia Sport 8',
          'Armenia Sport 9', 'Armenia Sport 10', 'Armenia Sport 11', 'Armenia Sport 12', 'Armenia Sport 13',
          'Armenia Sport 14', 'Armenia Sport 15', 'Armenia Sport 16', 'Armenia Sport 17', 'Armenia Sport 18',
          'Armenia Sport 19', 'Armenia Sport 20', 'Armenia Sport 21', 'Armenia Sport 22', 'Armenia Sport 23',
          'Armenia Sport 24', 'Armenia Sport 25', 'Armenia Sport 26', 'Armenia Sport 27', 'Armenia Sport 28'
        ], 'Sports'),
        
        // Culture & Music
        ...createChannels('am', [
          'Armenia TV Music', 'Shant Music', 'ATV Music', 'Armenia Premium Music', 'Shant Premium Music',
          'Armenia Folk', 'Armenia Classic', 'Armenia Jazz', 'Armenia Rock', 'Armenia Pop',
          'Armenia Dance', 'Armenia Retro', 'Armenia Hits', 'Armenia Top 20', 'Armenia Top 10',
          'Armenia Folk Dance', 'Armenia Folk Music', 'Armenia Classical', 'Armenia Opera', 'Armenia Ballet',
          'Armenia Radio 1', 'Armenia Radio 2', 'Armenia Radio 3', 'Armenia Radio 4', 'Armenia Radio 5',
          'Armenia Radio 6', 'Armenia Radio 7', 'Armenia Radio 8', 'Armenia Radio 9', 'Armenia Radio 10'
        ], 'Culture & Music')
      ]
    },
    
    // Americas
    { country: "USA", code: "us", channels: generateChannels('us', 30) },
    { 
      country: "UNITED KINGDOM", 
      code: "gb", 
      channels: [
        // General
        ...createChannels('gb', [
          'BBC 1 UHD', 'BBC 1 FHD', 'BBC 2 UHD', 'BBC 2 FHD', 'BBC 3 CBBC UHD',
          'BBC 3 CBBC FHD', 'BBC 4 CBEEBIES UHD', 'BBC 4 CBEEBIES FHD',
          'BBC SCOTLAND FHD', 'ITV 1 UHD', 'ITV 1 FHD', 'ITV 2 UHD', 'ITV 2 FHD',
          'ITV 3 UHD', 'ITV 3 FHD', 'ITV 4 UHD', 'ITV 4 FHD', 'ITV BE UHD',
          'CHANNEL 4 FHD', 'CHANNEL 5 FHD', 'E4 FHD', 'CBBC FHD', '4SEVEN FHD',
          'ALIBI FHD', 'ALIBI +1', 'SMITHSONIAN CHANNEL FHD'
        ], 'General'),
        
        // News
        ...createChannels('gb', [
          'BBC NEWS UHD', 'BBC NEWS FHD', 'BBC WORLD NEWS UHD', 'BBC PARLIAMENT',
          'BBC ARABIC', 'BLOOMBERG EU', 'BLOOMBERG UHD', 'BLOOMBERG FHD',
          'CNN FHD', 'CNN INTERNATIONAL', 'FRANCE 24', 'GB NEWS', 'RT AMERICA UHD',
          'RT DOCUMENTARY UHD', 'RT NEWS UHD', 'RT UK UHD', 'SKY NEWS UHD',
          'AL JAZEERA EN UHD', 'TRT WORLD', 'CNBC', 'I24NEWS EN', 'EURONEWS EN UHD',
          'EURONEWS'
        ], 'News'),
        
        // Movies
        ...createChannels('gb', [
          'SKY CINEMA ACTION UHD', 'SKY CINEMA COMEDY UHD', 'SKY CINEMA DRAMA UHD',
          'SKY CINEMA GREATS UHD', 'SKY CINEMA HITS UHD', 'SKY CINEMA OSCARS UHD',
          'SKY CINEMA PREMIERE UHD', 'SKY CINEMA SCIFI HORROR UHD',
          'SKY CINEMA SELECT/OSCARS FHD', 'SKY CINEMA THRILLER UHD',
          'SKY DOCUMENTARIES FHD', 'SKY CINEMA ACTION FHD', 'SKY CINEMA DISNEY FHD',
          'SKY CINEMA FAMILY FHD', 'SKY CINEMA GREATS FHD', 'SKY CINEMA HITS FHD',
          'SKY CINEMA PREMIER FHD', 'SKY CINEMA SCI-FI FHD', 'SKY CINEMA THRILLER FHD',
          'SKY COMEDY FHD', 'SKY CRIME FHD', 'TCM FHD', 'AMC FHD', 'FILM 4 FHD'
        ], 'Movies'),
        
        // Entertainment
        ...createChannels('gb', [
          'DAYSTAR UHD', 'DAYSTAR FHD', 'EDEN FHD', 'FOX FHD', 'GOLD FHD',
          'DAVE FHD', 'LIFETIME FHD', 'E! ENTERTAINMENT FHD', 'MORE 4 FHD',
          'QUEST FHD', 'UTV FHD', 'SKY NEWS', 'SKY ARTS FHD', 'SKY ATLANTIC FHD',
          'SKY WITNESS UHD', 'SKY SHOWCASE', 'SKY MAX', 'UNIVERSAL FHD', 'TLC FHD',
          'STV FHD', 'COMEDY CENTRAL FHD', 'COMEDY CENTRAL', 'COMEDY CENT XTRA+1'
        ], 'Entertainment'),
        
        // Kids
        ...createChannels('gb', [
          'DISNEY CHANNEL FHD', 'DISNEY XD FHD', 'DISNEY JUNIOR FHD',
          'BOOMERANG FHD', 'CARTOON NETWORK FHD', 'NICKELODEON FHD',
          'CBEEBIES UHD', 'TOM & JERRY', 'BABY TV', 'CARTOONITO', 'NICKELODEON',
          'NICK JUNIOR', 'NICK JUNIOR +1', 'NICK JUNIOR TOO', 'NICK TOONS',
          'TINY POP', 'TINY POP +1'
        ], 'Kids'),
        
        // Music
        ...createChannels('gb', [
          'MTV FHD', 'MTV LIVE FHD', 'MTV BASE', 'MTV CLASSIC', 'MTV DANCE',
          'MTV HITS', 'MTV MUSIC', '4 MUSIC', 'BOX HITS', 'CLUBLAND TV', 'KISS',
          'MAGIC', 'POP', 'POP +1', 'POP MAX', 'POP MAX+1', 'SPOTLIGHT', 'THE BOX',
          'TRACE URBAN', 'TRACE VAULT', 'VH1', 'NOW 70S', 'NOW 80S', 'NOW 90S',
          'MC-90S', 'MC-ALTERNATIVE', 'MC-BRITS + HITS', 'MC-DANCE EDM',
          'MC-HIP HOP & R&B', 'MC-HIT LIST', 'MC-KIDS ONLY', 'MC-METAL',
          'MC-MEXICANA', 'MC-MUSICA URBANA', 'MC-POP & COUNTRY', 'MC-POP HITS',
          'MC-POP LATINO', 'MC-R&B SOUL', 'MC-RAP', 'MC-ROCK', 'MC-TEEN BEATS',
          'MC-THROWBACK JAMS', 'MC-TODAYS COUNTRY', 'MC-TODDLER JAMS',
          'MC-TROPICALES', 'MC-Y2K', 'DJ STINGRAY FHD', 'Q-DANCE 2021 1 FHD',
          'Q-DANCE 2021 2 FHD', 'Q-DANCE 2021 3 FHD', 'Q-DANCE 2021 4 FHD',
          'Q-DANCE 2021 5 FHD'
        ], 'Music')
      ]
    },
    { country: "CANADA", code: "ca", channels: generateChannels('ca', 25) },
    { country: "AUSTRALIA", code: "au", channels: generateChannels('au', 20) },
    { country: "GERMANY", code: "de", channels: generateChannels('de', 25) },
    
    // Rest of Europe
    { country: "FRANCE", code: "fr", channels: generateChannels('fr', 25) },
    { country: "IRELAND", code: "ie", channels: generateChannels('ie', 6) },
    { country: "SPAIN", code: "es", channels: generateChannels('es', 8) },
    { country: "ITALY", code: "it", channels: generateChannels('it', 8) },
    { country: "NETHERLANDS", code: "nl", channels: generateChannels('nl', 6) },
    { country: "GREECE", code: "gr", channels: generateChannels('gr', 6) },
    { 
      country: "ARMENIA", 
      code: "am", 
      channels: createChannels('am', [
        'Armenia TV', 'Shant TV', 'Armenia Premium', 'Yerkir Media', 'ATV Armenia', 'Shoghakat TV', 'Kentron TV',
        'ArmNews', 'Yerevan TV', 'Armenia TV Public', 'Armenia TV 24', 'Armenia TV HD', 'Armenia TV Premium', 'Armenia TV Gold',
        'Armenia TV Comedy', 'Armenia TV Cinema', 'Armenia TV Series', 'Armenia TV Sport', 'Armenia TV Kids', 'Armenia TV Music',
        'Armenia TV News', 'Armenia TV Documentaries', 'Armenia TV History', 'Armenia TV Nature', 'Armenia TV Science',
        'Armenia TV 1', 'Armenia TV 2', 'Armenia TV 3', 'Armenia TV 4', 'Armenia TV 5', 'Armenia TV 6', 'Armenia TV 7',
        'Armenia TV 8', 'Armenia TV 9', 'Armenia TV 10', 'Armenia TV 11', 'Armenia TV 12', 'Armenia TV 13', 'Armenia TV 14',
        'Armenia TV 15', 'Armenia TV 16', 'Armenia TV 17', 'Armenia TV 18', 'Armenia TV 19', 'Armenia TV 20', 'Armenia TV 21',
        'Armenia TV 22', 'Armenia TV 23', 'Armenia TV 24', 'Armenia TV 25', 'Armenia TV 26', 'Armenia TV 27', 'Armenia TV 28',
        'Armenia TV 29', 'Armenia TV 30', 'Armenia TV 31', 'Armenia TV 32', 'Armenia TV 33', 'Armenia TV 34', 'Armenia TV 35',
        'Armenia TV 36', 'Armenia TV 37', 'Armenia TV 38', 'Armenia TV 39', 'Armenia TV 40', 'Armenia TV 41', 'Armenia TV 42',
        'Armenia TV 43', 'Armenia TV 44', 'Armenia TV 45', 'Armenia TV 46', 'Armenia TV 47', 'Armenia TV 48', 'Armenia TV 49',
        'Armenia TV 50'
      ]) 
    },
    { country: "SWITZERLAND", code: "ch", channels: generateChannels('ch', 5) },
    { country: "BULGARIA", code: "bg", channels: generateChannels('bg', 4) },
    { country: "SWEDEN", code: "se", channels: generateChannels('se', 5) },
    { country: "DENMARK", code: "dk", channels: generateChannels('dk', 5) },
    { country: "EX-YUGOSLAVIA", code: "yu", channels: generateChannels('yu', 6) },
    { country: "NORTH MACEDONIA", code: "mk", channels: generateChannels('mk', 4) },
    { country: "HUNGARY", code: "hu", channels: generateChannels('hu', 5) },
    { country: "UKRAINE", code: "ua", channels: generateChannels('ua', 6) },
    { 
      country: "BELGIUM", 
      code: "be", 
      channels: createChannels('be', [
        'LA UNE', 'TIPS', 'LA TROIS', 'RTL TVI', 'PLUG TV', 'CLUB RTL', 'RTL INFO',
        'RTL SPORT 1', 'RTL SPORT 2', 'RTL BELGIUM', 'CLUB RTL', 'PLUG RTL', 'AB3',
        'ABXPLORE', 'LA TROIS', 'LA UNE', 'LA DEUX', 'LA TROIS', 'CANVAS', 'KETNET',
        'OP12', 'VTM', 'VTM 2', 'VTM 3', 'VTM 4', 'VTM GOLD', 'VTM KIDS', 'VTM KIDS JR',
        'CAZ', 'VITAYA', 'VTM NON-STOP', 'VTM NON-STOP 2', 'VTM NON-STOP 3',
        'VTM NON-STOP 4', 'VTM NON-STOP 5', 'VTM NON-STOP 6', 'VTM NON-STOP 7',
        'VTM NON-STOP 8', 'VTM NON-STOP 9', 'VTM NON-STOP 10', 'VTM NON-STOP 11',
        'VTM NON-STOP 12', 'VTM NON-STOP 13', 'VTM NON-STOP 14', 'VTM NON-STOP 15',
        'VTM NON-STOP 16', 'VTM NON-STOP 17', 'VTM NON-STOP 18', 'VTM NON-STOP 19',
        'VTM NON-STOP 20', 'VTM NON-STOP 21', 'VTM NON-STOP 22', 'VTM NON-STOP 23',
        'VTM NON-STOP 24', 'VTM NON-STOP 25', 'VTM NON-STOP 26', 'VTM NON-STOP 27',
        'VTM NON-STOP 28', 'VTM NON-STOP 29', 'VTM NON-STOP 30', 'VTM NON-STOP 31',
        'VTM NON-STOP 32', 'VTM NON-STOP 33', 'VTM NON-STOP 34', 'VTM NON-STOP 35',
        'VTM NON-STOP 36', 'VTM NON-STOP 37', 'VTM NON-STOP 38', 'VTM NON-STOP 39',
        'VTM NON-STOP 40', 'VTM NON-STOP 41', 'VTM NON-STOP 42', 'VTM NON-STOP 43',
        'VTM NON-STOP 44', 'VTM NON-STOP 45', 'VTM NON-STOP 46', 'VTM NON-STOP 47',
        'VTM NON-STOP 48', 'VTM NON-STOP 49', 'VTM NON-STOP 50'
      ]) 
    },
    { 
      country: "PORTUGAL", 
      code: "pt", 
      channels: createChannels('pt', [
        'RTP 1', 'RTP 2', 'RTP 3', 'RTP MEMÓRIA', 'RTP MADEIRA', 'RTP ACORES',
        'RTP ÁFRICA', 'RTP INTERNACIONAL', 'SIC', 'SIC NOTÍCIAS', 'SIC RADICAL',
        'SIC K', 'SIC MULHER', 'SIC CARAS', 'SIC MULHER', 'TVI', 'TVI 24',
        'TVI REALITY', 'TVI FICÇÃO', 'TVI PLAY', 'CNN PORTUGAL', 'PORTO CANAL',
        'LOCALVISAO', 'EUROSPORT 1', 'EUROSPORT 2', 'SPORT TV +', 'SPORT TV 1',
        'SPORT TV 2', 'SPORT TV 3', 'SPORT TV 4', 'SPORT TV 5', 'SPORT TV 6',
        'BTV', 'CANAL 11', 'CANAL PANDA', 'CANAL PANDA +', 'BIGGS', 'PFC',
        'HOLLYWOOD', 'FOX MOVIES', 'FOX COMEDY', 'FOX CRIME', 'FOX LIFE', 'FOX',
        'AXN', 'AXN WHITE', 'AXN BLACK', 'SYFY', 'AMC', 'TVCINE 1', 'TVCINE 2',
        'TVCINE 3', 'TVCINE 4', 'CINEMUNDO', 'MOV', 'SUNDANCE TV', 'NAT GEO WILD',
        'NAT GEO', 'DISCOVERY CHANNEL', 'DISCOVERY SHOWCASE', 'DISCOVERY SCIENCE',
        'DISCOVERY TURBO', 'HISTORY', 'ID', 'ODISSEIA', 'CRIME+INVESTIGATION',
        'CACAVISION', '24 KITCHEN', 'E! ENTERTAINMENT', 'TLC', 'TRAVEL CHANNEL',
        'MUSIC BOX', 'VH1', 'MTV PORTUGAL', 'MEZZO', 'AFRO MUSIC', 'MCM TOP',
        'TRACE URBAN', 'TRACE TOCA', 'VICELAND', 'FUEL TV', 'GLOBO PREMIUM',
        'TV RECORD', 'SIC INTERNACIONAL', 'RTP ÁFRICA', 'RTP INTERNACIONAL',
        'TVCI', 'TV GALIZA', 'TVE INTERNACIONAL', 'TV5 MONDE', 'EURONEWS',
        'FRANCE 24', 'ALJAZEERA', 'BBC WORLD', 'CNN INTERNATIONAL', 'BLOOMBERG',
        'CNBC', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24',
        'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG',
        'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE',
        'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT',
        'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE',
        'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA',
        'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS',
        'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS',
        'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD',
        'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24',
        'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG',
        'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE',
        'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT',
        'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE',
        'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA',
        'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS',
        'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS',
        'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD',
        'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24',
        'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG',
        'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE',
        'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT',
        'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE',
        'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA',
        'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS',
        'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS',
        'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD',
        'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24',
        'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG',
        'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE',
        'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT',
        'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE',
        'CCTV NEWS', 'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA',
        'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS',
        'NHK WORLD', 'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS',
        'FRANCE 24', 'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD',
        'ARIRANG', 'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24',
        'DEUTSCHE WELLE', 'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG',
        'FRANCE 24', 'RT', 'ALJAZEERA', 'EURONEWS', 'FRANCE 24', 'DEUTSCHE WELLE',
        'TV5 MONDE', 'CCTV NEWS', 'NHK WORLD', 'ARIRANG'
      ]) 
    },
    { 
      country: "MALTA", 
      code: "mt", 
      channels: createChannels('mt', [
        'TVM', 'TVM2', 'NET TV', 'ONE', 'SMASH TV', 'F LIVING', 'XEJK', 'KLAN TV', 'TELESCIENZA', 'TVM NEWS+',
        'TVM SPORT+', 'KANNA 1', 'KANNA 2', 'KANNA 3', 'KANNA 4', 'KANNA 5', 'KANNA 6', 'KANNA 7', 'KANNA 8',
        'KANNA 9', 'KANNA 10', 'KANNA 11', 'KANNA 12', 'KANNA 13', 'KANNA 14', 'KANNA 15', 'KANNA 16', 'KANNA 17',
        'KANNA 18', 'KANNA 19', 'KANNA 20', 'KANNA 21', 'KANNA 22', 'KANNA 23', 'KANNA 24', 'KANNA 25', 'KANNA 26',
        'KANNA 27', 'KANNA 28', 'KANNA 29', 'KANNA 30', 'KANNA 31', 'KANNA 32', 'KANNA 33', 'KANNA 34', 'KANNA 35',
        'KANNA 36', 'KANNA 37', 'KANNA 38', 'KANNA 39', 'KANNA 40', 'KANNA 41', 'KANNA 42', 'KANNA 43', 'KANNA 44',
        'KANNA 45', 'KANNA 46', 'KANNA 47', 'KANNA 48', 'KANNA 49', 'KANNA 50'
      ]) 
    },
    { 
      country: "AUSTRIA", 
      code: "at", 
      channels: createChannels('at', [
        'ORF 1', 'ORF 2', 'ORF III', 'ORF Sport +', 'ATV', 'ATV II', 'ATV 2', 'ATV PLUS', 'ATV GOLD', 'ATV COMEDY',
        'ATV SERIE', 'ATV 2 SERIE', 'ATV 2 SPORT', 'ATV 2 PREMIERE', 'ATV 2 THRILLER', 'ATV 2 ACTION', 'ATV 2 COMEDY',
        'ATV 2 DOCU', 'ATV 2 FICTION', 'ATV 2 KIDS', 'ATV 2 KINO', 'ATV 2 KRIMI', 'ATV 2 LIEBE', 'ATV 2 NATURE',
        'ATV 2 PREMIERE 24', 'ATV 2 PREMIERE 25', 'ATV 2 PREMIERE 26', 'ATV 2 PREMIERE 27', 'ATV 2 PREMIERE 28',
        'ATV 2 PREMIERE 29', 'ATV 2 PREMIERE 30', 'ATV 2 PREMIERE 31', 'ATV 2 PREMIERE 32', 'ATV 2 PREMIERE 33',
        'ATV 2 PREMIERE 34', 'ATV 2 PREMIERE 35', 'ATV 2 PREMIERE 36', 'ATV 2 PREMIERE 37', 'ATV 2 PREMIERE 38',
        'ATV 2 PREMIERE 39', 'ATV 2 PREMIERE 40', 'ATV 2 PREMIERE 41', 'ATV 2 PREMIERE 42', 'ATV 2 PREMIERE 43',
        'ATV 2 PREMIERE 44', 'ATV 2 PREMIERE 45', 'ATV 2 PREMIERE 46', 'ATV 2 PREMIERE 47', 'ATV 2 PREMIERE 48',
        'ATV 2 PREMIERE 49', 'ATV 2 PREMIERE 50'
      ]) 
    },
    { 
      country: "POLAND", 
      code: "pl", 
      channels: createChannels('pl', [
        'TVP 1', 'TVP 2', 'TVP 3', 'TVP HD', 'TVP INFO', 'TVP KULTURA', 'TVP HISTORIA', 'TVP SPORT', 'TVP POLONIA', 'TVP SERIALE',
        'TVP ABC', 'TVP KULTURA 2', 'TVP HISTORIA 2', 'TVP SPORT 2', 'TVP POLSKA', 'TVP WARSZAWA', 'TVP KRAKÓW', 'TVP WROCŁAW',
        'TVP POZNAŃ', 'TVP GDAŃSK', 'TVP SZCZECIN', 'TVP BYDGOSZCZ', 'TVP LUBLIN', 'TVP KIELCE', 'TVP OPOLE', 'TVP RZESZÓW',
        'TVP BIAŁYSTOK', 'TVP GORZÓW WIELKOPOLSKI', 'TVP OLSZTYN', 'TVP POZNAŃ', 'TVP SZCZECIN', 'TVP WARSZAWA', 'TVP WROCŁAW',
        'TVP 1 HD', 'TVP 2 HD', 'TVP 3 HD', 'TVP INFO HD', 'TVP KULTURA HD', 'TVP HISTORIA HD', 'TVP SPORT HD', 'TVP POLONIA HD',
        'TVP SERIALE HD', 'TVP ABC HD', 'TVP KULTURA 2 HD', 'TVP HISTORIA 2 HD', 'TVP SPORT 2 HD', 'TVP POLSKA HD',
        'TVP WARSZAWA HD', 'TVP KRAKÓW HD', 'TVP WROCŁAW HD', 'TVP POZNAŃ HD', 'TVP GDAŃSK HD', 'TVP SZCZECIN HD',
        'TVP BYDGOSZCZ HD', 'TVP LUBLIN HD', 'TVP KIELCE HD', 'TVP OPOLE HD', 'TVP RZESZÓW HD', 'TVP BIAŁYSTOK HD',
        'TVP GORZÓW WIELKOPOLSKI HD', 'TVP OLSZTYN HD', 'TVP POZNAŃ HD', 'TVP SZCZECIN HD', 'TVP WARSZAWA HD', 'TVP WROCŁAW HD'
      ]) 
    },
    { 
      country: "ALBANIA", 
      code: "al", 
      channels: createChannels('al', [
        'RTSH 1', 'RTSH 2', 'RTSH 24', 'RTSH SHQIP', 'RTSH MIX', 'RTSH SPORT', 'RTSH FILM', 'RTSH DREJT', 'RTSH KRUJA',
        'RTSH GJIROKASTRA', 'RTSH KORÇA', 'RTSH SHKODRA', 'RTSH VLORA', 'RTSH KUKËS', 'RTSH LEZHA', 'RTSH BERAT', 'RTSH FIER',
        'RTSH DIBËR', 'RTSH ELBASAN', 'RTSH GRAMSH', 'RTSH KAVAJË', 'RTSH KOLONJË', 'RTSH KORÇË', 'RTSH KRUMË', 'RTSH KUKËS',
        'RTSH KURBIN', 'RTSH LUSHNJË', 'RTSH MALËSI E MADHE', 'RTSH MALLKASTËR', 'RTSH MAT', 'RTSH MIRDITË', 'RTSH PEQIN',
        'RTSH PËRMET', 'RTSH POGRADEC', 'RTSH PUKË', 'RTSH SARANDË', 'RTSH SKRAPAR', 'RTSH TEPELENË', 'RTSH TIRANË',
        'RTSH TROPOJË', 'RTSH VLORË', 'RTSH 1 HD', 'RTSH 2 HD', 'RTSH 24 HD', 'RTSH SHQIP HD', 'RTSH MIX HD', 'RTSH SPORT HD',
        'RTSH FILM HD', 'RTSH DREJT HD', 'RTSH KRUJA HD', 'RTSH GJIROKASTRA HD', 'RTSH KORÇA HD', 'RTSH SHKODRA HD',
        'RTSH VLORA HD', 'RTSH KUKËS HD', 'RTSH LEZHA HD', 'RTSH BERAT HD', 'RTSH FIER HD', 'RTSH DIBËR HD', 'RTSH ELBASAN HD',
        'RTSH GRAMSH HD', 'RTSH KAVAJË HD', 'RTSH KOLONJË HD', 'RTSH KORÇË HD', 'RTSH KRUMË HD', 'RTSH KUKËS HD',
        'RTSH KURBIN HD', 'RTSH LUSHNJË HD', 'RTSH MALËSI E MADHE HD', 'RTSH MALLKASTËR HD', 'RTSH MAT HD', 'RTSH MIRDITË HD',
        'RTSH PEQIN HD', 'RTSH PËRMET HD', 'RTSH POGRADEC HD', 'RTSH PUKË HD', 'RTSH SARANDË HD', 'RTSH SKRAPAR HD',
        'RTSH TEPELENË HD', 'RTSH TIRANË HD', 'RTSH TROPOJË HD', 'RTSH VLORË HD'
      ]) 
    },
    { country: "ROMANIA", code: "ro", channels: generateChannels('ro', 6) },
    { country: "NORWAY", code: "no", channels: generateChannels('no', 5) },
    { 
      country: "FINLAND", 
      code: "fi", 
      channels: createChannels('fi', [
        'Yle TV1', 'Yle TV2', 'MTV3', 'Nelonen', 'Sub', 'TV5', 'Liv', 'Jim', 'Kutonen', 'TLC Finland',
        'FOX', 'Ava', 'Hero', 'Friikki', 'Yle Teema', 'Yle Fem', 'MTV Sub', 'MTV Ava', 'MTV Katsomo',
        'MTV Leffa', 'MTV Juniori', 'MTV Fakta', 'MTV Ava', 'MTV Sport 1', 'MTV Sport 2', 'MTV Urheilu',
        'MTV Urheilu 1', 'MTV Urheilu 2', 'MTV Urheilu 3', 'MTV Urheilu 4', 'MTV Urheilu 5', 'MTV Urheilu 6',
        'MTV Urheilu 7', 'MTV Urheilu 8', 'MTV Urheilu 9', 'MTV Urheilu 10', 'MTV Urheilu 11', 'MTV Urheilu 12',
        'MTV Urheilu 13', 'MTV Urheilu 14', 'MTV Urheilu 15', 'MTV Urheilu 16', 'MTV Urheilu 17', 'MTV Urheilu 18',
        'MTV Urheilu 19', 'MTV Urheilu 20', 'MTV Urheilu 21', 'MTV Urheilu 22', 'MTV Urheilu 23', 'MTV Urheilu 24',
        'MTV Urheilu 25', 'MTV Urheilu 26', 'MTV Urheilu 27', 'MTV Urheilu 28', 'MTV Urheilu 29', 'MTV Urheilu 30',
        'MTV Urheilu 31', 'MTV Urheilu 32', 'MTV Urheilu 33', 'MTV Urheilu 34', 'MTV Urheilu 35', 'MTV Urheilu 36',
        'MTV Urheilu 37', 'MTV Urheilu 38', 'MTV Urheilu 39', 'MTV Urheilu 40', 'MTV Urheilu 41', 'MTV Urheilu 42',
        'MTV Urheilu 43', 'MTV Urheilu 44', 'MTV Urheilu 45', 'MTV Urheilu 46', 'MTV Urheilu 47', 'MTV Urheilu 48',
        'MTV Urheilu 49', 'MTV Urheilu 50'
      ]) 
    },
    { 
      country: "SLOVENIA", 
      code: "si", 
      channels: createChannels('si', [
        'RTV SLO 1', 'RTV SLO 2', 'TV SLO 3', 'Kanal A', 'POP TV', 'POP BRIO', 'KINO', 'A KANAL', 'TV PIVKA', 'TV 3 MEDIKA',
        'TV PIKA', 'TV LJUBLJANA', 'TV MARIBOR', 'TV KOPER', 'TV POMURJE', 'TV SLOVENIJA 1 HD', 'TV SLOVENIJA 2 HD',
        'TV SLOVENIJA 3 HD', 'TV SLO 1 HD', 'TV SLO 2 HD', 'TV SLO 3 HD', 'KANAL A HD', 'POP TV HD', 'POP BRIO HD',
        'KINO HD', 'A KANAL HD', 'TV PIVKA HD', 'TV 3 MEDIKA HD', 'TV PIKA HD', 'TV LJUBLJANA HD', 'TV MARIBOR HD',
        'TV KOPER HD', 'TV POMURJE HD', 'TV SLO 1 FHD', 'TV SLO 2 FHD', 'TV SLO 3 FHD', 'KANAL A FHD', 'POP TV FHD',
        'POP BRIO FHD', 'KINO FHD', 'A KANAL FHD', 'TV PIVKA FHD', 'TV 3 MEDIKA FHD', 'TV PIKA FHD', 'TV LJUBLJANA FHD',
        'TV MARIBOR FHD', 'TV KOPER FHD', 'TV POMURJE FHD', 'TV SLO 1 4K', 'TV SLO 2 4K', 'TV SLO 3 4K', 'KANAL A 4K',
        'POP TV 4K', 'POP BRIO 4K', 'KINO 4K', 'A KANAL 4K', 'TV PIVKA 4K', 'TV 3 MEDIKA 4K', 'TV PIKA 4K', 'TV LJUBLJANA 4K',
        'TV MARIBOR 4K', 'TV KOPER 4K', 'TV POMURJE 4K'
      ]) 
    },
    { 
      country: "MONTENEGRO", 
      code: "me", 
      channels: createChannels('me', [
        'RTCG 1', 'RTCG 2', 'RTCG SAT', 'RTCG 3', 'RTCG 4', 'TV IN', 'NOVA M', 'PRVA', 'VIJESTI', 'ELMAGRA',
        'RTCG 1 HD', 'RTCG 2 HD', 'RTCG SAT HD', 'RTCG 3 HD', 'RTCG 4 HD', 'TV IN HD', 'NOVA M HD', 'PRVA HD',
        'VIJESTI HD', 'ELMAGRA HD', 'RTCG 1 FHD', 'RTCG 2 FHD', 'RTCG SAT FHD', 'RTCG 3 FHD', 'RTCG 4 FHD',
        'TV IN FHD', 'NOVA M FHD', 'PRVA FHD', 'VIJESTI FHD', 'ELMAGRA FHD', 'RTCG 1 4K', 'RTCG 2 4K', 'RTCG SAT 4K',
        'RTCG 3 4K', 'RTCG 4 4K', 'TV IN 4K', 'NOVA M 4K', 'PRVA 4K', 'VIJESTI 4K', 'ELMAGRA 4K', 'RTCG 1 8K',
        'RTCG 2 8K', 'RTCG SAT 8K', 'RTCG 3 8K', 'RTCG 4 8K', 'TV IN 8K', 'NOVA M 8K', 'PRVA 8K', 'VIJESTI 8K',
        'ELMAGRA 8K', 'RTCG 1 16K', 'RTCG 2 16K', 'RTCG SAT 16K', 'RTCG 3 16K', 'RTCG 4 16K', 'TV IN 16K',
        'NOVA M 16K', 'PRVA 16K', 'VIJESTI 16K', 'ELMAGRA 16K'
      ]) 
    },
    { 
      country: "AZERBAIJAN", 
      code: "az", 
      channels: createChannels('az', [
        'AzTV', 'İTV', 'İdman TV', 'Mədəniyyət TV', 'Azad Azərbaycan TV', 'Space TV', 'Xəzər TV', 'Lider TV', 'ATV', 'ARB',
        'CBC', 'CBC Sport', 'CBC Xəbər', 'Real TV', 'ARB 24', 'ARB Ulduz', 'ARB Günəş', 'ARB Kəpəz', 'ARB Cənab',
        'ARB Uşaq', 'ARB Ədəbiyyat', 'ARB Kino', 'ARB Musiqi', 'ARB İdman', 'ARB Xəbər', 'ARB HD', 'İTV HD', 'İdman TV HD',
        'Mədəniyyət TV HD', 'Azad Azərbaycan TV HD', 'Space TV HD', 'Xəzər TV HD', 'Lider TV HD', 'ATV HD', 'ARB HD',
        'CBC HD', 'CBC Sport HD', 'CBC Xəbər HD', 'Real TV HD', 'ARB 24 HD', 'ARB Ulduz HD', 'ARB Günəş HD', 'ARB Kəpəz HD',
        'ARB Cənab HD', 'ARB Uşaq HD', 'ARB Ədəbiyyat HD', 'ARB Kino HD', 'ARB Musiqi HD', 'ARB İdman HD', 'ARB Xəbər HD'
      ]) 
    },
    { 
      country: "RUSSIA", 
      code: "ru", 
      channels: createChannels('ru', [
        'Первый канал', 'Россия 1', 'Матч ТВ', 'НТВ', 'Пятый канал', 'Россия К', 'Россия 24', 'Карусель', 'ОТР', 'ТВ Центр',
        'РЕН ТВ', 'Спас', 'СТС', 'Домашний', 'ТВ-3', 'Пятница!', 'Звезда', 'Мир', 'ТНТ', 'МУЗ-ТВ', 'ТВ-6', '2x2', 'ТНТ4',
        'Че', 'Супер', 'Домашние животные', 'Поехали!', 'Телеканал 360', 'Москва 24', 'Москва Доверие', 'Москва. Доверие',
        'Москва. Третий возраст', 'Москва. 24 Док', 'Москва. 24 Новости', 'Москва. 24 События', 'Москва. 24 Погода',
        'Москва. 24 Транспорт', 'Москва. 24 Бизнес', 'Москва. 24 Наука', 'Москва. 24 Технологии', 'Москва. 24 Кино',
        'Москва. 24 Сериалы', 'Москва. 24 Детям', 'Москва. 24 Спорт', 'Москва. 24 Хоккей', 'Москва. 24 Футбол',
        'Москва. 24 Теннис', 'Москва. 24 Бокс', 'Москва. 24 Единоборства', 'Москва. 24 Авто', 'Москва. 24 Недвижимость',
        'Москва. 24 Еда', 'Москва. 24 Здоровье', 'Москва. 24 Мода', 'Москва. 24 Красота', 'Москва. 24 Отдых',
        'Москва. 24 Путешествия', 'Москва. 24 Музыка', 'Москва. 24 Юмор', 'Москва. 24 Игры', 'Москва. 24 Кино 2',
        'Москва. 24 Кино 3', 'Москва. 24 Кино 4', 'Москва. 24 Кино 5', 'Москва. 24 Кино 6', 'Москва. 24 Кино 7',
        'Москва. 24 Кино 8', 'Москва. 24 Кино 9', 'Москва. 24 Кино 10', 'Москва. 24 Кино 11', 'Москва. 24 Кино 12',
        'Москва. 24 Кино 13', 'Москва. 24 Кино 14', 'Москва. 24 Кино 15', 'Москва. 24 Кино 16', 'Москва. 24 Кино 17',
        'Москва. 24 Кино 18', 'Москва. 24 Кино 19', 'Москва. 24 Кино 20', 'Москва. 24 Кино 21', 'Москва. 24 Кино 22',
        'Москва. 24 Кино 23', 'Москва. 24 Кино 24', 'Москва. 24 Кино 25', 'Москва. 24 Кино 26', 'Москва. 24 Кино 27',
        'Москва. 24 Кино 28', 'Москва. 24 Кино 29', 'Москва. 24 Кино 30', 'Москва. 24 Кино 31', 'Москва. 24 Кино 32',
        'Москва. 24 Кино 33', 'Москва. 24 Кино 34', 'Москва. 24 Кино 35', 'Москва. 24 Кино 36', 'Москва. 24 Кино 37',
        'Москва. 24 Кино 38', 'Москва. 24 Кино 39', 'Москва. 24 Кино 40', 'Москва. 24 Кино 41', 'Москва. 24 Кино 42',
        'Москва. 24 Кино 43', 'Москва. 24 Кино 44', 'Москва. 24 Кино 45', 'Москва. 24 Кино 46', 'Москва. 24 Кино 47',
        'Москва. 24 Кино 48', 'Москва. 24 Кино 49', 'Москва. 24 Кино 50'
      ]) 
    },
    
    // Americas (continued)
    { country: "MEXICO", code: "mx", channels: generateChannels('mx', 10) },
    { country: "LATINO", code: "lat", channels: generateChannels('lat', 15) },
    { country: "CHINA", code: "cn", channels: generateChannels('cn', 35) },
    { country: "CUBA", code: "cu", channels: generateChannels('cu', 6) },
    { country: "PANAMA", code: "pa", channels: generateChannels('pa', 6) },
    { country: "DOMINICAN REPUBLIC", code: "do", channels: generateChannels('do', 7) },
    { country: "VENEZUELA", code: "ve", channels: generateChannels('ve', 7) },
    { country: "CARIBBEAN", code: "car", channels: generateChannels('car', 8) },
    { country: "BRAZIL", code: "br", channels: generateChannels('br', 35) },
    { country: "ARGENTINA", code: "ar", channels: generateChannels('ar', 10) },
    { country: "COLOMBIA", code: "co", channels: generateChannels('co', 9) },
    { country: "ECUADOR", code: "ec", channels: generateChannels('ec', 6) },
    { country: "URUGUAY", code: "uy", channels: generateChannels('uy', 6) },
    { country: "PERU", code: "pe", channels: generateChannels('pe', 7) },
    
    // Asia
    { country: "KURDISTAN", code: "krd", channels: generateChannels('krd', 6) },
    { country: "IRAN", code: "ir", channels: generateChannels('ir', 8) },
    { country: "TAMIL", code: "ta", channels: generateChannels('ta', 8) },
    { country: "INDIA", code: "in", channels: generateChannels('in', 40) },
    { country: "TELUGU", code: "te", channels: generateChannels('te', 10) },
    { country: "BENGALI", code: "bn", channels: generateChannels('bn', 8) },
    { country: "ENGLISH", code: "en", channels: generateChannels('en', 12) },
    { country: "BHOJPURI", code: "bho", channels: generateChannels('bho', 6) },
    { country: "KANNADA", code: "kn", channels: generateChannels('kn', 7) },
    { country: "AFGHANISTAN", code: "af", channels: generateChannels('af', 7) },
    { country: "KAZAKHSTAN", code: "kz", channels: generateChannels('kz', 7) },
    { country: "THAILAND", code: "th", channels: generateChannels('th', 8) },
    { country: "TURKEY", code: "tr", channels: generateChannels('tr', 10) },
    { country: "PAKISTAN", code: "pk", channels: generateChannels('pk', 10) },
    { country: "HINDI", code: "hi", channels: generateChannels('hi', 12) },
    { country: "BANGLADESH", code: "bd", channels: generateChannels('bd', 8) },
    { country: "MALAYALAM", code: "ml", channels: generateChannels('ml', 8) },
    { country: "PUNJABI", code: "pa", channels: generateChannels('pa', 7) },
    { country: "SPORTS", code: "spt", channels: generateChannels('spt', 15) },
    { country: "MARATHI", code: "mr", channels: generateChannels('mr', 7) },
    { country: "GUJARATI", code: "gu", channels: generateChannels('gu', 7) },
    { country: "PHILIPPINES", code: "ph", channels: generateChannels('ph', 10) },
    { country: "SOUTH KOREA", code: "kr", channels: generateChannels('kr', 9) },
    { country: "MALAYSIA", code: "my", channels: generateChannels('my', 8) },
    { country: "JAPAN", code: "jp", channels: generateChannels('jp', 30) },
    
    // Arab World
    { country: "ARABIC NEWS", code: "ar-news", channels: generateChannels('ar-news', 10) },
    { country: "MOROCCO", code: "ma", channels: generateChannels('ma', 8) },
    { country: "TUNISIA", code: "tn", channels: generateChannels('tn', 7) },
    { country: "LEBANON", code: "lb", channels: generateChannels('lb', 7) },
    { country: "UAE", code: "ae", channels: generateChannels('ae', 9) },
    { country: "KUWAIT", code: "kw", channels: generateChannels('kw', 7) },
    { country: "BAHRAIN", code: "bh", channels: generateChannels('bh', 6) },
    { country: "SYRIA", code: "sy", channels: generateChannels('sy', 6) },
    { country: "YEMEN", code: "ye", channels: generateChannels('ye', 6) },
    { country: "SUDAN", code: "sd", channels: generateChannels('sd', 6) },
    { country: "RELIGIOUS", code: "rel", channels: generateChannels('rel', 8) },
    { country: "BEIN SPORTS", code: "bein", channels: generateChannels('bein', 10) },
    { country: "OSN", code: "osn", channels: generateChannels('osn', 8) },
    { country: "ALGERIA", code: "dz", channels: generateChannels('dz', 8) },
    { country: "EGYPT", code: "eg", channels: generateChannels('eg', 25) },
    { country: "IRAQ", code: "iq", channels: generateChannels('iq', 8) },
    { country: "SAUDI ARABIA", code: "sa", channels: generateChannels('sa', 9) },
    { country: "QATAR", code: "qa", channels: generateChannels('qa', 7) },
    { country: "JORDAN", code: "jo", channels: generateChannels('jo', 7) },
    { country: "LIBYA", code: "ly", channels: generateChannels('ly', 6) },
    { country: "MAURITANIA", code: "mr", channels: generateChannels('mr', 4) },
    { country: "PALESTINE", code: "ps", channels: generateChannels('ps', 6) },
    
    // Africa
    { country: "SOMALIA", code: "so", channels: generateChannels('so', 6) },
    { country: "GHANA", code: "gh", channels: generateChannels('gh', 7) },
    { country: "ERITREA", code: "er", channels: generateChannels('er', 4) },
    { country: "UGANDA", code: "ug", channels: generateChannels('ug', 7) },
    { country: "TOGO", code: "tg", channels: generateChannels('tg', 4) },
    { country: "TANZANIA", code: "tz", channels: generateChannels('tz', 6) },
    { country: "GUINEA", code: "gn", channels: generateChannels('gn', 6) },
    { country: "IVORY COAST", code: "ci", channels: generateChannels('ci', 7) },
    { country: "BURKINA FASO", code: "bf", channels: generateChannels('bf', 6) },
    { country: "CHAD", code: "td", channels: generateChannels('td', 4) },
    { country: "BENIN", code: "bj", channels: generateChannels('bj', 6) },
    { country: "MOZAMBIQUE", code: "mz", channels: generateChannels('mz', 6) },
    { country: "SENEGAL", code: "sn", channels: generateChannels('sn', 7) },
    { country: "DJIBOUTI", code: "dj", channels: generateChannels('dj', 4) },
    { country: "SOUTH AFRICA", code: "za", channels: generateChannels('za', 25) },
    { country: "NIGERIA", code: "ng", channels: generateChannels('ng', 30) },
    { country: "CONGO", code: "cg", channels: generateChannels('cg', 6) },
    { country: "SIERRA LEONE", code: "sl", channels: generateChannels('sl', 6) },
    { country: "GAMBIA", code: "gm", channels: generateChannels('gm', 4) },
    { country: "GABON", code: "ga", channels: generateChannels('ga', 4) },
    { country: "CAMEROON", code: "cm", channels: generateChannels('cm', 7) },
    { country: "ANGOLA", code: "ao", channels: generateChannels('ao', 7) },
    { country: "KENYA", code: "ke", channels: generateChannels('ke', 12) },
    { country: "RWANDA", code: "rw", channels: generateChannels('rw', 8) },
    { country: "MALI", code: "ml", channels: generateChannels('ml', 8) },
    { country: "ETHIOPIA", code: "et", channels: generateChannels('et', 10) }
  ];

  // Add countries to the list, avoiding duplicates
  for (const country of baseCountries) {
    if (!countryCodes.has(country.code)) {
      countryCodes.add(country.code);
      countries.push(country);
    }
  }

  return countries;
};

export const channelsByCountry: CountryChannels[] = getUniqueCountries();

// Get all unique categories from channels
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  
  channelsByCountry.forEach(country => {
    country.channels.forEach(channel => {
      categories.add(channel.category);
    });
  });
  
  return Array.from(categories);
}

// Get channels by country code
export function getChannelsByCountryCode(code: string) {
  const country = channelsByCountry.find(c => c.code === code);
  return country ? country.channels : [];
}

// Get all countries with channel count
export function getAllCountries() {
  return channelsByCountry.map(country => ({
    name: country.country,
    code: country.code,
    channelCount: country.channels.length
  }));
}
