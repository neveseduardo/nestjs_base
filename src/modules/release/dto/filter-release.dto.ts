import { IsOptional } from 'class-validator';

export class FilterReleaseDto {
  @IsOptional()
  team_uid: string;

  @IsOptional()
  project_uid: string;

  @IsOptional()
  release_type_uid: string;

  @IsOptional()
  created_at: string;
}
