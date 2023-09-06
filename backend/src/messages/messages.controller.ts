import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MakeMessageReadDto } from './dto/makeRead-message.dto';
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService) {}
    @Post()
    create(@Body() messageDto:CreateMessageDto){
        return this.messageService.createMessage(messageDto)
    }

    @Get()
    getAll(){
        return this.messageService.getAllMessages()
    }

    @ApiOperation({ summary: "Назначить сообщение прочитанным" })
    @ApiResponse({ status: 200 })
    @Post("/read")
    banUser(@Body() dto: MakeMessageReadDto) {
      return this.messageService.makeReadMessage(dto);
    }
}
