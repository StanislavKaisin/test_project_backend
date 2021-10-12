import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentsModel: Model<CommentDocument>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentsModel.create(createCommentDto);
  }

  async getAlertComments(alertId: string) {
    return this.commentsModel.aggregate([
      {
        $match: { alert: mongoose.Types.ObjectId(alertId) },
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
          'user.name': 1,
          description: 1,
        },
      },
    ]);
  }

  async getUserComments(userId: string) {
    return this.commentsModel.aggregate([
      {
        $match: { owner: mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'alerts',
          localField: 'alert',
          foreignField: '_id',
          as: 'alert',
        },
      },
      {
        $project: {
          title: '$alert.title',
          description: 1,
          alertId: '$alert._id',
        },
      },
      { $unwind: '$title' },
      { $unwind: '$alertId' },
    ]);
  }
}
