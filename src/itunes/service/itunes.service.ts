import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { SearchPodcastDto } from '../dto/search-podcast.dto';
import { Podcast } from '../entities/podcast.entity';
import { iTunesResponse } from '../types/iTunes-response';


@Injectable()
export class ItunesService {
  constructor(private readonly prisma: PrismaService) {}


  async searchAndStorePodcasts(searchDto: SearchPodcastDto): Promise<Podcast[]> {
    try {
      // Fetch data from iTunes API
      const response = await axios.get<iTunesResponse>(
        `https://itunes.apple.com/search`,
        {
          params: {
            term: searchDto.query,
            limit: 50,
            media: 'podcast',
          },
        },
      );

      const podcasts: Podcast[] = [];

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

  private mapITunesResultToPodcastData(result: iTunesResponse['results'][number]) {
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