import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { Message } from "./messages/messages.model";
import { CourierController } from './courier/courier.controller';
import { CourierModule } from './courier/courier.module';
import { Courier } from "./courier/courier.model";

@Module({
  controllers: [CourierController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Role, UserRoles,Message,Courier],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    MessagesModule,
    CourierModule,
  ],
})
export class AppModule {}
