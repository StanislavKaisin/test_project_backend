import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from 'src/schemas/alert.schema';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertsModel: Model<AlertDocument>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    return this.alertsModel.create(createAlertDto);
  }

  findAll() {
    return `This action returns all alerts`;
  }

  findOne(id: string) {
    return this.alertsModel.findById(id);
  }

  update(id: string, updateAlertDto: UpdateAlertDto) {
    return this.alertsModel.findByIdAndUpdate(id, updateAlertDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
