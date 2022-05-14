import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/helpers/messages.helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    const collection = await this.repository.find({
      where: { active: true },
      order: { created_at: 'DESC' },
    });
    return collection;
  }

  async findOne(uid: string): Promise<Project> {
    const Project = await this.repository.findOne({ where: { uid } });
    if (!Project) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    return Project;
  }

  async create(body: CreateProjectDto): Promise<Project> {
    const created = await this.repository.save(body);
    return created;
  }

  async update(uid: string, body: UpdateProjectDto) {
    const Project = await this.repository.findOne({ where: { uid } });
    if (!Project) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, body);
    return this.repository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<string> {
    const Project = await this.repository.findOne({ where: { uid } });
    if (!Project) throw new NotFoundException('Project não encontrado');
    await this.repository.update({ uid }, { active: false });
    return `Project foi removido`;
  }
}
