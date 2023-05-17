import { Module } from '@nestjs/common';
import { ShareFileService } from './share-file.service';
import { ShareFileController } from './share-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { ShareFile } from './entities/share-file.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, File, ShareFile])],
  controllers: [ShareFileController],
  providers: [ShareFileService],
})
export class ShareFileModule {}
