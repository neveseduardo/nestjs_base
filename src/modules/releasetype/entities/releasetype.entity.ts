import { Release } from 'src/modules/release/entities/release.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Releasetype {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

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

  @OneToMany(() => Release, (release) => release.releasetype)
  releases: Release[];
}
