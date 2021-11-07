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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Multer } from 'multer';
import { addAlertSchema } from 'src/middleware/addAlertSchema';
import { join } from 'path';
import * as fs from 'fs';
import { AlertsService, IPaginationResponse } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UserAlertsDto } from './dto/user-alerts.dto';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly usersService: UsersService,
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
    createAlertDto.numberOfViews = 0;
    //@ts-ignore
    if (createAlertDto.searchForOwner === 'true') {
      //@ts-ignore
      createAlertDto.searchForOwner = true;
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
      const fileName = uuidv4();
      const filePath = join(__dirname, '..', '..', `uploads/${fileName}.webp`);
      try {
        await sharp(file.buffer)
          .resize({
            height: 700,
            width: 1000,
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0.1 },
          })
          .webp()
          .toFile(filePath);
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
    // @ts-ignore
    if (page < 1) page = 1;
    return this.alertsService.findAlertsPagination(query, { limit, page });
  }

  @Get()
  async findAll() {
    return await this.alertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.alertsService.findOne(id);
    const user = await this.usersService.findOneById(result.owner_id);
    result.user = [user];
    //@ts-ignore
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
