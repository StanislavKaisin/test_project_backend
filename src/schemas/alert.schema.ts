import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Transform, Type } from 'class-transformer';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type AlertDocument = Alert & Document;
export interface IAlertDocument extends Document {
  title: string;
  description: string;
  phone: string;
  viber: string;
  address: string;
  numberOfViews: number;
  img: string;
  owner: User;
  comments: [comment: Comment];
}

@Schema({ timestamps: true })
export class Alert {
  @Transform(({ value }) => value.toString())
  @Prop({
    required: true,
    index: true,
  })
  title: string;

  @Prop({
    required: true,
    index: true,
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

  @Prop()
  searchForOwner: boolean;

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
AlertSchema.index({
  title: 'text',
  description: 'text',
});
AlertSchema.plugin(mongoosePaginate);
