import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('anime')
@ApiTags('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) { }

  @Post('ranking')
  create() {
    return this.animeService.create();
  }

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(id);
  }
}
