import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ItunesModule } from './modules/itunes/itunes.module';

@Module({
  imports: [PrismaModule, ItunesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
