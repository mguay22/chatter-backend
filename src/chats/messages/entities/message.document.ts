import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from '../../../common/database/abstract.entity';
import { Types } from 'mongoose';

@Schema()
export class MessageDocument extends AbstractEntity {
  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  userId: Types.ObjectId;
}
