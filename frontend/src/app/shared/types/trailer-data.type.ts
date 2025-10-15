export interface TrailerDataType {
  "videos": [
    {
      "id": string,
      "type": string,
      "name": string,
      "primaryImage": {
        "url": string,
        "width": number,
        "height": number,
      },
      "description": string,
      "width": number,
      "height": number,
      "runtimeSeconds": number,
      url?: string,
    }
  ],
  "totalCount": number,
}
