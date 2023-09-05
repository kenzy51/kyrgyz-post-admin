import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  // ЛОГИН

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  // РЕГИСТРАЦИЯ
  async registration(userDto: CreateUserDto) {
    const { email, password } = userDto;
    const candidate = await this.userService.getUsersByEmail(email);
    if (candidate) {
      throw new HttpException(
        "User with such email already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  //ГЕНЕРАЦИЯ ТОКЕНА
  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  //
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: "incorrect email or password" });
  }
}
