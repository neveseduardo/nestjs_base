import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { messages } from 'src/helpers/messages.helper';
import { response } from 'src/helpers/responses.helpers';

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Get()
  async findAll(@Response() res: any) {
    const data = await this.service.findAll();
    return res.status(HttpStatus.OK).json(response(messages.DATA_RETURN, data));
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string, @Response() res: any) {
    const data = await this.service.findOne(uid);
    return res.status(HttpStatus.OK).json(response(messages.DATA_RETURN, data));
  }

  @Post()
  async create(@Body() createTeamDto: CreateProjectDto, @Response() res: any) {
    const data = await this.service.create(createTeamDto);
    return res
      .status(HttpStatus.OK)
      .json(response(messages.PROCESS_DONE, data, 201));
  }

  @Put(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateTeamDto: UpdateProjectDto,
    @Response() res: any,
  ) {
    const data = await this.service.update(uid, updateTeamDto);
    return res
      .status(HttpStatus.OK)
      .json(response(messages.PROCESS_DONE, data));
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string, @Response() res: any) {
    await this.service.remove(uid);
    return res.status(HttpStatus.OK).json(response(messages.PROCESS_DONE, []));
  }
}
