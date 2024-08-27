import { Injectable } from '@nestjs/common';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpisodeRankingService } from './services/episode-ranking.service';
import { EpisodeUrlService } from './services/episode-url.service';


@Injectable()
export class EpisodesService {

  constructor(
    private episodeRanking: EpisodeRankingService,
    private prisma: PrismaService,
    private epidoseUrl: EpisodeUrlService
  ) { }

  async create(id: string, url: string) {

    try {

      const existingAnime = await this.prisma.anime.findFirst({
        where: {
          id: id
        }
      })
      const episodes = await this.episodeRanking.extractRankingEpisode(url);

      const createdEpisodes = await Promise.all(episodes.map(episode => {
        return this.prisma.episode.create({
          data: {
            url_episode: episode.url_episode,
            number_episode: episode.number_episode,
            img_episode: episode.img_episode,
            id_anime: id

          }
        });
      }));

      return createdEpisodes;

    } catch (error) {
      return error.message;
    }



  }

  findAll() {
    return this.prisma.episode.findMany();
  }

  findOne(id: string) {
    return this.prisma.episode.findMany({
      where: {
        id_anime: id
      }
    });
  }

  episodeUrl(id: string, url: string) {

  }

  remove(id: string) {
    return this.prisma.episode.deleteMany({
      where: {
        id: id
      }
    });
  }
}
