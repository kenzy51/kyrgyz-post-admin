import { Model, Table, DataType, Column, BelongsToMany, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Post } from "src/posts/posts.model";
interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "some@email.com", description: "some description" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({
    example: "hashedPassword123_",
    description: "some description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
  
  @BelongsToMany(()=> Role, ()=> UserRoles)
  roles:Role[];

  @HasMany(()=> Post)
  posts:Post[];
}