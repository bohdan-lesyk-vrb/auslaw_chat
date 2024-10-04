import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsArray({ message: 'Users must be an array of strings.' })
  users?: string[];

  @IsOptional()
  @IsString({ message: 'Chat name must be a string.' })
  chatName?: string;
}
