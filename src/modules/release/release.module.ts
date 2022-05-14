import { Module } from '@nestjs/common';
import { ReleaseService } from './release.service';
import { ReleaseController } from './release.controller';
import { Release } from './entities/release.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Releasetype } from '../releasetype/entities/releasetype.entity';
import { Project } from '../project/entities/project.entity';
import { Team } from '../team/entities/team.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Release, Releasetype, Team, Project])],
  controllers: [ReleaseController],
  providers: [ReleaseService],
})
export class ReleaseModule {}
