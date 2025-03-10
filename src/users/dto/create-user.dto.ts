import { IsString, IsNotEmpty, IsEnum, IsEmail } from 'class-validator';

enum UserRole {
  INTERN = 'intern',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
