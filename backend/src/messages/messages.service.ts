import { Injectable,HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "./messages.model";
import { CreateMessageDto } from "./dto/create-messages.dto";
import { MakeMessageReadDto } from "./dto/makeRead-message.dto";

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepository: typeof Message) {}
  async createMessage(dto: CreateMessageDto) {
    const message = this.messageRepository.create(dto);
    return message;
  }
//   


  async getAllMessages() {
    const message = this.messageRepository.findAll();
    return message;
  }


  async makeReadMessage(dto:MakeMessageReadDto){
    const message = await this.messageRepository.findByPk(dto.messageId)
    if(!message){
      throw new HttpException("Сообщение не найдено", HttpStatus.NOT_FOUND);
    }
    message.read = true;
    await message.save();
    return message;
}

}
