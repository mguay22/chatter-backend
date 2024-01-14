export const getJwt = (authorization: string) => {
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.substring(7, authorization.length);
  }
};
