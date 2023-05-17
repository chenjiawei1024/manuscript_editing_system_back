import { Injectable } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { File } from 'src/file/entities/file.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(tagName: string): Promise<Tag> {
    const tag = this.tagRepository.create({ tag_name: tagName });
    return this.tagRepository.save(tag);
  }

  async associateTagWithFile(tagName: string, file_id: number): Promise<File> {
    let tag = await this.tagRepository.findOne({
      where: { tag_name: tagName },
    });
    const file = await this.fileRepository.findOne({
      where: { file_id },
      relations: ['tags'],
    });

    if (!file) {
      throw new Error('File not found');
    }

    if (!tag) {
      tag = this.tagRepository.create({ tag_name: tagName });
      await this.tagRepository.save(tag);
    }

    file.tags.push(tag);
    return this.fileRepository.save(file);
  }
  // create(createTagDto: CreateTagDto) {
  //   return 'This action adds a new tag';
  // }

  async removeTagFromFiles(tag_id: number): Promise<void> {
    // const tag = await this.tagRepository.findOne({
    //   where: { tag_id },
    //   relations: ['files'],
    // });
    const tag = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.files', 'file')
      .where('tag.tag_id = :tag_id', { tag_id })
      .getOne();

    if (!tag) {
      throw new Error('Tag not found');
    }

    const files = await this.fileRepository.find({ relations: ['tags'] });

    for (const file of files) {
      file.tags = file.tags.filter((t) => t.tag_id !== tag_id);
      await this.fileRepository.save(file);
    }

    // for (const file of tag.files) {
    //   console.log(file);
    //   console.log(file.tags);
    //   file.tags = file.tags.filter((t) => t.tag_id !== tag_id);
    //   await this.fileRepository.save(file);
    // }
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
