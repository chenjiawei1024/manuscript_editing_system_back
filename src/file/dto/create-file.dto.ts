import { Folder } from 'src/folder/entities/folder.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateFileDto {
  file_name?: string;
  tags?: DeepPartial<Tag>[];
  owner?: DeepPartial<User>;
  parent?: DeepPartial<Folder>;
  content?: string;
}
