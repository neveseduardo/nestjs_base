import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReleasetypeDto } from './dto/create-releasetype.dto';
import { UpdateReleasetypeDto } from './dto/update-releasetype.dto';
import { Releasetype } from './entities/releasetype.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/helpers/messages.helper';

@Injectable()
export class ReleasetypeService {
  constructor(
    @InjectRepository(Releasetype)
    private repository: Repository<Releasetype>,
  ) {}

  async findAll(): Promise<Releasetype[]> {
    const collection = await this.repository.find({
      where: { active: true },
      order: { created_at: 'DESC' },
    });
    return collection;
  }

  async findOne(uid: string): Promise<Releasetype> {
    const Releasetype = await this.repository.findOne({ where: { uid } });
    if (!Releasetype) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    return Releasetype;
  }

  async create(body: CreateReleasetypeDto): Promise<Releasetype> {
    const created = await this.repository.save(body);
    return created;
  }

  async update(uid: string, body: UpdateReleasetypeDto) {
    const releasetype = await this.repository.findOne({ where: { uid } });
    if (!releasetype) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, body);
    return this.repository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<string> {
    const Releasetype = await this.repository.findOne({ where: { uid } });
    if (!Releasetype) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, { active: false });
    return `Releasetype foi removido`;
  }
}
