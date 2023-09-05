import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { AgentsModule } from "./agents/agents.module";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { Agent } from "./agents/agents.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/posts.model";
import { FilesModule } from "./files/files.module";

@Module({
  controllers: [],
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
      models: [User, Role, Agent, UserRoles, Post],
      autoLoadModels: true,
    }),
    UsersModule,
    AgentsModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
