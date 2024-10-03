import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatsService } from './../chats/chats.service';
import { MessageDto } from './../messages/dto/create';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly chatsService: ChatsService) {}

  // Викликається при підключенні нового клієнта
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // Викликається при відключенні клієнта
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Ініціалізація WebSocket Gateway
  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  // Обробляє подію отримання повідомлення
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, messageDto: MessageDto): Promise<void> {
    // Зберігаємо повідомлення в базу даних через сервіс чатів
    const message = await this.chatsService.createMessage(messageDto);

    // Відправляємо повідомлення всім учасникам чату
    this.server
      .to(messageDto.chatId.toString())
      .emit('receiveMessage', message);
  }

  // Користувач приєднується до конкретного чату (кімнати)
  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: string): void {
    client.join(chatId);
    this.logger.log(`Client ${client.id} joined chat ${chatId}`);
  }

  // Користувач покидає конкретний чат (кімнату)
  @SubscribeMessage('leaveChat')
  handleLeaveChat(client: Socket, chatId: string): void {
    client.leave(chatId);
    this.logger.log(`Client ${client.id} left chat ${chatId}`);
  }
}
