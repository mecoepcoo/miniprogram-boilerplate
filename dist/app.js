//app.js
import config from './common/config';
import { getSystemInfo } from './utils/singleton';
import { getRuntimeType, clearStorageBeforeFull, clearFileList } from './utils/util';
import { getOrientation } from './utils/ui-utils';

App({
  onLaunch: function () {
    /* 查看编译环境 */
    console.log('环境变量：' + config.apiRoot);
    /* 查看api */
    console.log('api地址：' + config.apiRoot);
    /* 获取系统环境 */
    const systemInfo = getSystemInfo();
    console.log('系统信息：', systemInfo);
    /* 获取运行环境 */
    const runtimeType = getRuntimeType(systemInfo);
    console.log('运行环境：' + runtimeType);
    /* 获取设备方向 */
    const orientation = getOrientation(systemInfo.windowWidth, systemInfo.windowHeight);
    console.log('设备方向：' + orientation);
    /* 检查缓存是否健康 */
    console.log('检查缓存健康度...');
    storagePreHandler();
    /* 清除缓存目录 */
    console.log('清理缓存文件...');
    clearFileList();

    console.log('应用初始化完毕!');
  },
  globalData: {
    userInfo: null,
  },

  onError(error) {
    // console.error(error);
  }

});

function storagePreHandler() {
  /* 检查缓存容量 */
  const storageInfo = wx.getStorageInfoSync();
  console.log('缓存已使用' + (storageInfo.currentSize / storageInfo.limitSize / 100).toFixed(1) + '%');
  if ((storageInfo.limitSize - storageInfo.currentSize) < 300) {
    console.log(true);
    clearStorageBeforeFull();
  }
}