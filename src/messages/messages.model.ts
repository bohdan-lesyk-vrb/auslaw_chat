import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './../users/users.model';
import { Chat } from 'src/chats/chat.model';

@Table
export class Message extends Model<Message> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Chat)
  @Column(DataType.INTEGER)
  chatId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  senderId: number;

  @Column(DataType.STRING)
  content: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User)
  sender: User;
}
