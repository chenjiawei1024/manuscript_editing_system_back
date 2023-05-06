import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get('all')
  findAllSortedByLastAccessedAt() {
    return this.fileService.findAllSortedByLastAccessedAt();
  }

  @Get('favor')
  findAllFavorite() {
    return this.fileService.findAllFavorite();
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.fileService.findAll(+id);
  }

  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.fileService.findByName(name);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileService.findOne(id);
  // }

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
