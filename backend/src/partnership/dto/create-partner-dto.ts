import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePartnerDto {
  @ApiProperty({ example: "Google INC", description: "Company name" })
  @IsString()
  @Length(1, 255)
  readonly companyName: string;

  @ApiProperty({ example: "director full name", description: "Full name of director" })
  @IsString()
  @Length(1, 255)
  readonly directorFullName: string;

  @ApiProperty({ example: "+996", description: "Phone number" })
  @IsString()
  @Length(1, 20)
  readonly phoneNumber: string;

  @ApiProperty({ example: "email@example.com", description: "Email address" })
  @IsString()
  @Length(1, 255)
  readonly email: string;

  @ApiProperty({ example: "Connection reason", description: "Connection reason" })
  @IsString()
  @Length(1, 255)
  readonly connectReason: string;
}
