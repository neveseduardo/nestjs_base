import { Module } from '@nestjs/common';
import { ReleasetypeService } from './releasetype.service';
import { ReleasetypeController } from './releasetype.controller';
import { Releasetype } from './entities/releasetype.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Releasetype])],
  controllers: [ReleasetypeController],
  providers: [ReleasetypeService],
})
export class ReleasetypeModule {}
