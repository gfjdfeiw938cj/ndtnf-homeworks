import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required:true, unique:true })
  email: string;

  @Prop({ required:true })
  password: string;

  @Prop({ required:true })
  firstname: string;

  @Prop({ required:true })
  lastname: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
