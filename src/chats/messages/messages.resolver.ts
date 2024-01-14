import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { CurrentUser } from '../../auth/current-user.decorator';
import { TokenPayload } from '../../auth/token-payload.interface';
import { GetMessagesArgs } from './dto/get-messages.args';
import { MessageCreatedArgs } from './dto/message-created.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Message> {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessagesArgs,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(getMessageArgs);
  }

  @Subscription(() => Message, {
    filter: (payload, variables: MessageCreatedArgs, context) => {
      const userId = context.req.user._id;
      const message: Message = payload.messageCreated;
      return (
        variables.chatIds.includes(message.chatId) &&
        userId !== message.user._id.toHexString()
      );
    },
  })
  messageCreated(@Args() _messageCreatedArgs: MessageCreatedArgs) {
    return this.messagesService.messageCreated();
  }
}
