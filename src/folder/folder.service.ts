import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { File } from '../file/entities/file.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    createFolderDto.parent = createFolderDto.parent || { folder_id: -1 };
    const folder = this.folderRepository.create(createFolderDto);
    return await this.folderRepository.save(folder);
  }

  async findAll(parentId?: number): Promise<Folder[]> {
    const queryBuilder = this.folderRepository.createQueryBuilder('folder');
    if (parentId) {
      queryBuilder.andWhere('folder.parent.folder_id = :parentId', {
        parentId,
      });
    } else {
      queryBuilder.andWhere('folder.parent.folder_id = -1');
    }
    const folders = await queryBuilder.getMany();
    return folders;
  }

  // TODO: 需要修改成这个，可以查询子文件夹和子文件数量
  // async findAll(parentId?: number): Promise<Folder[]> {
  //   const queryBuilder = this.folderRepository
  //     .createQueryBuilder('folder')
  //     .leftJoinAndSelect('folder.children', 'child')
  //     .leftJoinAndSelect('folder.files', 'file')
  //     .select([
  //       'folder',
  //       'COUNT(DISTINCT child.folder_id) AS child_folder_count',
  //       'COUNT(DISTINCT file.file_id) AS file_count',
  //     ])
  //     .groupBy('folder.folder_id');

  //   if (parentId) {
  //     queryBuilder.andWhere('folder.parent.folder_id = :parentId', {
  //       parentId,
  //     });
  //   } else {
  //     queryBuilder.andWhere('folder.parent.folder_id = -1');
  //   }

  //   const folders = await queryBuilder.getRawMany();
  //   return folders.map((result) => {
  //     const folder = result[0];
  //     const folder_id = result['folder_folder_id'];
  //     const folder_name = result['folder_folder_name'];
  //     const created_time = result['folder_created_time'];
  //     const is_favorite = result['folder_is_favorite'];
  //     const last_accessed_at = result['folder_last_accessed_at'];
  //     const ownerUserId = result['folder_ownerUserId'];
  //     const parentFolderId = result['folder_parentFolderId'];
  //     const childFolderCount = result['child_folder_count'];
  //     const fileCount = result['file_count'];

  //     return { ...folder, childFolderCount, fileCount };
  //   });
  //   return folders;
  // }

  async findByName(name: string) {
    const folders = await this.folderRepository.find({
      where: { folder_name: Like(`%${name}%`) },
    });
    return folders;
  }

  async findOne(folder_id: number): Promise<Folder> {
    const folder = await this.folderRepository.findOne({
      where: { folder_id },
    });
    if (!folder) {
      throw new NotFoundException(`Folder with id ${folder_id} not found`);
    }
    return folder;
  }

  async update(id: number, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.findOne(id);
    const updatedFolder = Object.assign(folder, updateFolderDto);
    return await this.folderRepository.save(updatedFolder);
  }

  async remove(id: number): Promise<void> {
    const folder = await this.findOne(id);
    await this.folderRepository.remove(folder);
  }

  // async getFolderContent(
  //   id: number,
  // ): Promise<{ folders: Folder[]; files: File[] }> {
  //   const folder = await this.findOne(id);
  //   const folders = await this.findAll(id);
  //   const files = await this.fileRepository.find({ where: { folderId: id } });
  //   return { folders, files };
  // }
}
