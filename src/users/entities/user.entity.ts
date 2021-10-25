import { AlertEntity } from 'src/alerts/entities/alert.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  viber: string;

  @Column()
  address: string;

  // @OneToMany(() => AlertEntity, (alert: AlertEntity) => alert.owner)
  // alerts: AlertEntity[];
}
