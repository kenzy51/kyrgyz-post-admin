import {
  Model,
  Table,
  DataType,
  Column,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
interface MessageCreationAttrs {
  name: string;
  phoneNumber: string;
  message: string;
  address: string;
}
@Table({ tableName: "messages" })
export class Message extends Model<Message, MessageCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  //
  @ApiProperty({ example: "Kanat", description: "some description" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  //
  @ApiProperty({
    example: "+700901020",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;
  //

  @ApiProperty({
    example: "messageItself",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  message: string;
  //
  //
  @ApiProperty({
    example: "messageItself",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;
  //

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  read: boolean;

}
