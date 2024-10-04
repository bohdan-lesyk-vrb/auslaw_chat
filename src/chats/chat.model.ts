import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { ChatUser } from 'src/messages/ChatUser.model';

@Table
export class Chat extends Model<Chat> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.ARRAY(DataType.STRING))
  users: string[];

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.STRING)
  chatName?: string;

  @HasMany(() => ChatUser)
  chatUsers?: ChatUser[];
}
