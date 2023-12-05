import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from '../chats.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [forwardRef(() => ChatsModule), UsersModule],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
