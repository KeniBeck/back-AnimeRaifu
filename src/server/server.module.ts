import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { EpisodeUrlService } from './services/episode-url.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ServerController],
  providers: [ServerService, EpisodeUrlService, PrismaService],
})
export class ServerModule { }
