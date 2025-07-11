export type iTunesPodcastResponse = {
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

export type iTunesEpisodeResponse = {
  resultCount: number;
  results: Array<{
    // Episode-specific fields
    episodeUrl?: string;
    episodeContentType?: string;
    episodeFileExtension?: string;
    episodeGuid?: string;
    episodeLength?: number;
    // Additional fields for episode filtering
    kind?: string;
    wrapperType?: string;
  } & iTunesPodcastResponse['results'][number]>;
}