import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { EpisodeUrlService } from './services/episode-url.service';
import { PrismaService } from 'src/prisma/prisma.service';
import e from 'express';

@Injectable()
export class ServerService {
  constructor(
    private prisma: PrismaService,
    private episodeURL: EpisodeUrlService

  ) { }
  async create(id: string) {

    try {
      const episodeInfo = this.prisma.episode.findFirst({
        where: {
          id: id
        }
      })

      const url = (await episodeInfo).url_episode;
      const id_anime = (await episodeInfo).id_anime;
      const server = await this.episodeURL.extractUrlEpisode(url)
      console.log(server, 'hahahahaha')



      return server;

    } catch (error) {
      return error.message;

    }
  }

  findAll() {
    return this.prisma.servidor.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
