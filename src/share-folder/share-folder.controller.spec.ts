import { Test, TestingModule } from '@nestjs/testing';
import { ShareFolderController } from './share-folder.controller';
import { ShareFolderService } from './share-folder.service';

describe('ShareFolderController', () => {
  let controller: ShareFolderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareFolderController],
      providers: [ShareFolderService],
    }).compile();

    controller = module.get<ShareFolderController>(ShareFolderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
