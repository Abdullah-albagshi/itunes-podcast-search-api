export class Podcast {
  id: string;
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string | null;
  feedUrl: string | null;
  artworkUrl30: string | null;
  artworkUrl60: string | null;
  artworkUrl100: string | null;
  releaseDate: Date | null;
  country: string | null;
  primaryGenreName: string | null;
  trackViewUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
} 