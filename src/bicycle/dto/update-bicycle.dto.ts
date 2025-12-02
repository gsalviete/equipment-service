import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateBicycleDto {
  @IsNumber()
  @IsOptional()
  number?: number;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  year?: string;
}
