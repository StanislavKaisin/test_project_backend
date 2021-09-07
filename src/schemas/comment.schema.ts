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

  @Prop()
  owner: { body: 'string'; by: mongoose.Schema.Types.ObjectId; ref: 'User' };

  @Prop()
  alert: { body: 'string'; by: mongoose.Schema.Types.ObjectId; ref: 'Alert' };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
