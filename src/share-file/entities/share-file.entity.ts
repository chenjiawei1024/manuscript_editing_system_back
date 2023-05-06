// ShareFile实体类
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class ShareFile {
  @PrimaryGeneratedColumn()
  share_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  sharer: User;

  @ManyToOne(() => User, (user) => user.user_id)
  receiver: User;

  @ManyToOne(() => File, (file) => file.shared)
  file: File;
}
