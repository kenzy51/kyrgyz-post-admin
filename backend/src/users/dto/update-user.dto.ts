import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto{
    @ApiProperty({example:'user@email.com', description:'description'})
    readonly email:string;
    @ApiProperty({example:'password.com', description:'description'})
    readonly password:string;
}