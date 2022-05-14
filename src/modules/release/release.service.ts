import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { Release } from './entities/release.entity';
import { Repository, Raw } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterReleaseDto } from './dto/filter-release.dto';
import { messages } from 'src/helpers/messages.helper';
import { Releasetype } from '../releasetype/entities/releasetype.entity';
import { Project } from '../project/entities/project.entity';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class ReleaseService {
  constructor(
    @InjectRepository(Release) private repository: Repository<Release>,
    @InjectRepository(Team) private TeamRepository: Repository<Team>,
    @InjectRepository(Project) private ProjectRepository: Repository<Project>,
    @InjectRepository(Releasetype)
    private releasetypeRepository: Repository<Releasetype>,
  ) {}

  async findAll(query: FilterReleaseDto): Promise<Release[]> {
    const { team_uid, project_uid, created_at } = query;
    const conditions = {};
    Object.assign(conditions, { active: true });
    if (team_uid) Object.assign(conditions, { team_uid });
    if (project_uid) Object.assign(conditions, { project_uid });
    if (created_at)
      Object.assign(conditions, {
        created_at: Raw((alias) => `Date(${alias}) = '${created_at}'`),
      });
    const collection = await this.repository.find({
      where: conditions,
      order: { created_at: 'DESC' },
    });
    return collection;
  }

  async findOne(uid: string): Promise<Release> {
    const release = await this.repository.findOne({ where: { uid } });
    if (!release) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    return release;
  }

  async create(body: CreateReleaseDto): Promise<Release> {
    const { releasetypeUid, projectUid, teamUid } = body;
    const releasetype = await this.releasetypeRepository.findOne({
      where: { uid: releasetypeUid },
    });
    const team = await this.TeamRepository.findOne({
      where: { uid: teamUid },
    });
    const project = await this.ProjectRepository.findOne({
      where: { uid: projectUid },
    });

    if (!releasetype)
      throw new NotFoundException(
        messages.RESOURCES_NOT_FOUND + ': Releasetype',
      );
    if (!team)
      throw new NotFoundException(messages.RESOURCES_NOT_FOUND + ': Team');
    if (!project)
      throw new NotFoundException(messages.RESOURCES_NOT_FOUND + ': Project');

    const data = {
      ...body,
      releasetype,
      team,
      project,
    };
    return await this.repository.save(data);
  }

  async update(uid: string, body: UpdateReleaseDto) {
    const release = await this.repository.findOne({ where: { uid } });
    if (!release) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, body);
    return this.repository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<string> {
    const release = await this.repository.findOne({ where: { uid } });
    if (!release) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, { active: false });
    return `Release foi removido`;
  }
}
