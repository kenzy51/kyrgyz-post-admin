import { Body, Controller, Post } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
  @ApiProperty({description:'Регистрация с получением токена'})
  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
