import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../../users/dtos/create-user.dto';

export class RegisterDto extends CreateUserDto {}
