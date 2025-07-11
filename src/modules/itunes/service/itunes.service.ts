import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Episode } from '../entities/episode.entity';
import type { Podcast } from '@prisma/client';
import {
  iTunesPodcastResponse,
  iTunesEpisodeResponse,
} from '../types/iTunes-response';

@Injectable()
export class ItunesService {
  constructor(private readonly prisma: PrismaService) {}

  async searchAndStorePodcasts(name: string): Promise<Podcast[]> {
    try {
      // Fetch data from iTunes API
      const response = await axios.get<iTunesPodcastResponse>(
        `https://itunes.apple.com/search`,
        {
          params: {
            term: name,
            limit: 50,
            media: 'podcast',
          },
        },
      );

      const podcasts: Podcast[] = [];

      if (response?.data?.resultCount === 0 || !response?.data?.results) {
        return [];
      }

      for (const result of response.data.results) {
        // Skip results without trackId
        if (!result.trackId) {
          console.log('Skipping result without trackId:', result);
          continue;
        }

        const existingPodcast = await this.prisma.podcast.findUnique({
          where: { trackId: result.trackId },
        });

        const podcastData = this.mapITunesResultToPodcastData(result);

        if (!existingPodcast) {
          const podcast = await this.prisma.podcast.create({
            data: podcastData,
          });
          podcasts.push(podcast);
        } else {
          // Update existing podcast
          const updatedPodcast = await this.prisma.podcast.update({
            where: { id: existingPodcast.id },
            data: podcastData,
          });
          podcasts.push(updatedPodcast);
        }
      }

      return podcasts;
    } catch (error) {
      throw new Error(`Failed to search podcasts: ${error.message}`);
    }
  }

  async getSuggestedEpisodes(name: string): Promise<Episode[]> {
    try {
      // First, search for podcasts
      const podcasts = await this.searchAndStorePodcasts(name);

      const allEpisodes: Episode[] = [];

      if (podcasts.length === 0) {
        return [];
      }

      // For each podcast, get its episodes
      for (const podcast of podcasts) {
        try {
          const episodeResponse = await axios.get<iTunesEpisodeResponse>(
            `https://itunes.apple.com/lookup`,
            {
              params: {
                id: podcast.trackId,
                entity: 'podcastEpisode',
                limit: 10, // Get more episodes per podcast to have variety
              },
            },
          );

          if (
            episodeResponse?.data?.resultCount === 0 ||
            !episodeResponse?.data?.results
          ) {
            continue;
          }

          // Filter episodes (remove the podcast itself from results)
          const episodes = episodeResponse.data.results.filter(
            (result) =>
              result.kind === 'podcast-episode' ||
              result.wrapperType === 'track',
          );

          allEpisodes.push(...episodes);
        } catch (error) {
          console.log(
            `Failed to get episodes for podcast ${podcast.trackName}:`,
            error.message,
          );
        }
      }

      // Return only 30 episodes, shuffled for variety
      const shuffledEpisodes = allEpisodes.sort(() => Math.random() - 0.5);
      return shuffledEpisodes.slice(0, 30);
    } catch (error) {
      throw new Error(`Failed to get suggested episodes: ${error.message}`);
    }
  }

  private mapITunesResultToPodcastData(
    result: iTunesPodcastResponse['results'][number],
  ) {
    return {
      trackId: result.trackId,
      trackName: result.trackName,
      artistName: result.artistName,
      collectionName: result.collectionName,
      feedUrl: result.feedUrl,
      artworkUrl30: result.artworkUrl30,
      artworkUrl60: result.artworkUrl60,
      artworkUrl100: result.artworkUrl100,
      releaseDate: result.releaseDate ? new Date(result.releaseDate) : null,
      country: result.country,
      primaryGenreName: result.primaryGenreName,
      trackViewUrl: result.trackViewUrl,
      description: result.description,
    };
  }
}
