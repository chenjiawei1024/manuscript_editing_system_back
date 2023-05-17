// Folder实体类
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { File } from '../../file/entities/file.entity';
import { ShareFolder } from 'src/share-folder/entities/share-folder.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  folder_id: number;

  @Column()
  folder_name: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  last_accessed_at: Date;

  @ManyToOne(() => User, (user) => user.folders)
  owner: User;

  @ManyToOne(() => Folder, (folder) => folder.children)
  parent: Folder;

  @OneToMany(() => Folder, (folder) => folder.parent)
  children: Folder[];

  @OneToMany(() => File, (file) => file.parent)
  files: File[];

  @OneToMany(() => ShareFolder, (shareFolder) => shareFolder.folder)
  shared: ShareFolder[];
}
