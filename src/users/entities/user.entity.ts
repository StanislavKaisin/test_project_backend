import { AlertEntity } from 'src/alerts/entities/alert.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  viber: string;

  @Column()
  address: string;

  @OneToMany((type) => AlertEntity, (alert) => alert.owner)
  alerts: AlertEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.owner as unknown as string,
  )
  comments: CommentEntity[];
}
