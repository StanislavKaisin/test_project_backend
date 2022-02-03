import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const result = this.commentRepository.save(createCommentDto);
    return result;
  }

  async getAlertComments(alertId: string) {
    const result = await this.commentRepository
      .createQueryBuilder('comment')
      .where({ alert: alertId })
      .leftJoinAndSelect('comment.owner', 'user')
      .getMany();
    return result;
  }

  async getUserComments(userId: string) {
    const result = await this.commentRepository
      .createQueryBuilder('comment')
      .where({ owner: userId })
      .leftJoinAndSelect('comment.alert', 'alert')
      .getMany();
    return result;
  }
}
