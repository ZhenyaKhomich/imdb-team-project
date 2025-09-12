export interface Film {
  id: string;
  type: string;
  primaryTitle: string;
  primaryImage?: {
    url: string;
  };
  startYear: number;
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
