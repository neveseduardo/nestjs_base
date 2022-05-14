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
import { ReleasetypeService } from './releasetype.service';
import { messages } from 'src/helpers/messages.helper';
import { CreateReleasetypeDto } from './dto/create-releasetype.dto';
import { UpdateReleasetypeDto } from './dto/update-releasetype.dto';
import { response } from 'src/helpers/responses.helpers';

@Controller('releasetype')
export class ReleasetypeController {
  constructor(private readonly service: ReleasetypeService) {}

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
  async create(
    @Body() createTeamDto: CreateReleasetypeDto,
    @Response() res: any,
  ) {
    const data = await this.service.create(createTeamDto);
    return res
      .status(HttpStatus.OK)
      .json(response(messages.PROCESS_DONE, data, 201));
  }

  @Put(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateTeamDto: UpdateReleasetypeDto,
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
