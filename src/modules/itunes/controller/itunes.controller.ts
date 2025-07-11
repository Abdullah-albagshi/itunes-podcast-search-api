import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ItunesService } from '../service/itunes.service';
import { SearchPodcastDto } from '../dto/search-podcast.dto';
import { Podcast } from '../entities/podcast.entity';
import { Episode } from '../entities/episode.entity';

@Controller('itunes')
export class ItunesController {
  constructor(private readonly itunesService: ItunesService) {}

  @Get('search')
  async searchPodcasts(
    @Query(new ValidationPipe({ transform: true })) searchDto: SearchPodcastDto,
  ): Promise<Podcast[]> {
    return this.itunesService.searchAndStorePodcasts(searchDto);
  }

  @Get('suggested-episodes')
  async getSuggestedEpisodes(
    @Query(new ValidationPipe({ transform: true })) searchDto: SearchPodcastDto,
  ): Promise<Episode[]> {
    return this.itunesService.getSuggestedEpisodes(searchDto);
  }

} 