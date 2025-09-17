export interface Film {
  id: string;
  type: string;
  primaryTitle: string;
  primaryImage?: {
    url: string;
  };
  startYear: number;
  endYear?: number;
  runtimeSeconds: number;
  genres: string[];
  rating?: {
    aggregateRating: number;
    voteCount: number;
  };
  plot: string;
}

export interface Data {
  titles?: Film[];
  totalCount?: number;
  nextPageToken?: string;
}

export interface FilterChoose {
  value: string;
  name: string;
  status: boolean;
}

export interface RangeTypes {
  yearMin: string;
  yearMax: string;
  ratingMin: string;
  ratingMax: string;
  votesMin: string;
  votesMax: string;
}

export interface ErrorTypes {
  code: number;
}

export interface TitleTypes {
  id: string;
  type: string;
  primaryTitle: string;
  primaryImage?: PrimaryImage;
  startYear: number;
  endYear?: number;
  runtimeSeconds?: number;
  genres: string[];
  rating?: Rating;
  metacritic?: Metacritic;
  plot: string;
  directors: Director[];
  writers: Writer[];
  stars: Star[];
  originCountries: OriginCountry[];
  spokenLanguages: SpokenLanguage[];
  interests: Interest[];
}

export interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}

export interface Rating {
  aggregateRating: number;
  voteCount: number;
}

export interface Metacritic {
  score: number;
  reviewCount: number;
}

export interface Director {
  id: string;
  displayName: string;
  primaryImage: PrimaryImage2;
  primaryProfessions: string[];
}

export interface PrimaryImage2 {
  url: string;
  width: number;
  height: number;
}

export interface Writer {
  id: string;
  displayName: string;
  primaryImage: PrimaryImage3;
  primaryProfessions?: string[];
}

export interface PrimaryImage3 {
  url: string;
  width: number;
  height: number;
}

export interface Star {
  id: string;
  displayName: string;
  alternativeNames?: string[];
  primaryImage: PrimaryImage4;
  primaryProfessions: string[];
}

export interface PrimaryImage4 {
  url: string;
  width: number;
  height: number;
}

export interface OriginCountry {
  code: string;
  name: string;
}

export interface SpokenLanguage {
  code: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
  isSubgenre?: boolean;
}

export interface VideosData {
  videos: Video[];
  totalCount: number;
}

export interface Video {
  id: string;
  type: string;
  name: string;
  primaryImage: PrimaryImage;
  description: string;
  width: number;
  height: number;
  runtimeSeconds: number;
}

export interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}

export interface TrillerData {
  items: {
    id: {
      videoId: string;
    };
  }[];
}

export interface CompanyCreditData {
  companyCredits: CompanyCredit[];
  totalCount: number;
  nextPageToken: string;
}

export interface CompanyCredit {
  company: Company;
  category: string;
  countries: Country[];
  yearsInvolved: YearsInvolved;
  attributes: string[];
}

export interface Company {
  id: string;
  name: string;
}

export interface Country {
  code?: string;
  name?: string;
}

export interface YearsInvolved {
  startYear: number;
  endYear: number;
}

export interface ImageData {
  images: Image[];
  totalCount: number;
  nextPageToken: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  type: string;
}
