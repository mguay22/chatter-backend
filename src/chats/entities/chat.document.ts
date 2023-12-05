import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageDocument } from '../messages/entities/message.document';

@Schema()
export class ChatDocument extends AbstractEntity {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop([MessageDocument])
  messages: MessageDocument[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
