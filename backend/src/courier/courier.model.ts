import {
  Model,
  Table,
  DataType,
  Column,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface CouriersCreationAttrs {
  fullName: string;
  phoneNumber: string;
}

@Table({ tableName: "couriers" })
export class Courier extends Model<Courier, CouriersCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Fullname", description: "some description" })
  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @ApiProperty({
    example: "phone number",
    description: "some description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @ApiProperty({
    example: "true",
    description: "is candidate accepted to courier or not?",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAccepted: boolean;

// telegram nickname
  @ApiProperty({
    example: "@nonNPX",
    description: "is candidate accepted to courier or not?",
  })
  @Column({ type: DataType.STRING })
  telegram?: string;


  // Add the missing properties here

  @ApiProperty({
    example: "passport data",
    description: "Паспортные данные",
  })
  @Column({ type: DataType.STRING })
  passportData: string;

  @ApiProperty({ example: "24.03.01", description: "Дата рождения" })
  @Column({ type: DataType.STRING })
  dateOfBirth: string;

  @ApiProperty({ example: "24.03.01", description: "год рождения" })
  @Column({ type: DataType.STRING })
  yearOfBirth: string;

  @ApiProperty({
    example: "bishkek, bokonbaev 30-1",
    description: "Адрес проживания",
  })
  @Column({ type: DataType.STRING })
  addressOfLiving: string;

  @ApiProperty({
    example: "bishkek, bokonbaev 30-1",
    description: "Адрес по прописке",
  })
  @Column({ type: DataType.STRING })
  addressByPropise: string;

  @ApiProperty({ example: "98989832923847", description: "ИНН по части" })
  @Column({ type: DataType.STRING })
  inn: string;

  @ApiProperty({ example: "23123412", description: "Номер паспорта" })
  @Column({ type: DataType.STRING })
  numberOfPassport: string;

  @ApiProperty({
    example: "Kyrgyz post by BIshkek",
    description: "Кем выдан пасспорт",
  })
  @Column({ type: DataType.STRING })
  whoPassport: string;

  @ApiProperty({ example: "23.11.05", description: "Дата выдачи паспорта" })
  @Column({ type: DataType.STRING })
  dateOfGivenPassport: string;

  @ApiProperty({ example: "english", description: "Гражданство" })
  @Column({ type: DataType.STRING })
  citizenShip: string;

  @ApiProperty({
    example: "Discovery studio",
    description: "Место последней работы",
  })
  @Column({ type: DataType.STRING })
  lastWork: string;
// 
  @ApiProperty({
    example: "image.png",
    description: "ФОТОГРАФИЯ",
  })
  @Column({ type: DataType.STRING })
  image: string;
// 
@ApiProperty({
  example:'false',
  description:'срочный ли курьер'
})
@Column({type:DataType.BOOLEAN})
isUrgent:boolean;
// 
@ApiProperty({
  example:'Chuy',
  description:'Регион сервиса'
})
@Column({type:DataType.STRING})
regionOfService:string;
}
