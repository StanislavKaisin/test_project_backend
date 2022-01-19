import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  title?: string;
  description?: string;
  owner?: UserEntity;
  img?: string;
  number_of_views?: number;
}
