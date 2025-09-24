export interface ActorsData {
  names: Name[];
  nextPageToken: string;
}

export interface Name {
  id: string;
  displayName: string;
  primaryImage: PrimaryImage;
  heightCm?: number;
  birthDate?: BirthDate;
  meterRanking: MeterRanking;
  deathDate?: DeathDate;
}

export interface PrimaryImage {
  url?: string;
  width: number;
  height: number;
}

export interface BirthDate {
  year?: number;
  month?: number;
  day?: number;
}

export interface MeterRanking {
  currentRank: number;
  changeDirection: string;
  difference?: number;
}

export interface DeathDate {
  year?: number;
  month?: number;
  day?: number;
}

export interface ActorData {
  id: string;
  displayName?: string;
  alternativeNames?: string[];
  primaryImage?: PrimaryImage;
  primaryProfessions?: string[];
  biography?: string;
  heightCm?: number;
  birthName?: string;
  birthDate?: BirthDate;
  birthLocation?: string;
  deathDate?: DeathDate;
}

export interface Filmography {
  credits: Credit[]
  totalCount: number
  nextPageToken: string
}

export interface Credit {
  title: Title
  category: string
  characters?: string[]
  episodeCount?: number
}

export interface Title {
  id: string
  type?: string
  primaryTitle?: string
  primaryImage?: PrimaryImage
  startYear?: number
  genres?: string[]
  rating?: Rating
  metacritic?: Metacritic
  originCountries?: OriginCountry[]
  originalTitle?: string
}

export interface Rating {
  aggregateRating: number
  voteCount: number
}

export interface Metacritic {
  score: number
  reviewCount: number
}

export interface OriginCountry {
  code: string
  name: string
}


export interface ActorImages {
  images: Image[]
  totalCount: number
  nextPageToken: string
}

export interface Image {
  url: string
  width: number
  height: number
  type: string
}
