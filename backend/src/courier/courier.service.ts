import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Courier } from "./courier.model";
import { CreateCourierDto, UpdateCourierDto } from "./dto/create-courier.dto";

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
  async getCourierById(id: number) {
    const courier = await this.courierRepository.findOne({
      where: { id },
      include: {
        all: true,
      },
    });
    if (!courier) {
      throw new HttpException(
        "Cannot find such courier",
        HttpStatus.BAD_REQUEST
      );
    }
    return courier;
  }

  async updateCourier(id: number, updateDto: UpdateCourierDto) {
    const courier = await this.courierRepository.findOne({ where: { id } });
    if (!courier) {
      throw new HttpException("Courier not found", HttpStatus.NOT_FOUND);
    }
    if (updateDto.fullName) {
      courier.fullName = updateDto.fullName;
    }
    if (updateDto.phoneNumber) {
      courier.phoneNumber = updateDto.phoneNumber;
    }
    if (updateDto.telegram) {
      courier.telegram = updateDto.telegram;
    }
    if (updateDto.passportData) {
      courier.passportData = updateDto.passportData;
    }
    if (updateDto.dateOfBirth) {
      courier.dateOfBirth = updateDto.dateOfBirth;
    }
    if (updateDto.yearOfBirth) {
      courier.yearOfBirth = updateDto.yearOfBirth;
    }
    if (updateDto.addressOfLiving) {
      courier.addressOfLiving = updateDto.addressOfLiving;
    }
    if (updateDto.addressByPropise) {
      courier.addressByPropise = updateDto.addressByPropise;
    }
    if (updateDto.inn) {
      courier.inn = updateDto.inn;
    }
    if (updateDto.numberOfPassport) {
      courier.numberOfPassport = updateDto.numberOfPassport;
    }
    if (updateDto.whoPassport) {
      courier.whoPassport = updateDto.whoPassport;
    }
    if (updateDto.dateOfGivenPassport) {
      courier.dateOfGivenPassport = updateDto.dateOfGivenPassport;
    }
    if (updateDto.citizenShip) {
      courier.citizenShip = updateDto.citizenShip;
    }
    if (updateDto.lastWork) {
      courier.lastWork = updateDto.lastWork;
    }
    if (updateDto.image) {
      courier.image = updateDto.image;
    }
    if (updateDto.isUrgent !== undefined) {
      courier.isUrgent = updateDto.isUrgent;
    } else {
      courier.isUrgent = false;
    }
    courier.isAccepted = true;
      
    await courier.save();

    return courier;
  }
}
