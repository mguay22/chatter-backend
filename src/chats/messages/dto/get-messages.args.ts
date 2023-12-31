import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { PaginationArgs } from '../../../common/dto/pagination-args.dto';

@ArgsType()
export class GetMessagesArgs extends PaginationArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
