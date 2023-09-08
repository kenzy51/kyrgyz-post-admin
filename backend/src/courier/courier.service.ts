import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Courier } from "./courier.model";
import { CreateCourierDto } from "./dto/create-courier.dto";

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(Courier) private courierRepository: typeof Courier
  ) {}
  //Creation
  async createCourier(dto: CreateCourierDto) {
    const courier = this.courierRepository.create(dto);
    return courier;
  }
  //
  async getAllCouriers() {
    const courier = this.courierRepository.findAll();
    return courier;
  }
  // GET COURIER BY ID;
  async getCourierById(id:number){
    const courier = await this.courierRepository.findOne({
      where:{id},
      include:{
        all:true
      },
    })
    if(!courier){
      throw new HttpException('Cannot find such courier', HttpStatus.BAD_REQUEST);
    }
    return courier;
  }
}
