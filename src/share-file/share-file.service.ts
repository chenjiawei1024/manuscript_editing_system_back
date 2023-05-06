import { Injectable } from '@nestjs/common';
import { CreateShareFileDto } from './dto/create-share-file.dto';
import { UpdateShareFileDto } from './dto/update-share-file.dto';

@Injectable()
export class ShareFileService {
  create(createShareFileDto: CreateShareFileDto) {
    return 'This action adds a new shareFile';
  }

  findAll() {
    return `This action returns all shareFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shareFile`;
  }

  update(id: number, updateShareFileDto: UpdateShareFileDto) {
    return `This action updates a #${id} shareFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} shareFile`;
  }
}
