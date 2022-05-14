import { PartialType } from '@nestjs/mapped-types';
import { CreateReleasetypeDto } from './create-releasetype.dto';

export class UpdateReleasetypeDto extends PartialType(CreateReleasetypeDto) {}
