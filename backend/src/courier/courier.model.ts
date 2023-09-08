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
  // 
  @ApiProperty({
    example: "phone number",
    description: "some description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;
  @ApiProperty({
    example: "true",
    description:"is candidate accepted to courier or not?"
  })
  @Column({ type: DataType.BOOLEAN, defaultValue:false })
  isAccepted: boolean;
}
