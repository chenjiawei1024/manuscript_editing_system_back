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

  // async findAll(owner: number, parentId?: number): Promise<Folder[]> {
  //   const queryBuilder = this.folderRepository.createQueryBuilder('folder');
  //   if (parentId) {
  //     queryBuilder
  //       .where('folder.parent.folder_id = :parentId', {
  //         parentId,
  //       })
  //       .andWhere('folder.owner.user_id = :owner', { owner });
  //   } else {
  //     queryBuilder
  //       .where('folder.parent.folder_id = -1')
  //       .andWhere('folder.owner.user_id = :owner', { owner });
  //   }
  //   const folders = await queryBuilder.getMany();
  //   return folders;
  // }

  // TODO: 需要修改成这个，可以查询子文件夹和子文件数量
  async findAll(owner: number, parentId?: number): Promise<Folder[]> {
    const queryBuilder = this.folderRepository
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.children', 'child')
      .leftJoinAndSelect('folder.files', 'file')
      .select([
        'folder',
        'COUNT(DISTINCT child.folder_id) AS child_folder_count',
        'COUNT(DISTINCT file.file_id) AS file_count',
      ])
      .groupBy('folder.folder_id');

    if (parentId) {
      queryBuilder
        .where('folder.parent.folder_id = :parentId', {
          parentId,
        })
        .andWhere('folder.owner.user_id = :owner', { owner });
    } else {
      queryBuilder
        .where('folder.parent.folder_id = -1')
        .andWhere('folder.owner.user_id = :owner', { owner });
    }

    const folders = await queryBuilder.getRawMany();
    return folders.map((result) => {
      const folder_id = result['folder_folder_id'];
      const folder_name = result['folder_folder_name'];
      const created_time = result['folder_created_time'];
      const last_accessed_at = result['folder_last_accessed_at'];
      const child_folder_count = +result['child_folder_count'];
      const child_file_count = +result['file_count'];

      const folder = new Folder();
      folder.folder_id = folder_id;
      folder.folder_name = folder_name;
      folder.created_time = created_time;
      folder.last_accessed_at = last_accessed_at;

      return { ...folder, child_folder_count, child_file_count };
    });
  }

  async findByName(name: string, owner: number) {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .where('folder.folder_name LIKE :name', { name: `%${name}%` })
      .andWhere('folder.owner.user_id = :owner', { owner })
      .getMany();
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
