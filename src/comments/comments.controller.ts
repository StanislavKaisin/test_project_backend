import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { addCommentSchema } from 'src/middleware/addCommentSchema';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(addCommentSchema))
  create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return this.commentsService.create(createCommentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @Get()
  // findAll() {
  //   return this.commentsService.findAll();
  // }
  @Get('/alert/:alertId')
  findAlertComments(@Param('alertId') alertId: string) {
    const ObjectID = require('mongodb').ObjectID;
    if (ObjectID.isValid(alertId)) {
      try {
        return this.commentsService.getAlertComments(alertId + '');
      } catch (error) {
        throw new BadRequestException(error);
      }
    } else {
      throw new BadRequestException('Alert not found');
    }
  }

  @Get('/user/:userId')
  findUserComments(@Param('userId') userId: string) {
    const ObjectID = require('mongodb').ObjectID;
    if (ObjectID.isValid(userId)) {
      try {
        return this.commentsService.getUserComments(userId + '');
      } catch (error) {
        throw new BadRequestException(error);
      }
    } else {
      throw new BadRequestException('Alert not found');
    }
  }
}
