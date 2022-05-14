import { Module } from '@nestjs/common';
import { ReleaseModule } from './modules/release/release.module';
import { TeamModule } from './modules/team/team.module';
import { ProjectModule } from './modules/project/project.module';
import { ReleasetypeModule } from './modules/releasetype/releasetype.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ReleaseModule,
    TeamModule,
    ProjectModule,
    ReleasetypeModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
