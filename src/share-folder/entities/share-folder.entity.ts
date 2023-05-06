// ShareFolder实体类
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Folder } from 'src/folder/entities/folder.entity';

@Entity()
export class ShareFolder {
  @PrimaryGeneratedColumn()
  share_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  sharer: User;

  @ManyToOne(() => User, (user) => user.user_id)
  receiver: User;

  @ManyToOne(() => Folder, (folder) => folder.shared)
  folder: Folder;
}
