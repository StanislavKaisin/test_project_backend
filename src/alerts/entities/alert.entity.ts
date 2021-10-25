import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class AlertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  phone: string;

  @Column()
  viber: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  searchForOwner: boolean;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
  owner: UserEntity;
}
