import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agent } from './agents.model';

@Module({
  providers: [AgentsService],
  controllers: [AgentsController],
  imports:[
    SequelizeModule.forFeature([Agent])
  ]
})
export class AgentsModule {}
