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
  numberOfViews: number;

  @Column('boolean', { default: false })
  searchForOwner: boolean;

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
