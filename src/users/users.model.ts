import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  DataType,
  Default,
} from 'sequelize-typescript';
import { Chat } from './../chats/chat.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'offline',
  })
  status: string;

  @HasMany(() => Chat)
  chats: Chat[];
}
