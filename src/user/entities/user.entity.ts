// User实体类
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Folder } from '../../folder/entities/folder.entity';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_time: Date;

  @OneToMany(() => Folder, (folder) => folder.owner)
  folders: Folder[];

  @OneToMany(() => File, (file) => file.owner)
  files: File[];
}
