export class CreateAlertDto {
  readonly title: string;
  readonly description: string;
  readonly phone: string;
  readonly viber: string;
  readonly address: string;
  readonly owner: number;
  readonly file?: any;
  readonly searchForOwner?: boolean;
  numberOfViews?: number;
  img?: string;
  phoneCountry: any;
}
