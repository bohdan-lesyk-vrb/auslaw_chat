import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { Message } from './../messages/messages.model';
import { MessageDto } from './../messages/dto/create';
import { Op } from 'sequelize';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  // Створюємо новий чат
  async createChat(users: string[]): Promise<Chat> {
    const chat = await this.chatModel.create({ users });
    return chat;
  }

  // Отримуємо всі чати користувача
  async findUserChats(userId: string): Promise<Chat[]> {
    return this.chatModel.findAll({
      where: { users: { [Op.contains]: [userId] } }, // Умова для користувача
      include: [Message],
    });
  }

  // Створюємо нове повідомлення
  async createMessage(messageDto: MessageDto): Promise<Message> {
    const message = await this.messageModel.create({
      chatId: messageDto.chatId,
      senderId: messageDto.senderId,
      content: messageDto.content,
    });
    return message;
  }

  // Отримуємо всі повідомлення чату
  async findChatMessages(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']], // Сортування повідомлень за датою
    });
  }
}
