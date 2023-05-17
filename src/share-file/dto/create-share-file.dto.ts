import { DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';
// import { File } from 'src/file/entities/file.entity';
// import { ShareFile } from '../entities/share-file.entity';

export class CreateShareFileDto {
  file_name: string;
  sharer_id: number;
  receiver_name: string;
  parent: number;
}
