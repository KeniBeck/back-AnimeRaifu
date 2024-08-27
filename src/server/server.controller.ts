import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('server')
@ApiTags('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) { }

  @Post()
  create(@Param('id') id: string) {
    return this.serverService.create(id);
  }

  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(+id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.remove(+id);
  }
}
