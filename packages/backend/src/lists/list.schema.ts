import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ListDocument = List & Document;

@Schema({ timestamps: true })
export class List {
  @Prop({ required: true })
  name: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
