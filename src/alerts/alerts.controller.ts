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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { Express } from 'express';
import { Multer } from 'multer';
import { addAlertSchema } from 'src/middleware/addAlertSchema';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { join } from 'path';
import * as fs from 'fs';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

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
      const filePath = join(
        __dirname,
        '..',
        '..',
        `uploads/${fileName}.${fileExtension}`,
      );
      try {
        fs.writeFile(filePath, file.buffer, async () => {
          await this.alertsService
            .update(newAlert._id, {
              img: `${fileName}.${fileExtension}`,
            })
            .then((updatedAlert) => {
              res.status(201);
              res.send(updatedAlert);
            });
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const ObjectID = require('mongodb').ObjectID;
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
}
