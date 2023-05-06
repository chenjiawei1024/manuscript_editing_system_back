import { Injectable } from '@nestjs/common';
import { CreateShareFolderDto } from './dto/create-share-folder.dto';
import { UpdateShareFolderDto } from './dto/update-share-folder.dto';

@Injectable()
export class ShareFolderService {
  create(createShareFolderDto: CreateShareFolderDto) {
    return 'This action adds a new shareFolder';
  }

  findAll() {
    return `This action returns all shareFolder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shareFolder`;
  }

  update(id: number, updateShareFolderDto: UpdateShareFolderDto) {
    return `This action updates a #${id} shareFolder`;
  }

  remove(id: number) {
    return `This action removes a #${id} shareFolder`;
  }
}
