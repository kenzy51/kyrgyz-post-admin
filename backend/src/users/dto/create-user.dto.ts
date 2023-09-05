import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({ example: "user@email.com", description: "description" })
  @IsString({ message: "It should be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;
  @ApiProperty({ example: "password.com", description: "description" })
  @IsString({ message: "It should be a string" })
  @Length(2, 10)
  readonly password: string;
}
