import { IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(100)
  age: number;

  @IsString()
  gender: string;

  @IsBoolean()
  hasProblems: boolean;
}
