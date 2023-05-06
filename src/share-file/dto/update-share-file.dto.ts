import { PartialType } from '@nestjs/mapped-types';
import { CreateShareFileDto } from './create-share-file.dto';

export class UpdateShareFileDto extends PartialType(CreateShareFileDto) {}
