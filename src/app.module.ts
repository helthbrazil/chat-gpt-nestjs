/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ChatGptService } from './services/chat-gpt/chat-gpt.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), HttpModule],
  controllers: [AppController],
  providers: [AppService, ChatGptService],
})
export class AppModule { }
