import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto{
    @ApiProperty({example:1,description:'ID юзера'})
    readonly userId:number;
    @ApiProperty({example:'Reason for ban',description:'Причина бана'})
    readonly banReason?:string;
}