import { PartialType } from '@nestjs/mapped-types';
import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  description: string;
  owner: UserEntity;
  alert: AlertEntity;
}
