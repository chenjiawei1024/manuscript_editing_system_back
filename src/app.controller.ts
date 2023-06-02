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

  @Post('creation/classify')
  createTagClassify(@Body() resq: { question: string }) {
    return askAIQuestion(resq.question, 'classify');
  }

  @Post('creation/img')
  createImg(@Body() resq: { question: string }) {
    console.log('img被触发');
    return this.appService.fetchPhotos(resq.question);
  }
}
