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
    const newAlert = await this.alertsService.create(createAlertDto);
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
    return;
  }

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id);
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
