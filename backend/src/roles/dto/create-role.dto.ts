import { ApiProperty } from "@nestjs/swagger";
import {IsString} from 'class-validator';
export class CreateRoleDto{
    @ApiProperty({example:'ADMIN', description:'Создание админа'})
    @IsString({message:'MUST BE A STRING'})
     readonly value:string;
    @IsString({message:'MUST BE A STRING'})
    @ApiProperty({example:'Description', description:'описание Создание админа'})
     readonly description:string;
}