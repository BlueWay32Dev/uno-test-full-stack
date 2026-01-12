import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @Matches(/^[0-9]+-[0-9Kk]$/, {
    message: 'RUN must be in format XXXXXXXX-X (e.g., 12345678-9)',
  })
  run: string;
}
