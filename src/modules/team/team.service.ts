import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/helpers/messages.helper';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
  ) {}

  async findAll(): Promise<Team[]> {
    const collection = await this.repository.find({
      where: { active: true },
      order: { created_at: 'DESC' },
    });
    return collection;
  }

  async findOne(uid: string): Promise<Team> {
    const Team = await this.repository.findOne({ where: { uid } });
    if (!Team) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    return Team;
  }

  async create(body: CreateTeamDto): Promise<Team> {
    const created = await this.repository.save(body);
    return created;
  }

  async update(uid: string, body: UpdateTeamDto) {
    const Team = await this.repository.findOne({ where: { uid } });
    if (!Team) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, body);
    return this.repository.findOne({ where: { uid } });
  }

  async remove(uid: string): Promise<string> {
    const Team = await this.repository.findOne({ where: { uid } });
    if (!Team) throw new NotFoundException(messages.RESOURCES_NOT_FOUND);
    await this.repository.update({ uid }, { active: false });
    return `Team foi removido`;
  }
}
