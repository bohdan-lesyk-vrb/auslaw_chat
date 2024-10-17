import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/users.model';
import { Message } from '../messages.model';

@Table
export class MessageStatus extends Model<MessageStatus> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  messageId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isDelivered: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRead: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  readAt: Date | null;
}
