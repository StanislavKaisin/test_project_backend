import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  BadRequestException,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { addCommentSchema } from 'src/middleware/addCommentSchema';
// import { addCommentSchema } from '../middleware/addCommentSchema';
import { JoiValidationPipe } from 'src/middleware/joi-validation.middleware';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  @Get('/alert/:alertId')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAlertComments(
    @Param(
      'alertId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    alertId: number,
  ) {
    return this.commentsService.getAlertComments(alertId + '');
  }

  @Get('/user/:userId')
  findUserComments(@Param('userId') userId: string) {
    return this.commentsService.getUserComments(userId + '');
  }
}
