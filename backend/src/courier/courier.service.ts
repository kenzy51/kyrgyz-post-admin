import { Injectable } from "@nestjs/common";
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
}
