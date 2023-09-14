import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PartnershipService } from "./partnership.service";
import { CreatePartnerDto } from "./dto/create-partner-dto";

@ApiTags("partners")
@Controller("partnership")
export class PartnershipController {
  constructor(private partnerService: PartnershipService) {}
  @Post()
  createPartner(@Body() dto: CreatePartnerDto) {
    return this.partnerService.createPartner(dto);
  }

  @Get()
  getAll() {
    const partners =this.partnerService.getPartners();
    return partners
    
  }
}
