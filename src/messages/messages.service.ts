import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create';
import { UpdateMessageDto } from './dto/update';
import { Message } from './messages.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  async create(messageData: {
    chatId: number;
    senderId: number;
    content: string;
  }) {
    return this.messageModel.create(messageData);
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.findAll();
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageModel.findByPk(id);

    if (!message) throw new NotFoundException('Message not found');

    return message;
  }

  async findAllByChatId(chatId: number): Promise<Message[]> {
    return this.messageModel.findAll({
      where: {
        chatId: chatId,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id);

    await message.update(updateMessageDto, {
      fields: ['content', 'senderId', 'chatId'],
    });

    return message.reload();
  }

  async remove(id: number): Promise<Message> {
    const message = await this.findOne(id);
    await message.destroy();

    return message;
  }
}
