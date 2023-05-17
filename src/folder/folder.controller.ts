import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { ReqUserDto } from '../user/dto/req-user.dto';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Get(':id')
  findAll(@Param('id') pid: number, @Request() req: ReqUserDto) {
    return this.folderService.findAll(+req.user.user_id, pid);
  }

  @Get('search/:name')
  findByName(@Param('name') name: string, @Request() req: ReqUserDto) {
    return this.folderService.findByName(name, +req.user.user_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.folderService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.remove(+id);
  }
}
