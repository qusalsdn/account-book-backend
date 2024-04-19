import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class createBearkdownDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  date: string;

  @IsString()
  memo: string;
}
