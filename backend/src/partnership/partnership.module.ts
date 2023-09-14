import { Module } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { PartnershipController } from './partnership.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Partner } from './partner.model';

@Module({
  providers: [PartnershipService],
  controllers: [PartnershipController],
  imports:[
    SequelizeModule.forFeature([Partner])
  ],
})
export class PartnershipModule {}
