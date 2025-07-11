export class Episode {
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
  // Episode-specific fields
  episodeUrl?: string;
  episodeContentType?: string;
  episodeFileExtension?: string;
  episodeGuid?: string;
  episodeLength?: number;
  // Additional fields for episode filtering
  kind?: string;
  wrapperType?: string;
} 