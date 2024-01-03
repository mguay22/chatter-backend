import { User } from '../users/entities/user.entity';

export type TokenPayload = Omit<User, '_id'> & { _id: string };
