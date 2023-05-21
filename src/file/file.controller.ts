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
  findAll(@Query() params: { owner: number; parent_id?: number }) {
    const { owner, parent_id } = params;
    return this.fileService.findAll(owner, parent_id);
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

  @Get('lock/:file_id')
  getFileLockedStatus(@Param('file_id') file_id: number) {
    return this.fileService.getFileLockedStatus(+file_id);
  }

  @Patch('lock/:file_id')
  lockFile(@Param('file_id') file_id: number) {
    return this.fileService.lockFile(+file_id);
  }

  @Patch('unlock/:file_id')
  unlockFile(@Param('file_id') file_id: number) {
    return this.fileService.unlockFile(+file_id);
  }
}
