import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  chatId: number;

  @IsInt()
  senderId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
