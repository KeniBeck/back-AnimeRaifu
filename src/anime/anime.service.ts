import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimeService {
  constructor(private prisma: PrismaService) { }
  create(createAnimeDto: CreateAnimeDto) {
    return this.prisma.anime.create({
      data: {
        ...createAnimeDto
      }
    });
  }

  findAll() {
    return this.prisma.anime.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} anime`;
  }

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
