import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EpisodesModule } from './episodes/episodes.module';
import { ServerModule } from './server/server.module';


@Module({
  imports: [AnimeModule, PrismaModule, UserModule, EpisodesModule, ServerModule],
  providers: [],

})
export class AppModule { }
