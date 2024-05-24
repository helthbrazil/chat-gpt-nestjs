import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ChatGptService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = this.configService.get<string>('OPENAI_API_KEY');

  constructor(private readonly httpService: HttpService,
    private configService: ConfigService
  ) { }

  async getHello(text: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'Você é um assistente útil.' },
              { role: 'user', content: text },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKey}`,
            },
          },
        ),
      );

      const message = response.data.choices[0].message.content;
      return message;
    } catch (error) {
      console.error('Erro ao chamar a API do OpenAI:', error);
      return 'Houve um problema ao se comunicar com a API do OpenAI.';
    }
  }

}
