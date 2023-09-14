import {
  Model,
  Table,
  DataType,
  Column,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { IsPhoneNumber } from "class-validator";
interface PartnerCreationAttrs {
  companyName: string;
  directorFullName: string;
  phoneNumber: string;
  email: string;
  connectReason: string;
}
@Table({ tableName: "partner" })
export class Partner extends Model<Partner, PartnerCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Google Apple net", description: "some description" })
  @Column({ type: DataType.STRING })
  companyName: string;

  @ApiProperty({
    example: "Name Surname",
    description: "some description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  directorFullName: string;

  //
  @ApiProperty({
    example: "Phone number",
    description: "some description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  //
  @ApiProperty({
    example: "naz@gmail.com",
    description: "Email about",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  //
  @ApiProperty({
    example: "To better communication",
    description: "Reason why we should connect ahah",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  connectReason: string;
}
