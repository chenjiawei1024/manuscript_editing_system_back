import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { File } from '../file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
