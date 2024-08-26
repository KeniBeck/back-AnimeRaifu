import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpisodeRankingService } from './services/episode-ranking.service';


@Injectable()
export class EpisodesService {

  constructor(
    private episodeRanking: EpisodeRankingService,
    private prisma: PrismaService
  ) { }

  async create(url: string) {
    const episodes = await this.episodeRanking.extractRankingEpisode(url);


    const createdEpisodes = await Promise.all(episodes.map(episode => {
      return this.prisma.episode.create({
        data: {
          url_episode: episode.url_episode,
          number_episode: episode.number_episode,
          img_episode: episode.img_episode,
        }
      });
    }));

    return createdEpisodes;
  }

  findAll() {
    return this.prisma.episode.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
