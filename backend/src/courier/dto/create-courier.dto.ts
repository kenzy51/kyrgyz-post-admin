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

  @ApiProperty({ example: "@nonNPC", description: "nickname in tg" })
  readonly telegram?: string;
}

export class UpdateCourierDto extends CreateCourierDto {
  // НЕОБЯЗАТЕЛЬНЫЕ
  @ApiProperty({ example: "passport data", description: "Паспортные данные" })
  readonly passportData?: string;
  @ApiProperty({ example: "24.03.01", description: "Дата рождения" })
  readonly dateOfBirth?: string;
  @ApiProperty({ example: "24.03.01", description: "год рождения" })
  readonly yearOfBirth?: string;
  @ApiProperty({
    example: "bishkek, bokonbaev 30-1",
    description: "Адрес проживания",
  })
  readonly addressOfLiving?: string;
  @ApiProperty({
    example: "bishkek, bokonbaev 30-1",
    description: "Адрес по прописке",
  })
  readonly addressByPropise: string;
  @ApiProperty({ example: "98989832923847", description: "ИНН по части" })
  readonly inn?: string;
  @ApiProperty({ example: "23123412", description: "Номер паспорта" })
  readonly numberOfPassport?: string;
  @ApiProperty({
    example: "Kyrgyz post by BIshkek",
    description: "Кем выдан пасспорт",
  })
  readonly whoPassport?: string;
  @ApiProperty({ example: "23.11.05", description: "Дата выдачи паспорта" })
  readonly dateOfGivenPassport?: string;
  @ApiProperty({ example: "english", description: "Гражданство" })
  readonly citizenShip?: string;
  @ApiProperty({
    example: "Discovery studio",
    description: "Место последней работы",
  })
  readonly lastWork?: string;
  //
  @ApiProperty({
    example: "image.png",
    description: "image of this",
  })
  readonly image?: string;

  //
  @ApiProperty({
    example: 'false',
    description: "срочный ли курьер",
  })
  readonly isUrgent?: boolean;

  //
  @ApiProperty({
    example: 'Chuy',
    description: "Регион сервиса",
  })
  readonly regionOfService?: string;


}
