import { LOGGED } from './ScreensName';
import type { NOT_LOGGED } from './ScreensName';

type NotLoggedRouteName = (typeof NOT_LOGGED)[keyof typeof NOT_LOGGED];

export type NotLoggedStackParamList = Record<NotLoggedRouteName, undefined>;
export type LoggedStackParamList = {
  [LOGGED.authenticated]: undefined;
  [LOGGED.detailWord]: { word: string };
};
