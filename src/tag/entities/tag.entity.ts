// Tag实体类
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column()
  tag_name: string;

  @ManyToMany(() => File, (file) => file.tags)
  @JoinTable({
    name: 'file_tag',
    joinColumns: [{ name: 'tag_id' }],
    inverseJoinColumns: [{ name: 'file_id' }],
  })
  files: File[];
}
