import { Request } from 'express';

export const getJwt = (request: Request) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.substring(7, authorization.length);
  }
};
