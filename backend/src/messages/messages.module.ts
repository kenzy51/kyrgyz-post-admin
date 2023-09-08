import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Courier } from 'src/courier/courier.model';
import { CourierModule } from 'src/courier/courier.module';

@Module({
  controllers: [MessagesController],
  providers:[MessagesService],
  imports:[
    SequelizeModule.forFeature([Message,Courier]),
    CourierModule
  ],
  exports:[MessagesService]
})
export class MessagesModule {}
