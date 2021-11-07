import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user._id)
  owner: UserEntity;

  @ManyToOne(() => AlertEntity, (alert: AlertEntity) => alert._id)
  alert: AlertEntity;
}
