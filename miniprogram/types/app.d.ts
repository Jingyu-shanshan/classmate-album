/// <reference path="./index.d.ts" />
/// <reference types="miniprogram-api-typings" />

interface IAppOption {
  globalData: {
    userInfo?: any;
    isLoggedIn: boolean;
    systemInfo?: any;
  };
  onLaunch(): void;
  checkUpdate(): void;
  onError(error: string): void;
  onUnhandledRejection(res: { reason: any }): void;
}

export {}; 