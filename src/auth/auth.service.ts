import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { SignInDto } from './dto/sign_in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createAuthDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createAuthDto,
    });
  }

  async findOne(createAuthDto: SignInDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: createAuthDto.email,
        password: createAuthDto.password,
      },
    });

    console.log(user);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return user;
  }
}
