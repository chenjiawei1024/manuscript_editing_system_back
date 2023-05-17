import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ReqUserDto } from '../user/dto/req-user.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get('all')
  findAllSortedByLastAccessedAt(@Request() req: ReqUserDto) {
    return this.fileService.findAllSortedByLastAccessedAt(+req.user.user_id);
  }

  @Get('favor')
  findAllFavorite(@Request() req: ReqUserDto) {
    return this.fileService.findAllFavorite(+req.user.user_id);
  }

  @Get()
  findAll(@Query() params: { owner: number; parent?: number }) {
    const { owner, parent } = params;
    return this.fileService.findAll(owner, parent);
  }

  @Get('search/:name')
  findByName(@Param('name') name: string, @Request() req: ReqUserDto) {
    return this.fileService.findByName(name, +req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findById(+id);
  }

  @Patch(':id/favor')
  async toggleFavorite(@Param('id') id: number) {
    return this.fileService.toggleFavorite(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
