import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateChatInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
