import { Controller, Get, Param } from '@nestjs/common';
import { ItunesService } from '../service/itunes.service';
import type { Podcast } from '@prisma/client';
import { Episode } from '../entities/episode.entity';

@Controller('v1/itunes')
export class ItunesController {
  constructor(private readonly itunesService: ItunesService) {}

  @Get('search/:name')
  async searchPodcasts(@Param('name') name: string): Promise<Podcast[]> {
    return this.itunesService.searchAndStorePodcasts(name);
  }

  @Get('suggested-episodes/:name')
  async getSuggestedEpisodes(@Param('name') name: string): Promise<Episode[]> {
    return this.itunesService.getSuggestedEpisodes(name);
  }
}
