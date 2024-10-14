import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: {
      chatId: number;
      userId: number;
      text: string;
    },
  ) {
    const { chatId, userId, text } = payload;

    const message = await this.messagesService.create({
      chatId: chatId,
      senderId: userId,
      content: text,
    });

    this.server.to(chatId.toString()).emit('receiveMessage', message);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, chatId: number) {
    client.join(chatId.toString());
  }
}
