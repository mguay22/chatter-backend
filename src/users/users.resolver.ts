import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('_id') _id: string): Promise<User> {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<User> {
    return this.usersService.update(user._id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async removeUser(@CurrentUser() user: TokenPayload): Promise<User> {
    return this.usersService.remove(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me' })
  async getMe(@CurrentUser() user: TokenPayload): Promise<User> {
    return { ...user, _id: new Types.ObjectId(user._id) };
  }
}
