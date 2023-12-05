import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { DatabaseModule } from '../common/database/database.module';
import { Chat } from './entities/chat.entity';
import { ChatsRepository } from './chats.repository';
import { MessagesModule } from './messages/messages.module';
import { ChatSchema } from './entities/chat.document';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatsResolver, ChatsService, ChatsRepository],
  exports: [ChatsRepository],
})
export class ChatsModule {}
