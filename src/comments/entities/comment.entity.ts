import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.id)
  owner: UserEntity;

  @OneToOne(() => AlertEntity, (alert: AlertEntity) => alert.id)
  alert: AlertEntity;
}
