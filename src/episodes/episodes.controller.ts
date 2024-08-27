import { Controller, Get, Post, Patch, Param, Delete, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('episodes')
@ApiTags('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) { }

  @Post(':id')
  create(@Param('id') id: string) {
    return this.episodesService.create(id);
  }

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Query() url: string) {
    return this.episodesService.episodeUrl(id, url);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(id);
  }
}
