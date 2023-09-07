import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Courier } from './courier.model';

@Module({
  providers: [CourierService],
  controllers:[CourierController],
  imports:[
    SequelizeModule.forFeature([Courier])
  ],
  exports:[CourierService]
})
export class CourierModule {

}
