import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShareFolderService } from './share-folder.service';
import { CreateShareFolderDto } from './dto/create-share-folder.dto';
import { UpdateShareFolderDto } from './dto/update-share-folder.dto';

@Controller('sfolder')
export class ShareFolderController {
  constructor(private readonly shareFolderService: ShareFolderService) {}

  @Post()
  create(@Body() createShareFolderDto: CreateShareFolderDto) {
    return this.shareFolderService.create(createShareFolderDto);
  }

  @Get()
  findAll() {
    return this.shareFolderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shareFolderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShareFolderDto: UpdateShareFolderDto,
  ) {
    return this.shareFolderService.update(+id, updateShareFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shareFolderService.remove(+id);
  }
}
