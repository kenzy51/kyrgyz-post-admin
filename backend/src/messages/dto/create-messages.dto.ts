import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ISender } from "../types/types";
export class CreateMessageDto {
  @ApiProperty({ example: "name", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly name: string;
  //
  @ApiProperty({ example: "+996700102030", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly phoneNumber: string;
  //
  @ApiProperty({ example: "message", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly message: string;
  //
  @ApiProperty({ example: "address", description: "description" })
  @IsString({ message: "It should be a string" })
  readonly address: string;
  //
  @ApiProperty({ example: "region", description: "description" })
  readonly region: string;

  @ApiProperty({
    example: {
      who: "John Doe",
      locality: "City",
      address: "123 Main St",
      phoneNumber: "+99640304032",
      message: "Hello, this is a message",
    },
    description: "description",
  })
  readonly sender?: ISender;
}

export class UpdateMessageDto extends CreateMessageDto {
  @ApiProperty({ example: "+Chuy or batken", description: "Chuy" })
  @IsString({ message: "It should be a string" })
  readonly region: string;
  //
  @ApiProperty({ example: "Courier Id", description: "Courier Id" })
  readonly courierId: number;
}
