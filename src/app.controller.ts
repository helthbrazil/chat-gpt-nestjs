/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatGptService } from './services/chat-gpt/chat-gpt.service';

@Controller()
export class AppController {
  constructor(private readonly chatGptService: ChatGptService) { }

  @Get()
  getHello(@Query('text') text: string): Promise<string> {
    return this.chatGptService.getHello(text);
  }
}
