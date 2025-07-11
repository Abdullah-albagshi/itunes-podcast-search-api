import { Module } from '@nestjs/common';
import { ItunesController } from './controller/itunes.controller';
import { ItunesService } from './service/itunes.service';

@Module({
  controllers: [ItunesController],
  providers: [ItunesService],
  exports: [ItunesService],
})
export class ItunesModule {} 