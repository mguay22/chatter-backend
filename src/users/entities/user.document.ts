import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from '../../common/database/abstract.entity';

@Schema({ versionKey: false })
export class UserDocument extends AbstractEntity {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
