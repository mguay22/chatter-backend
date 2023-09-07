import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  } else if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
