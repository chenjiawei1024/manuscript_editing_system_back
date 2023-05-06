import { Test, TestingModule } from '@nestjs/testing';
import { ShareFolderService } from './share-folder.service';

describe('ShareFolderService', () => {
  let service: ShareFolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareFolderService],
    }).compile();

    service = module.get<ShareFolderService>(ShareFolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
