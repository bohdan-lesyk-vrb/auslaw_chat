import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Chat } from './../chats/chat.model';
import { User } from './../users/users.model';

@Table
export class Message extends Model {
  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  senderId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @Column
  isEdited: boolean;
}
