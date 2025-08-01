import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ItunesModule } from './modules/itunes/itunes.module';

@Module({
  imports: [PrismaModule, ItunesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
