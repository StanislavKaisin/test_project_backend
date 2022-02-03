import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  Query,
  Req,
  DefaultValuePipe,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Multer } from 'multer';
import { addAlertSchema } from 'src/middleware/addAlertSchema';
import { AlertsService, IPaginationResponse } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UserAlertsDto } from './dto/user-alerts.dto';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/FileModule/file.service';

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @UploadedFile() file: Multer.File,
  ) {
    const { error } = addAlertSchema.validate(createAlertDto, {
      errors: {
        wrap: {
          label: '',
        },
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }
    delete createAlertDto[file];
    createAlertDto.number_of_views = 0;
    if (createAlertDto.searchForOwner + '' === 'true') {
      createAlertDto.search_for_owner = true;
    }
    if (file === undefined || file === null) {
      createAlertDto.img = ``;
      try {
        const result = await this.alertsService.create(createAlertDto);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        const fileName = await this.fileService.createFile(file);
        createAlertDto.img = `${fileName}.webp`;
        try {
          const result = await this.alertsService.create(createAlertDto);
          return JSON.stringify(result);
        } catch (error) {
          throw new Error(error);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  @Get('search')
  async findAlertsWithPagination(
    @Query('query') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<IPaginationResponse> {
    // @ts-ignore error TS2367
    if (page === 'undefined') {
      page = 1;
    }
    if (page < 1) page = 1;
    return this.alertsService.findAlertsPagination(query, { limit, page });
  }

  @Get()
  async findAll() {
    return await this.alertsService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = await this.alertsService.findOne(id + '');
    const user = await this.usersService.findOneById(result.owner_id);
    result.user = [user];
    return res.status(200).send([result]);
  }

  @Post('user')
  findUserAlerts(@Req() req, @Body() userAlertsDto: UserAlertsDto) {
    const { owner } = userAlertsDto;
    try {
      return this.alertsService.findUserAlerts(owner);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
