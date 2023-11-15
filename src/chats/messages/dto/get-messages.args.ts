import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetMessagesArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
