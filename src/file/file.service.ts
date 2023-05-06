import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
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

  async findAll(parentId?: number) {
    // const files = await this.fileRepository.find({
    //   relations: ['tags'],
    // });
    // const queryBuilder = this.fileRepository.createQueryBuilder('file');
    // if (parentId) {
    //   queryBuilder.andWhere('file.parent.folder_id = :parentId', {
    //     parentId,
    //   });
    // } else {
    //   queryBuilder.andWhere('file.parent.folder_id = -1');
    // }
    // const files = await queryBuilder.getMany();
    // return files;
    const queryBuilder = this.fileRepository
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.tags', 'tag');

    if (parentId) {
      queryBuilder.andWhere('file.parent.folder_id = :parentId', {
        parentId,
      });
    } else {
      queryBuilder.andWhere('file.parent.folder_id = -1');
    }

    const files = await queryBuilder.getMany();
    return files;
  }

  async findByName(name: string) {
    const files = await this.fileRepository.find({
      where: { file_name: Like(`%${name}%`) },
      relations: ['tags'],
    });
    return files;
  }

  async findAllSortedByLastAccessedAt(): Promise<File[]> {
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .orderBy('file.last_accessed_at', 'DESC')
      .getMany();
    return files;
  }

  async findAllFavorite(): Promise<File[]> {
    const files = await this.fileRepository.find({
      where: { is_favorite: true },
      relations: ['tags'],
    });
    return files;
  }

  // async findOne(name: string, tagNames?: string[]) {
  //   let query = this.fileRepository
  //     .createQueryBuilder('file')
  //     .where('file.name LIKE :name', { name: `%${name}%` })
  //     .leftJoinAndSelect('file.tags', 'tag');

  //   if (tagNames && tagNames.length > 0) {
  //     query = query.andWhere('tag.name IN (:...tagNames)', { tagNames });
  //   }

  //   const files = await query.getMany();

  //   if (!files || files.length === 0) {
  //     throw new NotFoundException(`File with name ${name} not found`);
  //   }

  //   return {
  //     message: 'File retrieved successfully',
  //     data: files,
  //   };
  // }

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
    const folder = await this.findById(id);
    const updatedFolder = Object.assign(folder, updateFileDto);
    return await this.fileRepository.save(updatedFolder);
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
