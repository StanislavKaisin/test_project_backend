import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from 'src/schemas/alert.schema';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import * as mongoose from 'mongoose';
import { pipeline } from 'stream';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertsModel: Model<AlertDocument>,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    return this.alertsModel.create(createAlertDto);
  }

  async findAll() {
    return this.alertsModel.find().sort({ numberOfViews: -1 });
  }

  async findOne(id: string) {
    await this.alertsModel.findByIdAndUpdate(id, {
      $inc: { numberOfViews: 1 },
    });
    return this.alertsModel.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          'user.password': 0,
          'user._id': 0,
          'user.__v': 0,
          'user.comments': 0,
          'user.alerts': 0,
        },
      },
    ]);
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
