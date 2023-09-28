import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "SUPERADMIN", description: "Role given" })
  readonly value: string;
  @ApiProperty({ example: "6", description: "user id " })
  readonly userId: number;
}
