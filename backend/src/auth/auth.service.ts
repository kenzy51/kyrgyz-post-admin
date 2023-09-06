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
    const { login, password } = userDto;
    const candidate = await this.userService.getUserByLogin(login);
    if (candidate) {
      throw new HttpException(
        "User with such email already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userService.createSuperAdmin({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  //ГЕНЕРАЦИЯ ТОКЕНА
  async generateToken(user: User) {
    const payload = { login: user.login, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  //
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: "incorrect email or password" });
  }
}
