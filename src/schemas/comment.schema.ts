import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    required: true,
  })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Alert' })
  alert: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
