import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  readonly description: string;
  readonly owner: UserEntity;
  readonly alert: AlertEntity;
}
