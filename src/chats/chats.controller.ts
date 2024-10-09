import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create';
import { UpdateChatDto } from './dto/update';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  async findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chatsService.findOne(id);
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: number) {
    return this.chatsService.findAllByUserId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const chat = await this.chatsService.remove(id);

    return chat;
  }
}
