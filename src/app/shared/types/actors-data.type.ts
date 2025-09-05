export interface ActorsDataType {
  "names": ActorDataType[];
}

export interface ActorDataType {
  id: string;
  displayName: string;
  primaryImage: {
    url: string;
    width: number;
    height: number;
  };
  heightCm?: number;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  meterRanking: {
    currentRank: number;
    changeDirection: string;
    difference: number;
  };
}


