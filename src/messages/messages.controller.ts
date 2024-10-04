import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create';
import { UpdateMessageDto } from './dto/update';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.messagesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return await this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deletedMessage = await this.messagesService.remove(id);

    return deletedMessage;
  }
}
