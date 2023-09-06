import { ApiProperty } from "@nestjs/swagger";

export class MakeMessageReadDto{
    @ApiProperty({example:1,description:'ID юзера'})
    readonly messageId:number;
 
}