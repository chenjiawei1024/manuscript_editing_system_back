import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShareFileService } from './share-file.service';
import { CreateShareFileDto } from './dto/create-share-file.dto';
import { UpdateShareFileDto } from './dto/update-share-file.dto';

@Controller('sfile')
export class ShareFileController {
  constructor(private readonly shareFileService: ShareFileService) {}

  @Post()
  create(@Body() createShareFileDto: CreateShareFileDto) {
    return this.shareFileService.create(createShareFileDto);
  }

  @Get()
  findAll() {
    return this.shareFileService.findAll();
  }

  @Get(':id')
  findFilesByReceiverId(@Param('id') id: string) {
    return this.shareFileService.findFilesByReceiverId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShareFileDto: UpdateShareFileDto,
  ) {
    return this.shareFileService.update(+id, updateShareFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shareFileService.remove(+id);
  }
}
