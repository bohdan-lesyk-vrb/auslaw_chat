import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { ChatUser } from './messages/ChatUser.model';
import { User } from './users/users.model';
import { Chat } from './chats/chat.model';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: process.env.NODE_ENV !== 'production',
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    SequelizeModule.forFeature([ChatUser, User, Chat]),
    AuthModule,
    UsersModule,
    MessagesModule,
    ChatsModule,
  ],
})
export class AppModule {}
