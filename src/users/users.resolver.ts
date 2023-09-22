import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('_id') _id: string) {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.usersService.update(user._id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(@CurrentUser() user: TokenPayload) {
    return this.usersService.remove(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me' })
  getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
