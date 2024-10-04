import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { Chat } from './../chats/chat.model';
import { ChatUser } from 'src/messages/ChatUser.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'offline',
  })
  status: string;

  @BelongsToMany(() => Chat, () => ChatUser)
  chats: Chat[];

  @HasMany(() => ChatUser)
  chatUsers: ChatUser[];
}
