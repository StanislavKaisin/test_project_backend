import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class AlertEntity {
  @PrimaryGeneratedColumn()
  _id: number;

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

  @Column()
  number_of_views: number;

  @Column('boolean', { default: false })
  search_for_owner: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.alerts)
  @JoinColumn()
  owner: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  img: string;
}
