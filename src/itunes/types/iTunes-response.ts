export type iTunesResponse = {
  resultCount: number;
  results: Array<{
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName?: string;
    feedUrl?: string;
    artworkUrl30?: string;
    artworkUrl60?: string;
    artworkUrl100?: string;
    releaseDate?: string;
    country?: string;
    primaryGenreName?: string;
    trackViewUrl?: string;
    description?: string;
  }>;
}
