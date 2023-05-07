import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { askAIQuestion } from './utils/openAI';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('creation')
  creationQuestion(@Body() resq: { question: string }) {
    return askAIQuestion(resq.question);
  }

  @Post('creation/title')
  createTitlePrompt(@Body() resq: { question: string }) {
    return askAIQuestion(resq.question, 'title');
  }

  @Post('creation/word')
  createWordReplacement(@Body() resq: { question: string }) {
    return askAIQuestion(resq.question, 'word');
  }

  @Post('creation/typo')
  createTypoCorrection(@Body() resq: { question: string }) {
    return askAIQuestion(resq.question, 'typo');
  }
}
