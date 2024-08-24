import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [AnimeModule, PrismaModule, UserModule],

})
export class AppModule { }
