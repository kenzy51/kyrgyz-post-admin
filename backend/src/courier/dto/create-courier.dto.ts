import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";
export class CreateCourierDto {
  @ApiProperty({ example: "userNameCourier", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly fullName: string;
  @ApiProperty({ example: "+996500403020", description: "description" })
  @IsString({ message: "It should be a string" })
  @IsPhoneNumber()
  readonly phoneNumber: string;
}
