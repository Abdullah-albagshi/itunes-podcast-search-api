import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItunesModule } from './itunes/itunes.module';

@Module({
  imports: [PrismaModule, ItunesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
