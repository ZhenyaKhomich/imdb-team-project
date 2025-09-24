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
