import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { List } from '../lists/list.schema';
import { Tag } from '../tags/tag.schema';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'List', required: true })
  list: List;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }], default: [] })
  tags: Tag[];

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
