import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './../users/users.model';
import { Chat } from './../chats/chat.model';

@Table
export class ChatUser extends Model<ChatUser> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Chat)
  chat: Chat;
}
