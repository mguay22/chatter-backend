import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@ArgsType()
export class MessageCreatedArgs {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ each: true })
  chatIds: string[];
}
