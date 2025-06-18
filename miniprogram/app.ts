// app.ts
import { showToast } from './utils/index';

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    isLoggedIn: boolean;
    systemInfo?: WechatMiniprogram.SystemInfo;
  };
  onLaunch(): void;
  checkUpdate(): void;
  onError(error: string): void;
  onUnhandledRejection(res: { reason: any }): void;
}

App<IAppOption>({
  globalData: {
    userInfo: undefined,
    isLoggedIn: false,
    systemInfo: undefined
  },

  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id', // 替换为你的云开发环境ID
        traceUser: true,
      });
    }

    // 检查更新
    this.checkUpdate();

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
      },
      fail: (err) => {
        console.error('获取系统信息失败:', err);
      }
    });

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },

  // 检查小程序更新
  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              },
            });
          });

          updateManager.onUpdateFailed(() => {
            showToast('新版本下载失败，请检查网络后重试', 'error');
          });
        }
      });
    }
  },

  // 全局错误处理
  onError(error: string) {
    console.error('App Error:', error);
    // 这里可以添加错误上报逻辑
  },

  // 全局未处理的 Promise 错误
  onUnhandledRejection(res: { reason: any }) {
    console.error('Unhandled Promise Rejection:', res.reason);
    // 这里可以添加错误上报逻辑
  },
});