import { IsNotEmpty, IsString, Min } from 'class-validator';

export class createBearkdownDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  date: string;

  @IsString()
  memo: string;
}
