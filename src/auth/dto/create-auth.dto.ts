import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class createAuthDto {
  @IsNotEmpty()
  @IsString()
  @Min(5)
  @Max(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Min(5)
  @Max(20)
  password: string;
}
