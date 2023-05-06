import { Module } from '@nestjs/common';
import { ShareFolderService } from './share-folder.service';
import { ShareFolderController } from './share-folder.controller';

@Module({
  controllers: [ShareFolderController],
  providers: [ShareFolderService]
})
export class ShareFolderModule {}
