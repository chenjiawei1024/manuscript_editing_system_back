import { Test, TestingModule } from '@nestjs/testing';
import { ShareFileController } from './share-file.controller';
import { ShareFileService } from './share-file.service';

describe('ShareFileController', () => {
  let controller: ShareFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareFileController],
      providers: [ShareFileService],
    }).compile();

    controller = module.get<ShareFileController>(ShareFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
