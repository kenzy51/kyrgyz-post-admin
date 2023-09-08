import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCourierDto } from './dto/create-courier.dto';
import { CourierService } from './courier.service';
@ApiTags('Couriers')
@Controller('courier')
export class CourierController {
    constructor(private courierService:CourierService) {}

    @Post()
    create(@Body() dto:CreateCourierDto){
        return this.courierService.createCourier(dto)
    }

    @Get()
    getAll(){
        return this.courierService.getAllCouriers()
    }

    @Get("/:id")
    getUserById(@Param("id") id: number) {
      return this.courierService.getCourierById(id);
    }
    
}
