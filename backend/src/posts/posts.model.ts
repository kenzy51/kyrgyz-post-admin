import {
  Model,
  Table,
  DataType,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ApiBearerAuth, ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}
@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "title", description: "some description" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: "description", description: "some description" })
  @Column({ type: DataType.STRING, allowNull: false })  
  content: string;

  @ApiProperty({ example: "image", description: "some description" })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
