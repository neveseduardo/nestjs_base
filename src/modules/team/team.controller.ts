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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { messages } from 'src/helpers/messages.helper';
import { response } from 'src/helpers/responses.helpers';

@Controller('team')
export class TeamController {
  constructor(private readonly service: TeamService) {}

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
  async create(@Body() createTeamDto: CreateTeamDto, @Response() res: any) {
    const data = await this.service.create(createTeamDto);
    return res
      .status(HttpStatus.OK)
      .json(response(messages.PROCESS_DONE, data));
  }

  @Put(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateTeamDto: UpdateTeamDto,
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
