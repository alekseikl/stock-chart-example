import { ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./Actions')>;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}