export const NOT_LOGGED = {
  login: 'LoginScreen',
  initial: 'InitialScreen',
  createAccount: 'CreateAccountScreen',
} as const;

export const LOGGED = {
  authenticated: 'AuthenticatedScreen',
  detailWord: 'DetailWordScreen',
} as const;
