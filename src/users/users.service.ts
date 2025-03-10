import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dti';

@Injectable()
export class UsersService {
  private users = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
      role: 'admin',
    },
    {
      userId: '2',
      username: 'maria',
      password: 'guess',
      role: 'intern',
    },
    {
      userId: '3',
      username: 'Numan',
      password: 'guess',
      role: 'intern',
    },
  ];

  getAllUsers(role?: 'admin | intern'): any[] {
    if (role) {
      const data = this.users.filter((user) => user.role === role);
      if (data.length === 0) {
        throw new NotFoundException('User not found');
      }
      return data;
    } else {
      if (this.users.length === 0) {
        throw new NotFoundException('User not found');
      }
      return this.users;
    }
  }
  getUserById(id: string) {
    const user = this.users.find((value) => value.userId === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(user: CreateUserDto) {
    const newUser = {
      userId: '5',
      ...user,
    };
    this.users.push(newUser);
  }
  updateUser(
    userId: string,

    newUser: UpdateUserDto,
  ) {
    this.users = this.users.map((user) =>
      user.userId === userId ? { ...user, ...newUser } : user,
    );
    return this.getUserById(userId);
  }

  deleteUser(usrId: string) {
    const deleteUser = this.getUserById(usrId);

    this.users = this.users.filter((user) => user.userId !== usrId);

    return deleteUser;
  }
}
