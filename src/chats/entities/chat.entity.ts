import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Chat extends AbstractEntity {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field(() => [String])
  @Prop([String])
  userIds: string[];

  @Field({ nullable: true })
  @Prop()
  name?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
