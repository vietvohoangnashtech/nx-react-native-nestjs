import { IsString, IsOptional } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
