// File实体类
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Folder } from 'src/folder/entities/folder.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { ShareFile } from 'src/share-file/entities/share-file.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  file_id: number;

  @Column()
  file_name: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  last_accessed_at: Date;

  @Column({ default: false })
  is_favorite: boolean;

  @Column({ default: false })
  is_locked: boolean;

  @Column({ default: false })
  is_shared: boolean;

  @Column({ default: '<p>请在此处进行创作~~</p>', length: 5000 })
  content: string;

  @ManyToOne(() => User, (user) => user.files)
  owner: User;

  @ManyToOne(() => Folder, (folder) => folder.files)
  parent: Folder;

  @OneToMany(() => ShareFile, (shareFile) => shareFile.file)
  shared: ShareFile[];

  // @ManyToMany(() => Tag)
  // @JoinTable()
  // tags: Tag[];
  @ManyToMany(() => Tag, (tag) => tag.files)
  tags: Tag[];
}
