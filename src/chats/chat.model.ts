import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './../users/users.model';
import { Message } from './../messages/messages.model';

@Table
export class Chat extends Model {
  @Column
  type: string;

  @HasMany(() => Message)
  messages: Message[];

  @BelongsToMany(() => User, 'chat_participants', 'chatId', 'userId')
  participants: User[];
}
