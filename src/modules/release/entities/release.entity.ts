import { Project } from 'src/modules/project/entities/project.entity';
import { Releasetype } from 'src/modules/releasetype/entities/releasetype.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Release {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  description: string;

  @Column({ type: 'timestamp' })
  sprint_start: Date;

  @Column({ type: 'timestamp' })
  sprint_end: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({
    type: 'varchar',
    default: 'admin',
  })
  user: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  @ManyToOne(() => Team, (team) => team.releases)
  team: Team;

  @ManyToOne(() => Project, (project) => project.releases)
  project: Project;

  @ManyToOne(() => Releasetype, (releasetype) => releasetype.releases)
  releasetype: Releasetype;
}
