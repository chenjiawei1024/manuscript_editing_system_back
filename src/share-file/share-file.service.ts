import { Injectable } from '@nestjs/common';
import { CreateShareFileDto } from './dto/create-share-file.dto';
import { UpdateShareFileDto } from './dto/update-share-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { File } from 'src/file/entities/file.entity';
import { ShareFile } from './entities/share-file.entity';

@Injectable()
export class ShareFileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ShareFile)
    private readonly sharefileRepository: Repository<ShareFile>,
  ) {}
  async create(createShareFileDto: CreateShareFileDto) {
    const { sharer_id, receiver_name, file_name, parent } = createShareFileDto;
    const sharer = await this.userRepository.findOne({
      where: { user_id: sharer_id },
    });
    if (!sharer) {
      throw new Error(`User with ID ${sharer_id} not found`);
    }

    const receiver = await this.userRepository.findOne({
      where: { name: receiver_name },
    });
    if (!receiver) {
      throw new Error(`User with name ${receiver_name} not found`);
    }

    let file = await this.fileRepository.findOne({
      where: {
        file_name: file_name,
      },
    });
    if (!file) {
      // 若file不存在，则直接创建新的file
      file = new File();
      file.owner = sharer;
      file.file_name = file_name;
      file.parent = { ...file.parent, owner: sharer, folder_id: parent };
      await this.fileRepository.save(file);
    }

    const shareFile = new ShareFile();
    shareFile.sharer = sharer;
    shareFile.receiver = receiver;
    shareFile.file = file;

    return this.sharefileRepository.save(shareFile);
  }

  findAll() {
    return `This action returns all shareFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shareFile`;
  }

  async findFilesByReceiverId(receiverId: number): Promise<File[]> {
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.owner', 'owner')
      .innerJoinAndSelect(
        ShareFile,
        'sharefile',
        'sharefile.file.file_id = file.file_id',
      )
      .innerJoinAndSelect('sharefile.receiver', 'receiver')
      .where('receiver.user_id = :receiverId', { receiverId })
      .getMany();

    return files;
  }

  update(id: number, updateShareFileDto: UpdateShareFileDto) {
    return `This action updates a #${id} shareFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} shareFile`;
  }
}
