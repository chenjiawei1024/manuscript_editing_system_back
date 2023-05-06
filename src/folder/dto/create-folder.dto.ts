import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { Folder } from '../entities/folder.entity';

export class CreateFolderDto {
  folder_name: string;
  owner: DeepPartial<User>;
  parent?: DeepPartial<Folder>;
}
