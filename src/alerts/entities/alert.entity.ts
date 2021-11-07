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

/*
[23:37:29] File change detected. Starting incremental compilation...

[Nest] 82060   - 30.10.2021, 23:37:32   [TypeOrmModule] Unable to connect to the database. Retrying (5)... +3023ms
QueryFailedError: SQLITE_CONSTRAINT: NOT NULL constraint failed: temporary_alert_entity.img
    at QueryFailedError.TypeORMError [as constructor] (/Users/stanislavkaisin/Documents/Digis/be/Digis-intern-task-backend/src/error/TypeORMError.ts:7:9)
    at new QueryFailedError (/Users/

      */
