import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type AlertDocument = Alert & Document;

@Schema({ timestamps: true })
export class Alert {
  @Prop({
    required: true,
  })
  title: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop()
  photo: {
    data: Buffer;
    contentType: String;
  };
  @Prop()
  owner: { body: 'string'; by: mongoose.Schema.Types.ObjectId; ref: 'User' };
  @Prop()
  comments: [
    { body: 'string'; by: mongoose.Schema.Types.ObjectId; ref: 'Comment' },
  ];
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
