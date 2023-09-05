import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto{
    @ApiProperty({example:'ulogincom', description:'description'})
    readonly login:string;
    @ApiProperty({example:'password.com', description:'description'})
    readonly password:string;
}