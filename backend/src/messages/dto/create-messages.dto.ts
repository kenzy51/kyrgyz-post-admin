import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
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
}

export class UpdateMessageDto extends CreateMessageDto{
  @ApiProperty({ example: "+Chuy or batken", description: "Chuy" })
  @IsString({ message: "It should be a string" })
  readonly region: string;
   // 
   @ApiProperty({ example: "Courier Id", description: "Courier Id" })
   readonly courierId: number; 

}
