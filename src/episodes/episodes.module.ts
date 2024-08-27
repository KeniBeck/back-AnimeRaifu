import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { EpisodeRankingService } from './services/episode-ranking.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService, EpisodeRankingService, PrismaService],
})
export class EpisodesModule { }
