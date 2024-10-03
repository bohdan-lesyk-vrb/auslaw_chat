import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessageDto } from './../messages/dto/create';
import { Chat } from './chat.model';
import { Message } from './../messages/messages.model';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body('users') users: string[]): Promise<Chat> {
    return this.chatsService.createChat(users);
  }

  @Get('user/:userId')
  async findUserChats(@Param('userId') userId: string): Promise<Chat[]> {
    return this.chatsService.findUserChats(userId);
  }

  @Post('message')
  async createMessage(@Body() messageDto: MessageDto): Promise<Message> {
    return this.chatsService.createMessage(messageDto);
  }

  @Get(':chatId/messages')
  async findChatMessages(@Param('chatId') chatId: string): Promise<Message[]> {
    return this.chatsService.findChatMessages(chatId);
  }
}
