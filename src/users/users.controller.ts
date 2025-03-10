import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dti';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Retrieve all users.
   * @returns An array of all users.
   */
  @Get('/')
  getAllUsers(@Query('role') role?: 'admin | intern'): any[] {
    return this.userService.getAllUsers(role);
  }

  @Get(':id')
  /**
   * Retrieve a specific user by their unique identifier.
   * @param id - The unique identifier of the user.
   * @returns An object containing the user's ID.
   */
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('/')
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.userService.createUser(user);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
