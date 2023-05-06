import { PartialType } from '@nestjs/mapped-types';
import { CreateShareFolderDto } from './create-share-folder.dto';

export class UpdateShareFolderDto extends PartialType(CreateShareFolderDto) {}
