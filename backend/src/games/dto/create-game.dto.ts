import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  run: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  errors: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  successes: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  totalMoves: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  timeSeconds?: number;
}
