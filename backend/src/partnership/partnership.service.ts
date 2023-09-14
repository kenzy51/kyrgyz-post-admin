import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Partner } from './partner.model';
import { CreatePartnerDto } from './dto/create-partner-dto';

@Injectable()
export class PartnershipService {
    constructor(@InjectModel(Partner) private partnerRepository: typeof Partner){}

    async getPartners(){
        const partners = this.partnerRepository.findAll();
        return partners
    }

    async createPartner(dto:CreatePartnerDto){
        const partner = this.partnerRepository.create(dto)
        return partner;
    }
}
