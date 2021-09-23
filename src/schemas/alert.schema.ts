import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Transform, Type } from 'class-transformer';

export type AlertDocument = Alert & Document;

@Schema({ timestamps: true })
export class Alert {
  @Transform(({ value }) => value.toString())
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop()
  viber: string;

  @Prop()
  address: string;

  @Prop({ type: Number, default: 0 })
  numberOfViews: number;

  @Prop()
  img: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  owner: User;

  @Prop({ body: 'string', by: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comments: [comment: Comment];
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
