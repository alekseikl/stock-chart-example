/// <reference types="react-scripts" />
import { ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./Store/Actions')>;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}