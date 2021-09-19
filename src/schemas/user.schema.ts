import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  phone: string;
  @Prop()
  viber: string;
  @Prop()
  address: string;
  @Prop()
  password: string;
  @Prop()
  alerts: [
    { body: 'string'; by: mongoose.Schema.Types.ObjectId; ref: 'Alert' },
  ];
  @Prop()
  comments: [
    {
      body: 'string';
      by: mongoose.Schema.Types.ObjectId;
      ref: 'Comment';
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
