export interface AllTitlesDataType {
  "titles": TitleDataType[];
}


export interface TitleDataType {
  "id": string,
  "type": string,
  "primaryTitle": string,
  "originalTitle": string,
  "primaryImage": {
    "url": string,
    "width": number,
    "height": number,
  },
  "startYear": number,
  "runtimeSeconds": number,
  "genres": string[],
  "rating": {
    "aggregateRating": number,
    "voteCount": number,
  },
  "plot": string,
}



