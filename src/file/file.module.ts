import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Tag } from '../tag/entities/tag.entity';
import { ShareFile } from '../share-file/entities/share-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Tag, ShareFile])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
