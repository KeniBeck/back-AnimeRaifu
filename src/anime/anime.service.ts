import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExtractRankingAnimeService } from './services/extract-ranking-anime.service';

@Injectable()
export class AnimeService {


  constructor(
    private prisma: PrismaService,
    private extractAnime: ExtractRankingAnimeService,
  ) { }

  async create() {
    const createdAnimes = [];
    const duplicateAnimes = [];
    const animes = await this.extractAnime.extractRankingAnime();

    for (const anime of animes) {
      const existingAnime = await this.prisma.anime.findFirst({
        where: {
          title: anime.title,
        },
      });

      if (!existingAnime) {
        const createAnimeDto: CreateAnimeDto = {
          title: anime.title,
          img_url: anime.image_url,
          banner_url: anime.banner_url,
          emission: anime.emission,
          sinopsis: anime.sinopsis,
          year: anime.year,
          type: anime.type,

        };
        const createdAnime = await this.prisma.anime.create({
          data: createAnimeDto,
        });

        createdAnimes.push(createdAnime);
      } else {
        duplicateAnimes.push(anime.title);
      }
    }

    if (duplicateAnimes.length > 0) {
      console.log(`The following animes already exist: ${duplicateAnimes.join('\n ' + '\n')}`);
    }

    return createdAnimes;

  }

  findAll() {
    return this.prisma.anime.findMany();
  }

  findOne(id: string) {
    return this.prisma.anime.findUnique({
      where: {
        id: id
      }
    });
  }

  update(id: string, updateAnimeDto: UpdateAnimeDto) {
    return this.prisma.anime.updateMany({
      where: {
        id: id
      },
      data: updateAnimeDto
    });
  }

  remove(id: string) {
    return this.prisma.anime.delete({
      where: {
        id: id
      }
    });
  }
}