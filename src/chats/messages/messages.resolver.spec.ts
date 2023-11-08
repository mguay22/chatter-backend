import { Test, TestingModule } from '@nestjs/testing';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';

describe('MessagesResolver', () => {
  let resolver: MessagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesResolver, MessagesService],
    }).compile();

    resolver = module.get<MessagesResolver>(MessagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
