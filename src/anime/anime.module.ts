import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtractRankingAnimeService } from './services/extract-ranking-anime.service';


@Module({
  controllers: [AnimeController],
  providers: [AnimeService, ExtractRankingAnimeService, PrismaService,]
})
export class AnimeModule { }
