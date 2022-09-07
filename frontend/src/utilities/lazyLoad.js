import { lazy } from 'react';

export const lazyLoad = (componentImportFn: Function) =>
  lazy(async () => {
    const obj = await componentImportFn();
    return typeof obj.default === 'function'
      ? obj
      : obj.default;
  });
