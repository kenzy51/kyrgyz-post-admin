import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "./messages.model";
import { CreateMessageDto, UpdateMessageDto } from "./dto/create-messages.dto";
import { MakeMessageReadDto } from "./dto/makeRead-message.dto";
import { Courier } from "src/courier/courier.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message
  ) {}
  async createMessage(dto: CreateMessageDto) {
    const message = this.messageRepository.create(dto);
    return message;
  }
  //

  async getAllMessages() {
    const message = this.messageRepository.findAll({
      include: Courier,
    });
    return message;
  }

  async makeReadMessage(dto: MakeMessageReadDto) {
    const message = await this.messageRepository.findByPk(dto.messageId);
    if (!message) {
      throw new HttpException("Сообщение не найдено", HttpStatus.NOT_FOUND);
    }
    message.read = true;
    await message.save();
    return message;
  }

  // UPDATE SERVICE 
  async updateMessage(id: number, dto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new HttpException("Message was not found", HttpStatus.NOT_FOUND);
    }
    if (dto.name) {
      message.name = dto.name;
    }
    if (dto.phoneNumber) {
      message.phoneNumber = dto.phoneNumber;
    }
    if (dto.message) {
      message.message = dto.message;
    }
    if (dto.address) {
      message.address = dto.address;
    }
    if (dto.region) {
      message.region = dto.region;
    }
    if (dto.courierId) {
      message.courierId = dto.courierId;
    }
    message.read = true;
    await message.save();
    return message
  }


  
}
