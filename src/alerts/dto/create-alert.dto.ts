import { UserEntity } from 'src/users/entities/user.entity';

export class CreateAlertDto {
  readonly title: string;
  readonly description: string;
  readonly phone: string;
  readonly viber: string;
  readonly address: string;
  readonly owner: UserEntity;
  readonly file?: any;
  searchForOwner?: boolean;
  numberOfViews?: number;
  img?: string;
  phoneCountry: any;
}
