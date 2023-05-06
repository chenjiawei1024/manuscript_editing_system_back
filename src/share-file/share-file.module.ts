import { Module } from '@nestjs/common';
import { ShareFileService } from './share-file.service';
import { ShareFileController } from './share-file.controller';

@Module({
  controllers: [ShareFileController],
  providers: [ShareFileService],
})
export class ShareFileModule {}
