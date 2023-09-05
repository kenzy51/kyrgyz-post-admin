import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}
  @ApiOperation({ description: "Creatrion of Role" })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ description: "get by value of Role" })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
  
  @ApiOperation({ description: "Get all roles" })
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
