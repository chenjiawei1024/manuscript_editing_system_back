import { Test, TestingModule } from '@nestjs/testing';
import { ShareFileService } from './share-file.service';

describe('ShareFileService', () => {
  let service: ShareFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareFileService],
    }).compile();

    service = module.get<ShareFileService>(ShareFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
