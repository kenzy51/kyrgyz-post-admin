import { Body, Controller, Post, Get, Param, Delete,Put, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  //
  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  //
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: User })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  @ApiBearerAuth('access-token') 
  getAll() {
    return this.usersService.getAllUsers();
  }

  //ВЫДАТЬ РОЛЬ
  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  @ApiBearerAuth('access-token') 
  addRole(@Body() dto:AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  //Забанить юзера
  @ApiOperation({ summary: "Забанить юзера" })
  @ApiResponse({ status: 200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  @ApiBearerAuth('access-token') 
  banUser(@Body() dto:BanUserDto) {
    return this.usersService.banUser(dto);
  }
  //
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.usersService.getUserById(id);
  }
  
  @Delete("/:id")
  deleteUser(@Param("id") id: number) {
    return this.usersService.deleteUserById(id);
  }
  @Put("/:id")
  updateUser(@Param("id") id: number, @Body() updateUserDto:UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
