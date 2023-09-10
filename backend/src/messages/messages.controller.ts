import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MessagesService } from "./messages.service";
import { CreateMessageDto, UpdateMessageDto } from "./dto/create-messages.dto";
import { MakeMessageReadDto } from "./dto/makeRead-message.dto";
@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  // CREATION OF MESSAGE
  @Post()
  create(@Body() messageDto: CreateMessageDto) {
    return this.messageService.createMessage(messageDto);
  }
  // GETTING MESSAGES
  @Get()
  getAll() {
    return this.messageService.getAllMessages();
  }

  @ApiOperation({ summary: "Назначить сообщение прочитанным" })
  @ApiResponse({ status: 200 })
  @Post("/read")
  makeMessageRead(@Body() dto: MakeMessageReadDto) {
    return this.messageService.makeReadMessage(dto);
  }
  //UPDATING MESSAGE
  @Put("/:id")
  updateUser(
    @Param("id") id: number,
    @Body() updateMessageDto: UpdateMessageDto
  ) {
    return this.messageService.updateMessage(id, updateMessageDto);
  }
}
