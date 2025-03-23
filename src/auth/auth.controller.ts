import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { SignInDto } from './dto/sign_in.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  signUp(@Body() createAuthDto: Prisma.UserCreateInput) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  async signIn(@Body() createAuthDto: SignInDto) {
    try {
      const user = await this.authService.findOne(createAuthDto);
      const token = this.jwtService.sign({ id: user.id });
      return {
        accessToken: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error; // NestJS will handle it properly
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
