import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { ReleaseService } from './release.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { FilterReleaseDto } from './dto/filter-release.dto';
import { messages } from 'src/helpers/messages.helper';
import { response } from 'src/helpers/responses.helpers';

@Controller('release')
export class ReleaseController {
  constructor(private readonly service: ReleaseService) {}

  @Get()
  async findAll(@Query() query: FilterReleaseDto, @Response() res: any) {
    const data = await this.service.findAll(query);
    return res.status(HttpStatus.OK).json(response(messages.DATA_RETURN, data));
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string, @Response() res: any) {
    const data = await this.service.findOne(uid);
    return res.status(HttpStatus.OK).json(response(messages.DATA_RETURN, data));
  }

  @Post()
  async create(@Body() createTeamDto: CreateReleaseDto, @Response() res: any) {
    const data = await this.service.create(createTeamDto);
    return res
      .status(HttpStatus.OK)
      .json(response(messages.PROCESS_DONE, data, 201));
  }

  @Put(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateTeamDto: UpdateReleaseDto,
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
