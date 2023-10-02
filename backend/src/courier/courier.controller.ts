import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateCourierDto, UpdateCourierDto } from "./dto/create-courier.dto";
import { CourierService } from "./courier.service";
@ApiTags("Couriers")
@Controller("courier")
export class CourierController {
  constructor(private courierService: CourierService) {}

  @Post()
  create(@Body() dto: CreateCourierDto) {
    return this.courierService.createCourier(dto);
  }

  @Get()
  getAll() {
    return this.courierService.getAllCouriers();
  }

  @Get("/:id")
  getUserById(@Param("id") id: number) {
    return this.courierService.getCourierById(id);
  }
  // UPDATE CANDIDATE TO COURIER
  @Put("/:id")
  updateCourier(
    @Param("id") id: number,
    @Body() updateCourierDto: UpdateCourierDto
  ) {
    return this.courierService.updateCourier(id, updateCourierDto);
  }
  // 
  @Delete("/:id")
  deleteCourier(@Param("id") id:number){
    return this.courierService.deleteCourier(id)
  }
}
