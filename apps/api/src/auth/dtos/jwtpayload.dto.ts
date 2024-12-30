import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class JwtPayload {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
