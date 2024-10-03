import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './chat.model';
import { User } from './../users/users.model';
import { Message } from './../messages/messages.model';

@Module({
  imports: [SequelizeModule.forFeature([Chat, User, Message])],
  providers: [ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
