/// <reference types="miniprogram-api-typings" />

declare namespace WechatMiniprogram {
  interface UserInfo {
    nickName: string;
    avatarUrl: string;
    gender: 0 | 1 | 2;
    country: string;
    province: string;
    city: string;
    language: 'en' | 'zh_CN' | 'zh_TW';
  }
} 