import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';

@Module({
  controllers: [CommentsController],
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentsService],
})
export class CommentsModule {}
