/// <reference types="react-scripts" />

declare module 'react-resize-aware' {
  import { ReactNode } from 'react';

  type ReturnType = [ReactNode, { width: number, height: number }];

  export default function (): ReturnType;
}