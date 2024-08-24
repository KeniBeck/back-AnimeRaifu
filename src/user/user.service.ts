import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...rest,
        password_hash: password
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany(
      {
        select: {
          username: true,
          email: true,
          fecha_nacimiento: true
        }
      }
    );
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        username: true,
        email: true,
        fecha_nacimiento: true
      }
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserDto
      }
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
