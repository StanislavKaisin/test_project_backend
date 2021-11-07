import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  title?: string;
  description?: string;
  owner?: number;
  img?: string;
  numberOfViews?: number;
}
