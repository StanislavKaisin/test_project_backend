import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Multer } from 'multer';
import { addAlertSchema } from 'src/middleware/addAlertSchema';
import { join } from 'path';
import * as fs from 'fs';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { UserAlertsDto } from './dto/user-alerts.dto';
import { ObjectID } from 'mongodb';
import * as sharp from 'sharp';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @UploadedFile() file: Multer.File,
    @Res() res: Response,
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
    const newAlert = await this.alertsService.create(createAlertDto);
    if (file === undefined) {
      await this.alertsService
        .update(newAlert._id, {
          img: ``,
        })
        .then((updatedAlert) => {
          res.status(201);
          res.send(updatedAlert);
        });
    } else {
      const fileName = newAlert._id;
      const fileExtension = file.mimetype.split('/')[1];
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
        await this.alertsService
          .update(newAlert._id, {
            img: `${fileName}.webp`,
          })
          .then((updatedAlert) => {
            res.status(201);
            res.send(updatedAlert);
          });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  @Get('search')
  async findAlertsWithPagination(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    // @ts-ignore error TS2367
    if (page === 'undefined') {
      page = 1;
    }
    return this.alertsService.findAlertsPagination(query, page);
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    if (ObjectID.isValid(id)) {
      try {
        const result = await this.alertsService.findOne(id);
        if (!result) {
          return res.status(HttpStatus.NOT_FOUND).send();
        } else {
          return res.status(200).send(result);
        }
      } catch (error) {
        const errorMessage = error?.reason || error.message;
        return new BadRequestException(errorMessage);
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
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
