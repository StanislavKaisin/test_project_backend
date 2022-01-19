import { UserEntity } from 'src/users/entities/user.entity';

export class CreateAlertDto {
  readonly title: string;
  readonly description: string;
  readonly phone: string;
  readonly viber: string;
  readonly address: string;
  readonly owner: UserEntity;
  readonly file?: any;
  search_for_owner?: boolean;
  searchForOwner?: boolean;
  number_of_views?: number;
  numberOfViews?: number;
  img?: string;
  phoneCountry: any;
}
