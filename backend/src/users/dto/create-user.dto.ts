import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({ example: "usernameLogin", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly login: string;
  @ApiProperty({ example: "password.com", description: "description" })
  @IsString({ message: "It should be a string" })
  @Length(2, 10)
  readonly password: string;
}
