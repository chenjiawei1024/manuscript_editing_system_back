import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { ShareFile } from '../share-file/entities/share-file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(ShareFile)
    private readonly sharefileRepository: Repository<ShareFile>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const { tags } = createFileDto;
    createFileDto.parent = createFileDto.parent || { folder_id: -1 };
    const file = this.fileRepository.create(createFileDto);
    if (tags && tags.length > 0) {
      const tagEntities = await Promise.all(
        tags.map((tag) =>
          this.tagRepository.findOne({ where: { tag_name: tag.tag_name } }),
        ),
      );
      file.tags = tagEntities.filter((tag) => !!tag);
    }
    return this.fileRepository.save(file);
  }

  async findAll(owner: number, parentId?: number) {
    const queryBuilder = this.fileRepository
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.tags', 'tag');

    console.log(parentId);
    if (parentId) {
      queryBuilder.andWhere('file.parent.folder_id = :parentId', {
        parentId,
      });
    } else {
      queryBuilder
        .andWhere('file.parent.folder_id = -1')
        .andWhere('file.owner.user_id = :owner', { owner });
    }

    const files = await queryBuilder.getMany();

    for (const file of files) {
      // const shareFiles = await this.sharefileRepository.find({
      //   where: {
      //     file: file,
      //   },
      // });
      const shareFiles = await this.sharefileRepository
        .createQueryBuilder('sharefile')
        .leftJoinAndSelect('sharefile.file', 'file')
        .where('file.file_id = :file_id', { file_id: file.file_id })
        .getMany();

      file.is_shared = shareFiles.length > 0;
    }
    return files;
  }

  async findByName(name: string, owner: number) {
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .where('file.file_name LIKE :name', { name: `%${name}%` })
      .andWhere('file.owner.user_id = :owner', { owner })
      .leftJoinAndSelect('file.tags', 'tags')
      .getMany();

    return files;
  }

  async findAllSortedByLastAccessedAt(owner: number): Promise<File[]> {
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .where('file.owner = :owner', { owner })
      .orderBy('file.last_accessed_at', 'DESC')
      .leftJoinAndSelect('file.tags', 'tags')
      .getMany();
    return files;
  }

  async findAllFavorite(owner: number): Promise<File[]> {
    // const files = await this.fileRepository.find({
    //   where: { is_favorite: true, owner },
    //   relations: ['tags'],
    // });
    // return files;
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .where('file.is_favorite = :isFavorite', { isFavorite: true })
      .andWhere('file.owner.user_id = :owner', { owner })
      .leftJoinAndSelect('file.tags', 'tags')
      .getMany();
    return files;
  }

  async findById(file_id: number) {
    const file = await this.fileRepository.findOne({
      where: { file_id },
      relations: ['tags'],
    });
    if (!file) {
      throw new NotFoundException(`File with id ${file_id} not found`);
    }
    return file;
  }

  async toggleFavorite(file_id: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: { file_id },
    });
    if (!file) {
      throw new Error('File not found');
    }
    file.is_favorite = !file.is_favorite;
    return this.fileRepository.save(file);
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<File> {
    const file = await this.findById(id);
    const updatedFolder = Object.assign(file, updateFileDto);
    return await this.fileRepository.save(updatedFolder);
  }

  async remove(id: number) {
    const folder = await this.findById(id);
    await this.fileRepository.remove(folder);
  }

  async lockFile(file_id: number): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { file_id } });
    if (!file) {
      throw new Error(`File with ID ${file_id} not found`);
    }

    if (file.is_locked) {
      throw new Error(`File with ID ${file_id} is already locked`);
    }

    file.is_locked = true;
    return this.fileRepository.save(file);
  }

  async unlockFile(file_id: number): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { file_id } });
    if (!file) {
      throw new Error(`File with ID ${file_id} not found`);
    }

    if (!file.is_locked) {
      throw new Error(`File with ID ${file_id} is not locked`);
    }

    file.is_locked = false;
    return this.fileRepository.save(file);
  }

  async getFileLockedStatus(file_id: number): Promise<boolean> {
    const file = await this.fileRepository.findOne({ where: { file_id } });

    if (!file) {
      throw new Error(`File with ID ${file_id} not found`);
    }

    return file.is_locked;
  }
}
