import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create';
import { UpdateChatDto } from './dto/update';
import { Op } from 'sequelize';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatModel.create(createChatDto);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.findAll();
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.chatModel.findByPk(id);

    if (!chat) throw new NotFoundException('Chat not found');

    return chat;
  }

  async findAllByUserId(userId: number): Promise<Chat[]> {
    return this.chatModel.findAll({
      where: {
        users: {
          [Op.contains]: [userId],
        },
      },
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.findOne(id);

    return chat.update(updateChatDto);
  }

  async remove(id: number): Promise<Chat> {
    const chat = await this.findOne(id);
    await chat.destroy();

    return chat;
  }
}
