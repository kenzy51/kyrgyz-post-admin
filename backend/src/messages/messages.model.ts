import {
  Model,
  Table,
  DataType,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Courier } from "src/courier/courier.model";
import { ISender } from "./types/types";
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

  //
  @ApiProperty({
    example: "Chuy or Batken",
    description: "Selected region shown here",
  })
  //
  @Column({ type: DataType.STRING, defaultValue: null })
  region: string;
  //
  @ApiProperty({
    example: "Roll Or Pack",
    description: "Selected type of message",
  })
  //
  @Column({ type: DataType.STRING, defaultValue: null })
  type: string;
  //

  @ApiProperty({
    example: "Айба отпраавитель",
    description: "Who sent message",
  })
  //
  @Column({ type: DataType.JSON, defaultValue: null })
  sender?: ISender;
  //

  //
  @ForeignKey(() => Courier)
  @Column({ type: DataType.INTEGER })
  courierId: number;

  @BelongsTo(() => Courier)
  courier: Courier;
}
